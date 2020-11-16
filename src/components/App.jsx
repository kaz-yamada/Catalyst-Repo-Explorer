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

  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className="App">
      <Header />
      <div className="options">
        <Filter
          onChange={(value) => {
            setPage(1);
            setFilterType(value);
          }}
          checked={type}
        />
        <SortDropdown
          selected={sort}
          onChange={(value) => {
            setPage(1);
            setSortOption(value);
          }}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onChange={(value) => setPage(value)}
        />
      </div>
      <div className="list">
        <span className="message">{status !== ACTIONS.success && status}</span>
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
        <ContributorsList name={contributiors.name} url={contributiors.url} />
      )}
    </div>
  );
};

export default App;
