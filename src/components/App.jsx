import { useEffect, useRef, useState } from "react";

import Filter from "./Filter";
import Header from "./Header";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";
import RepositoryList from "./RepositoryList";
import ContributorsList from "./ContributorsList";

import { FILTER_OPTIONS, SPACING, SORT_OPTIONS } from "../data/constants";
import useFetchRepos, { ACTIONS } from "../hooks/useFetchRepos";

const App = () => {
  const ref = useRef(null);

  const [type, setFilterType] = useState(FILTER_OPTIONS[0].value);
  const [sort, setSortOption] = useState(SORT_OPTIONS[0].value);
  const [page, setPage] = useState(1);
  const [contributiors, setContributiors] = useState({});
  const [isSticky, setIsSticky] = useState(false);
  const [contentOffset, setContentOffset] = useState(0);

  const { state } = useFetchRepos({ page, sort, type });
  const { status, error, data, totalPages } = state;

  const handleContributorClick = ({ name, url }) => {
    if (contributiors.url !== url) {
      handleResize();
      setContributiors({ name, url });
    }
  };

  const isDoneFetching = status !== ACTIONS.success;

  const closeContributors = () => setContributiors({});

  const handleScroll = () => {
    if (ref.current) {
      setIsSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };

  const handleResize = () => {
    const offset =
      window.innerWidth > SPACING.responsive
        ? ref.current.offsetWidth + SPACING.offset
        : 0;

    setContentOffset(offset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  if (error) {
    console.error(state);
    return <div>{JSON.stringify(error)}</div>;
  }

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
            closeContributors();
          }}
        />
        <SortDropdown
          selected={sort}
          disabled={isDoneFetching}
          onChange={(value) => {
            setSortOption(value);
            closeContributors();
            setPage(1);
          }}
        />
      </div>
      <div className="container">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          disabled={isDoneFetching}
          onChange={(value) => setPage(value)}
        />
      </div>
      <div className="main-content">
        <div className="container list" ref={ref}>
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
        {contributiors.url && !isDoneFetching && (
          <div
            className={`${isSticky ? "sticky" : ""} contributors-container`}
            style={{ left: contentOffset }}
          >
            <ContributorsList
              name={contributiors.name}
              url={contributiors.url}
              onClose={closeContributors}
            />
          </div>
        )}
      </div>
      <div className="container bottom-pagination">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onChange={(value) => setPage(value)}
        />
      </div>
    </div>
  );
};

export default App;
