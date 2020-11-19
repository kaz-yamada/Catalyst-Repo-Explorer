import { useEffect, useReducer, useRef } from "react";
import { createUrl, fetchRepos, parseHeaderLinks } from "../api/githubApi";

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
        totalPages: action.payload.totalPages,
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
 *
 * @typedef {Object} State
 * @property {}
 */

/**
 *
 * @param {Params} params
 *
 * @return {State}
 */
const useFetchRepos = ({ page, sort, type }) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const cache = useRef({});

  useEffect(() => {
    let cancelRequest = false;

    const fetchData = async () => {
      dispatch({ type: ACTIONS.fetching });

      const url = createUrl({ page, sort, type });

      if (cache.current[url]) {
        const cachedData = cache.current[url];
        dispatch({
          type: ACTIONS.success,
          payload: cachedData,
        });
      } else {
        try {
          const res = await fetchRepos(url);
          const json = await res.json();
          const totalPages = parseHeaderLinks(res.headers.get("link"), page);

          const data = { data: json, sort, type, totalPages };

          cache.current[url] = data;

          if (cancelRequest) return;
          dispatch({
            type: ACTIONS.success,
            payload: data,
          });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: ACTIONS.error, payload: error.message });
        }
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
