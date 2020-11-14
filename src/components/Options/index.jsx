import { useState } from "react";

import { filterOptionsList, sortOptionsList } from "./constants";

const Options = ({ onFilterChange, onSortChange }) => {
  const [filterOption, setFilterOption] = useState(filterOptionsList[0].value);
  const [sortOption, setSortOption] = useState(sortOptionsList[2].value);

  const handleFilterClick = (e) => {
    const { value } = e.currentTarget;

    setFilterOption(value);
    onFilterChange(value);
  };

  const handleSortChange = (e) => {
    const { value } = e.target;

    setSortOption(value);
    onSortChange(value);
  };

  return (
    <div>
      <div className="filters">
        <span>Filter</span>
        {filterOptionsList.map(({ label, value, id }) => (
          <label key={id} htmlFor={id}>
            <input
              type="radio"
              name="filter"
              id={id}
              data-testid={id}
              value={value}
              checked={filterOption === value}
              onChange={handleFilterClick}
            />
            {label}
          </label>
        ))}
      </div>
      <div className="sorting">
        <span>Sort</span>
        <select
          data-testid="sort-dropdown"
          id="sort-dropdown"
          onChange={handleSortChange}
          defaultValue={sortOption}
        >
          {sortOptionsList.map(({ name, value }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Options;
