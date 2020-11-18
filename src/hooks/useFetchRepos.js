import { useEffect, useReducer } from "react";
import { fetchReposWithParams, parseHeaderLinks } from "../api/githubApi";

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
  updateTotalPages: "UPDATE_TOTAL_PAGES",
};

const fetchReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.fetching:
      return { ...state, status: ACTIONS.fetching };
    case ACTIONS.success:
      return {
        ...state,
        status: ACTIONS.success,
        data: action.payload.data,
        type: action.payload.type,
        sort: action.payload.sort,
      };
    case ACTIONS.updateTotalPages:
      return {
        ...state,
        status: ACTIONS.success,
        totalPages: action.payload.totalPages,
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

/**
 * @typedef {Object} Params
 * @property {number} page
 * @property {string} sort
 * @property {string} type
 */

/**
 *
 * @param {Params} params
 */
const useFetchRepos = ({ page, sort, type }) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    let cancelRequest = false;

    const fetchData = async () => {
      dispatch({ type: ACTIONS.fetching });

      try {
        const res = await fetchReposWithParams({ page, sort, type });
        const json = await res.json();

        if (cancelRequest) return;
        dispatch({
          type: ACTIONS.success,
          payload: { data: json, sort, type },
        });

        const totalPages = parseHeaderLinks(res.headers.get("link"), page);
        dispatch({
          type: ACTIONS.updateTotalPages,
          payload: { totalPages },
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
