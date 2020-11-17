import PropTypes from "prop-types";

const Pagination = ({ currentPage, disabled, onChange, totalPages }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    if (onChange) onChange(parseInt(value));
  };

  return (
    <div className="pagination option-container">
      <select
        name="pagination"
        id="pagination-dropdown"
        onChange={handleChange}
        value={currentPage}
        disabled={disabled}
      >
        {[...Array(totalPages)].map((_, i) => (
          <option key={i} value={i + 1}>
            Page {i + 1}
          </option>
        ))}
      </select>
      of {totalPages}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  disabled: PropTypes.bool,
  totalPages: PropTypes.number,
  onChange: PropTypes.func,
};

export default Pagination;
