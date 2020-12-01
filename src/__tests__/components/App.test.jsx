import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";

import App from "../../components/App";

describe("App component", () => {
  beforeAll(() => {
    render(<App />);
  });

  test("handle contributor click", async () => {
    await waitFor(() => screen.getByTestId("repo-list"));

    const listItems = screen.getAllByTestId("repo-item");
    const { getByRole } = within(listItems[0]);
    const button = getByRole("button");
    fireEvent.click(button);

    expect(await screen.findByTestId("contributors-list")).toBeInTheDocument();
  });

  test("handle scroll", () => {
    fireEvent.scroll(window);
  });
});
