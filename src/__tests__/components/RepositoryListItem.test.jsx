import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RepositoryListItem from "../../components/RepositoryListItem";
import { testrepos } from "../../mocks/handlers";

describe("Repository list component", () => {
  test("renders the correct amout of repositories", () => {
    render(<RepositoryListItem data={testrepos[0]} />);

    expect(screen.getByText("repo 1")).toBeInTheDocument();
  });

  test("handle clicking on show contributors", async () => {
    render(<RepositoryListItem data={testrepos[0]} />);

    fireEvent.click(screen.getByRole("button"));

    expect(
      await waitFor(() => screen.getByTestId("contributors-list"))
    ).toBeInTheDocument();
  });
});
