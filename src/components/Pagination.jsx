import PropTypes from "prop-types";

const Pagination = ({ totalPages, currentPage, onChange }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    if (onChange) onChange(parseInt(value));
  };

  return (
    <div id="pagination">
      <select
        name="pagination"
        id="pagination-dropdown"
        onChange={handleChange}
        value={currentPage}
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
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  onChange: PropTypes.func,
};

export default Pagination;
