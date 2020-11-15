import { useEffect, useState } from "react";

import Filter from "./Filter";
import Header from "./Header";
import SortDropdown from "./SortDropdown";
import RepositoryList from "./RepositoryList";
import { filterOptionsList, sortOptionsList } from "../data/constants";

const App = () => {
  const [orgData, setOrgData] = useState(null);
  const [filterOption, setFilterOption] = useState(filterOptionsList[0].value);
  const [sortOption, setSortOption] = useState(sortOptionsList[0].value);
  const [repos, setRepos] = useState([]);
  const [openContributors, setOpenContributors] = useState("");

  useEffect(() => {}, []);

  return (
    <div className="App">
      <Header data={orgData} />
      <div className="options">
        <div className="filter">
          <Filter
            onChange={(value) => setFilterOption(value)}
            checked={filterOption}
          />
        </div>
        <div className="sort">
          <SortDropdown
            onChange={(value) => setSortOption(value)}
            selected={sortOption}
          />
        </div>
      </div>

      <div className="list">
        <RepositoryList
          data={repos}
          filterBy={filterOption}
          sortBy={sortOption}
          onContributorsCliked={(url) => setOpenContributors(url)}
        />
      </div>
    </div>
  );
};

export default App;
