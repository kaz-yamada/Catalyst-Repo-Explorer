import { useState } from "react";

import Filter from "./Filter";
import Header from "./Header";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";
import RepositoryList from "./RepositoryList";
import ContributorsList from "./ContributorsList";

import { FILTER_OPTIONS, SORT_OPTIONS } from "../data/constants";
import useFetchRepos, { ACTIONS } from "../hooks/useFetchRepos";

const App = () => {
  const [type, setFilterType] = useState(FILTER_OPTIONS[0].value);
  const [sort, setSortOption] = useState(SORT_OPTIONS[0].value);
  const [page, setPage] = useState(1);
  const [contributiors, setContributiors] = useState({});

  const { state } = useFetchRepos({ page, sort, type });
  const { status, error, data, totalPages } = state;

  const handleContributorClick = ({ name, url }) => {
    if (contributiors.url !== url) setContributiors({ name, url });
  };

  const isDoneFetching = status !== ACTIONS.success;

  const closeContributors = () => setContributiors({});

  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className={`App ${contributiors.url ? "modal-open" : ""}`}>
      <Header />
      <div className="container options">
        <Filter
          checked={type}
          disabled={isDoneFetching}
          onChange={(value) => {
            setPage(1);
            setFilterType(value);
          }}
        />
        <SortDropdown
          selected={sort}
          disabled={isDoneFetching}
          onChange={(value) => {
            setPage(1);
            setSortOption(value);
          }}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          disabled={isDoneFetching}
          onChange={(value) => setPage(value)}
        />
      </div>
      <div className="container list">
        {status === ACTIONS.fetching && <div className="loader"></div>}
        {data && (
          <RepositoryList
            data={data}
            filterBy={type}
            sortBy={sort}
            onContributorsClicked={handleContributorClick}
          />
        )}
      </div>
      {contributiors.url && (
        <ContributorsList
          name={contributiors.name}
          url={contributiors.url}
          onClose={closeContributors}
        />
      )}
    </div>
  );
};

export default App;
