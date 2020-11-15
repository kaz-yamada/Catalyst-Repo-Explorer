import { useState } from "react";

import { sortOptionsList } from "../data/constants";

const SortDropdown = ({ onChange }) => {
  const [sortOption, setSortOption] = useState(sortOptionsList[0].value);

  const handleChange = (e) => {
    const { value } = e.target;

    setSortOption(value);
    if (onChange) onChange(value);
  };

  return (
    <select
      data-testid="sort-dropdown"
      id="sort-dropdown"
      onChange={handleChange}
      defaultValue={sortOption}
    >
      {sortOptionsList.map(({ name, value }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default SortDropdown;
