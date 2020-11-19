const BASE_URL = "https://api.github.com/orgs/catalyst";
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN || "";

const config = {
  headers: TOKEN
    ? new Headers({
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      })
    : new Headers({ "Content-Type": "application/json" }),
};

export const fetchGithubApi = (urlString = BASE_URL, params) => {
  const url = new URL(urlString);
  if (params) {
    url.search = new URLSearchParams(params).toString();
  }

  return fetch(url, config);
};

export const createUrl = ({ page, sort, type }) => {
  const url = new URL(`${BASE_URL}/repos`);
  const params = {};

  if (page) params["page"] = page;
  if (type) params["type"] = type;
  if (sort) {
    const [sortType, direction] = sort.split("-");
    params["sort"] = sortType;
    params["direction"] = direction;
  }

  url.search = new URLSearchParams(params).toString();

  return url;
};

export const fetchRepos = (url) => fetch(url, config);

export const fetchReposWithParams = ({ page, sort, type }) => {
  const url = new URL(`${BASE_URL}/repos`);
  const params = {};

  if (page) params["page"] = page;
  if (type) params["type"] = type;
  if (sort) {
    const [sortType, direction] = sort.split("-");
    params["sort"] = sortType;
    params["direction"] = direction;
  }

  url.search = new URLSearchParams(params).toString();

  return fetch(url, config);
};

/**
 *
 * Get the link urls from the github response header
 * @param {string} header
 *
 * @returns {number}
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

  return links["last"] ? getPageNumber(links["last"]) : currentPage;
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
