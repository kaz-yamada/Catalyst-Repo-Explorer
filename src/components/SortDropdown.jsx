import PropTypes from "prop-types";

import { SORT_OPTIONS } from "../data/constants";

const SortDropdown = ({ onChange, selected }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    if (onChange) onChange(value);
  };

  return (
    <select
      data-testid="sort-dropdown"
      id="sort-dropdown"
      onChange={handleChange}
      defaultValue={selected}
    >
      {SORT_OPTIONS.map(({ name, value }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

SortDropdown.propTypes = {
  onChange: PropTypes.func,
  selected: PropTypes.string,
};

export default SortDropdown;
