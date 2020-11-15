import { useState } from "react";

import { filterOptionsList } from "../data/constants";

const Filter = ({ onChange }) => {
  const [filterOption, setFilterOption] = useState(filterOptionsList[0].value);

  const handleFilterClick = (e) => {
    const { value } = e.currentTarget;
    setFilterOption(value);
    if (onChange) onChange(value);
  };

  return (
    <div>
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
  );
};

export default Filter;
