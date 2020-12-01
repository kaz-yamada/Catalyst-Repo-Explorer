import { render, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import Header from "../../components/Header";

describe("Header component", () => {
  test("fetch api on load", async () => {
    render(<Header />);
    await waitFor(() => screen.getByTestId("name"));

    expect(await screen.findByText("org name")).toBeInTheDocument();
  });
});
