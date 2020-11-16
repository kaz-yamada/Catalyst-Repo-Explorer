import { useEffect, useReducer } from "react";
import { fetchGithubApi, parseHeaderLinks } from "../api/githubApi";

const initialState = {
  status: "IDLE",
  error: null,
  data: [],
  type: "",
  sort: "",
  totalPages: 0,
};

export const ACTIONS = {
  fetching: "FETCHING",
  success: "SUCCESS",
  error: "ERROR",
  fetchPage: "FETCH_PAGE",
};

const fetchReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.fetching:
      return { ...initialState, status: ACTIONS.fetching };
    case ACTIONS.success:
      const { data, totalPages } = action.payload;

      return {
        ...initialState,
        status: ACTIONS.success,
        data,
        totalPages,
      };
    case ACTIONS.error:
      return {
        ...initialState,
        status: ACTIONS.error,
        error: action.payload,
      };
    default:
      return state;
  }
};

const useFetchRepos = ({ page = 1, type, sort }) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    let cancelRequest = false;

    const fetchData = async () => {
      dispatch({ type: ACTIONS.fetching });

      try {
        const res = await fetchGithubApi({ page, type, sort });
        const json = await res.json();
        let totalPages = parseHeaderLinks(res.headers.get("link"), page);

        if (cancelRequest) return;
        dispatch({
          type: ACTIONS.success,
          payload: { data: json, totalPages },
        });
      } catch (error) {
        if (cancelRequest) return;
        dispatch({ type: ACTIONS.error, payload: error.message });
      }
    };
    fetchData();

    return () => {
      cancelRequest = true;
    };
  }, [page, sort, type]);

  return { state };
};

export default useFetchRepos;
