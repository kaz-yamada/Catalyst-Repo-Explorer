import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom/extend-expect";

import Header from "../components/Header";

const fakeResponse = {
  name: "org name",
  public_repos: 300,
  location: "Sydney, Australia",
  description: "A great organization",
  blog: "https://www.github.com",
  html_url: "https://www.github.com",
};

const server = setupServer(
  rest.get("/", (req, res, ctx) => {
    return res(ctx.json(fakeResponse));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Header component", () => {
  test("fetch api on load", async () => {
    render(<Header />);
    await waitFor(() => screen.getByTestId("name"));

    expect(screen.getByTestId("name")).toBeInTheDocument();
  });
});
