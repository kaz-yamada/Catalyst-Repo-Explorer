export const BASE_URL = "https://api.github.com/orgs/catalyst";

export const API_URL = {
  org: "https://api.github.com/orgs/catalyst",
  repos: "https://api.github.com/orgs/catalyst/repos",
};

export const STORAGE_KEYS = {
  org: "",
};

export const FILTER_OPTIONS = [
  {
    label: "All",
    value: "all",
    id: "filter-all",
  },
  {
    label: "Forked",
    value: "forked",
    id: "filter-forked",
  },
  {
    label: "Not Forked",
    value: "sources",
    id: "filter-not-forked",
  },
];

export const SORT_OPTIONS = [
  {
    name: "Created: Newest",
    value: "created-desc",
  },
  {
    name: "Created: Oldest",
    value: "created-asc",
  },
  {
    name: "Update: Newest",
    value: "updated-desc",
  },
  {
    name: "Updated: Oldest",
    value: "updated-asc",
  },
  {
    name: "Name: A-z",
    value: "name-asc",
  },
  {
    name: "Name: Z-a",
    value: "name-desc",
  },
];
