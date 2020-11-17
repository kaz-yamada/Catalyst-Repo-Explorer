import PropTypes from "prop-types";

import { SORT_OPTIONS } from "../data/constants";

const SortDropdown = ({ disabled, selected, onChange }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    if (onChange) onChange(value);
  };

  return (
    <div className="sort option-container">
      <label className="option-label" htmlFor="sort-dropdown">
        Sort by{" "}
      </label>
      <select
        data-testid="sort-dropdown"
        id="sort-dropdown"
        onChange={handleChange}
        defaultValue={selected}
        disabled={disabled}
      >
        {SORT_OPTIONS.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

SortDropdown.propTypes = {
  disabled: PropTypes.bool,
  selected: PropTypes.string,
  onChange: PropTypes.func,
};

export default SortDropdown;
