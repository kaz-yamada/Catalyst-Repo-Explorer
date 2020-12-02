import { useState } from "react";

import Filter from "./Filter";
import Header from "./Header";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";
import RepositoryList from "./RepositoryList";

import { FILTER_OPTIONS, SORT_OPTIONS } from "../data/constants";
import useFetchRepos, { ACTIONS } from "../hooks/useFetchRepos";

const App = () => {
  const [type, setFilterType] = useState(FILTER_OPTIONS[0].value);
  const [sort, setSortOption] = useState(SORT_OPTIONS[0].value);
  const [page, setPage] = useState(1);

  const { state } = useFetchRepos({ page, sort, type });
  const { status, error, data, totalPages } = state;

  if (error) {
    console.error(state);
    return <div className="error">{JSON.stringify(error)}</div>;
  }

  const isDoneFetching = status !== ACTIONS.success;

  const handlePageChange = (value) => setPage(value);

  const handleFilterChange = (value) => {
    setPage(1);
    setFilterType(value);
  };

  const handleSortChange = (value) => {
    setPage(1);
    setSortOption(value);
  };

  return (
    <div className="App" data-testid="app">
      <Header />
      <div className="container options">
        <Filter
          checked={type}
          disabled={isDoneFetching}
          onChange={handleFilterChange}
        />
        <SortDropdown
          selected={sort}
          disabled={isDoneFetching}
          onChange={handleSortChange}
        />
      </div>
      <div className="main-content">
        <div className="top-pagination">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            disabled={isDoneFetching}
            onChange={handlePageChange}
          />
        </div>
        <div className="list">
          {isDoneFetching && <div className="loader"></div>}
          {!isDoneFetching && data && (
            <RepositoryList data={data} filterBy={type} sortBy={sort} />
          )}
        </div>
        <div className="bottom-pagination">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            disabled={isDoneFetching}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
