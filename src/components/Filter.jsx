import PropTypes from "prop-types";

import { FILTER_OPTIONS } from "../data/constants";

const Filter = ({ onChange, checked, disabled }) => {
  const handleClick = (e) => {
    const { value } = e.currentTarget;
    if (onChange) onChange(value);
  };

  return (
    <div className="filter option-container" data-testid="filter-option">
      <span className="option-label">Filter</span>
      {FILTER_OPTIONS.map(({ label, value, id }) => (
        <label key={id} htmlFor={id}>
          <input
            type="radio"
            name="filter"
            id={id}
            data-testid={id}
            value={value}
            checked={checked === value}
            onChange={handleClick}
            disabled={disabled}
          />
          <div className="radio-container">
            <span className="checkmark"></span>
            <span className="radio-text">{label}</span>
          </div>
        </label>
      ))}
    </div>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Filter;
