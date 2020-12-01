import { fireEvent, render, screen } from "@testing-library/react";
import RepositoryListItem from "../../components/RepositoryListItem";
import { testrepos } from "../../mocks/handlers";

describe("Repository list component", () => {
  test("renders the correct amout of repositories", () => {
    const clickHandler = jest.fn();
    render(
      <RepositoryListItem
        data={testrepos[0]}
        onContributorsClicked={clickHandler}
      />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(clickHandler).toHaveBeenCalled();
  });
});
