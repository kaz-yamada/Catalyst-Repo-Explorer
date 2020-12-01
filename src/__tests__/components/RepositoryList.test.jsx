import { render, screen } from "@testing-library/react";
import RepositoryList from "../../components/RepositoryList";
import { testrepos } from "../../mocks/handlers";

describe("Repository list component", () => {
  test("renders the correct amout of repositories", () => {
    render(<RepositoryList data={testrepos} />);

    const items = screen.getAllByTestId("repo-item");

    expect(items.length).toEqual(3);
  });
});
