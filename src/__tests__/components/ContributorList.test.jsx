import { render, screen } from "@testing-library/react";
import ContributorsList from "../../components/ContributorsList";

describe("Contributor list component", () => {
  test("should render correctly", () => {
    const sampledata = [
      {
        login: "loginname",
        html_url: "github url",
        avatar_url: "jpg",
      },
      {
        login: "loginname2",
        html_url: "github url2",
        avatar_url: "jpg2",
      },
      {
        login: "loginname3",
        html_url: "github url3",
        avatar_url: "jpg3",
      },
      {
        login: "loginnam4",
        html_url: "github url4",
        avatar_url: "jpg4",
      },
      {
        login: "loginname5",
        html_url: "github url5",
        avatar_url: "jpg5",
      },
    ];

    render(<ContributorsList data={sampledata} />);

    expect(screen.getByTestId("contributors-list")).toBeInTheDocument();

    const items = screen.getAllByTestId("contributor-item");
    expect(items.length).toEqual(5);
  });
});
