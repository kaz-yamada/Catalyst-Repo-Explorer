import { useEffect, useRef, useState, memo } from "react";
import { InlineIcon } from "@iconify/react";
import chevronLeft16 from "@iconify-icons/octicon/chevron-left-16";
import chevronRight16 from "@iconify-icons/octicon/chevron-right-16";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, onChange, totalPages, maxItems = 6 }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef({});

  const mid = maxItems / 2;
  const left = Array.from({ length: mid }, (_, i) => i + 1);
  const right = Array.from(
    { length: mid },
    (_, i) => i + (totalPages - mid) + 1
  );

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const listCallback = (val) => {
    return (
      <li key={`key-${val}`} className={val === currentPage ? "current" : ""}>
        <button
          value={val}
          className="pagination-anchor"
          onClick={handleOnButtonClick}
        >
          {val}
        </button>
      </li>
    );
  };
  const handleOnButtonClick = (e) => {
    const { value } = e.target;
    const num = typeof value === "string" ? parseInt(value) : value;

    setIsDropdownOpen(false);
    if (num > 0 && num <= totalPages && num !== currentPage && onChange) {
      onChange(num);
    }
  };

  const handleDropdownClick = (value) => {
    if (onChange) onChange(parseInt(value));
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (e) => {
    console.log(ref.current, e.target);
    if (ref.current && !ref.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (totalPages > 0) {
    return (
      <div className="pagination option-container">
        <ul className="pagination-list">
          <li>
            <button onClick={handleOnButtonClick} value={currentPage - 1}>
              <InlineIcon icon={chevronLeft16} />
            </button>
          </li>
          {left.map(listCallback)}
          <li ref={ref} className="dropdown">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`dropdown-button ${isDropdownOpen ? "open" : ""}`}
            >
              ...
            </button>
            <div className={`dropdown-list ${isDropdownOpen ? "open" : ""}`}>
              {pages.map((val) => (
                <div
                  className={`dropdown-item ${
                    val === currentPage ? "current" : ""
                  }`}
                  key={`dropdown-${val}`}
                  onClick={() => handleDropdownClick(val)}
                >
                  {val}
                </div>
              ))}
            </div>
          </li>
          {right.map(listCallback)}
          <li>
            <button onClick={handleOnButtonClick} value={currentPage + 1}>
              <InlineIcon icon={chevronRight16} />
            </button>
          </li>
        </ul>
      </div>
    );
  }
  return <div></div>;
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  maxItems: PropTypes.number,
  onChange: PropTypes.func,
};

export default memo(Pagination);
