import { useEffect, useRef, useState } from "react";

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

  const [isSticky, setIsSticky] = useState(false);

  const ref = useRef(null);

  const { state } = useFetchRepos({ page, sort, type });
  const { status, error, data, totalPages } = state;

  const handleContributorClick = ({ name, url }) => {
    if (contributiors.url !== url) setContributiors({ name, url });
  };

  const isDoneFetching = status !== ACTIONS.success;

  const closeContributors = () => setContributiors({});

  const handleScroll = () => {
    if (ref.current) {
      setIsSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className={`App ${contributiors.url ? "contributors-open" : ""}`}>
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
      <div className="main-content" ref={ref}>
        <div className="container list">
          {isDoneFetching && <div className="loader"></div>}
          {!isDoneFetching && data && (
            <RepositoryList
              data={data}
              filterBy={type}
              sortBy={sort}
              onContributorsClicked={handleContributorClick}
            />
          )}
        </div>
        {contributiors.url && (
          <div className={`${isSticky ? "sticky" : ""} contributors-container`}>
            <ContributorsList
              name={contributiors.name}
              url={contributiors.url}
              onClose={closeContributors}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
