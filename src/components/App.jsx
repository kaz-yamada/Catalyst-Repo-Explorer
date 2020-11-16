import { useState } from "react";

import Filter from "./Filter";
import Header from "./Header";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";
import RepositoryList from "./RepositoryList";

import { FILTER_OPTIONS, SORT_OPTIONS } from "../data/constants";
import useFetchRepos, { ACTIONS } from "../hooks/useFetchRepos";

const App = () => {
  const [filterOption, setFilterOption] = useState(FILTER_OPTIONS[0].value);
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0].value);
  const [page, setPage] = useState(1);
  const [openContributors, setOpenContributors] = useState("");

  const { state } = useFetchRepos({
    page,
    type: filterOption,
    sort: sortOption,
  });

  const resetPagination = () => setPage(1);

  const { status, error, data, totalPages } = state;

  if (error) return <div>{JSON.stringify(error)}</div>;
  return (
    <div className="App">
      <Header />
      <>
        <div className="options">
          <Filter
            onChange={(value) => {
              resetPagination();
              setFilterOption(value);
            }}
            checked={filterOption}
            disabled={status === ACTIONS.success}
          />
          <SortDropdown
            onChange={(value) => {
              resetPagination();
              setSortOption(value);
            }}
            selected={sortOption}
            disabled={status === ACTIONS.success}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onChange={(value) => setPage(value)}
            disabled={status === ACTIONS.success}
          />
        </div>
        <div className="list">
          <span className="message">{status !== "SUCCESS" && status}</span>
          {data && (
            <RepositoryList
              data={data}
              filterBy={filterOption}
              sortBy={sortOption}
              onContributorsCliked={(url) => setOpenContributors(url)}
            />
          )}
        </div>
      </>
    </div>
  );
};

export default App;
