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
    value: "not-forked",
    id: "filter-not-forked",
  },
];

export const SORT_OPTIONS = [
  {
    name: "Created: Newest",
    value: "created-asc",
  },
  {
    name: "Created: Oldest",
    value: "created-desc",
  },
  {
    name: "Update: Newest",
    value: "updated-asc",
  },
  {
    name: "Updated: Oldest",
    value: "updated-desc",
  },
  {
    name: "Name: A-z",
    value: "name-asc",
    selected: true,
  },
  {
    name: "Name: Z-a",
    value: "name-desc",
  },
];
