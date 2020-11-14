const Options = (props) => {
  return (
    <div>
      <div className="filters">
        <label htmlFor="filter-all">
          <input type="radio" name="filter" id="filter-all" data-testid="all" />
          All
        </label>
        <label htmlFor="filter-forked">
          <input
            type="radio"
            name="filter"
            id="filter-forked"
            data-testid="forked"
          />
          Forked
        </label>
        <label htmlFor="filter-not-forked">
          <input
            type="radio"
            name="filter"
            id="filter-not-forked"
            data-testid="not-forked"
          />
          Not Forked
        </label>
      </div>

      <div className="sorting"></div>
    </div>
  );
};

export default Options;
