import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

describe("Header component", () => {
  test("should render an organization's information correctly", () => {
    const orgData = {
      name: "org name",
      public_repos: 300,
      location: "Sydney, Australia",
      description: "A great organization",
      blog: "https://www.github.com",
      html_url: "https://www.github.com",
    };

    render(<Header data={orgData} />);

    expect(screen.getByTestId("name").textContent).toBe("org name");
    expect(screen.getByTestId("repos").textContent).toBe("300");
    expect(screen.getByTestId("location").textContent).toBe(
      "Sydney, Australia"
    );
    expect(screen.getByTestId("description").textContent).toBe(
      "A great organization"
    );
  });
});
