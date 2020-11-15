import ReactDOM from "react-dom";

import App from "../components/App";

describe("App component", () => {
  test("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });
});
