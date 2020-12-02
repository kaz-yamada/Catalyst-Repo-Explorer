import { fireEvent, render, screen } from "@testing-library/react";

import { server, rest } from "../../mocks/server";

import App from "../../components/App";

describe("App component", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("renders component correctly", () => {
    expect(screen.getByTestId("app")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("filter-forked"));
    fireEvent.change(screen.getByTestId("sort-dropdown"), {
      target: { value: "created-desc" },
    });
  });

  test("handles and displays error message", () => {
    // const testErrorMessage = "TEST ERROR MESSAGE";
    // server.use(
    //   rest.get(
    //     "https://api.github.com/orgs/catalyst/repos",
    //     async (req, res, ctx) => {
    //       return res(ctx.status(500), ctx.json({ message: testErrorMessage }));
    //     }
    //   )
    // );;
  });
});
