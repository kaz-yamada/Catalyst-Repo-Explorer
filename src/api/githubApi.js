import { BASE_URL } from "../data/constants";

const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const config = {
  headers: new Headers({
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  }),
};

export const fetchOrgData = () => fetch(BASE_URL, config);

export const fetchGithubApi = (params) => {
  const url = getUrl(params);
  return fetch(url, config);
};

/**
 * Create url with parameters
 * @param {Object} param0
 */
export const getUrl = ({ page, sort, type }) => {
  const url = new URL(`${BASE_URL}/repos`);
  const params = {};

  if (page) params["page"] = page;
  if (sort) {
    const [sortType, direction] = sort.split("-");
    params["sort"] = sortType;
    params["direction"] = direction;
  }
  if (type) params["type"] = type;

  url.search = new URLSearchParams(params).toString();

  return url;
};

/**
 * @typedef {Object} headerLinks
 * @property {array} links
 * @property {number} totalPages
 *
 * Get the link urls from the github response header
 * @param {string} header
 *
 * @returns {headerLinks}
 */
export const parseHeaderLinks = (headerString, currentPage) => {
  const arr = headerString.split(",");
  const links = {};

  // Get the links
  arr.forEach((ele) => {
    const section = ele.split(";");
    const url = section[0].replace(/<(.*)>/, "$1").trim();
    const name = section[1].replace(/rel="(.*)"/, "$1").trim();

    links[name] = url;
  });

  let totalPages = currentPage;
  if (links["last"]) totalPages = getPageNumber(links["last"]);

  return totalPages;
};

/**
 *
 * @param {string} url
 * @returns {number}
 */
const getPageNumber = (url) => {
  const queryString = url.split("?")[1];
  const pageNumber = queryString.split("=");

  return parseInt(pageNumber[1]);
};
