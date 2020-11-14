import Header from "../Header";

const App = () => {
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
    </div>
  );
};

export default App;
