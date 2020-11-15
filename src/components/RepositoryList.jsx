const RepositoryList = ({ data, sort, filter }) => {
  return (
    <div>
      <div data-testid="list">
        {data.map((item) => (
          <div key={item.name} data-testid="item">
            item
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepositoryList;
