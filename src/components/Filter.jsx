import PropTypes from "prop-types";

import { FILTER_OPTIONS } from "../data/constants";

const Filter = ({ onChange, checked }) => {
  const handleClick = (e) => {
    const { value } = e.currentTarget;
    if (onChange) onChange(value);
  };

  return (
    <div>
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
          />
          {label}
        </label>
      ))}
    </div>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.string,
};

export default Filter;
