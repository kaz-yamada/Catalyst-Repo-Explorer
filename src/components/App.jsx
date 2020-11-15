import Filter from "./Filter";
import Header from "./Header";
import SortDropdown from "./SortDropdown";

const App = () => {
  const handleFilterChange = (value) => console.log(value);
  const handleSortChange = (value) => console.log(value);

  return (
    <div className="App">
      <Header
        data={{
          name: "org name",
          public_repos: 300,
          location: "Sydney, Australia",
          description: "A great organization",
          blog: "https://www.github.com",
          html_url: "https://www.github.com",
        }}
      />

      <div className="options">
        <div className="filter">
          <Filter onChange={handleFilterChange} />
        </div>
        <div className="sort">
          <SortDropdown onChange={handleSortChange} />
        </div>
      </div>
    </div>
  );
};

export default App;
