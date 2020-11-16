import { render, screen } from "@testing-library/react";
import RepositoryList from "../../components/RepositoryList";

const testrepos = [
  {
    name: "repo 1",
    fork: true,
    html_url: "https://github.com/kaz-yamada/Catalyst-Repo-Explorer",
    description: "description for repo 1",
    language: "Perl",
    stargazers_count: 120,
    subscribers_count: 21,
    contributors_url:
      "https://api.github.com/repos/kaz-yamada/Catalyst-Repo-Explorer/contributors",
    license: {
      key: "mit",
      name: "MIT License",
    },
  },
  {
    name: "repo 2",
    fork: false,
    html_url: "https://github.com/kaz-yamada/Catalyst-Repo-Explorer",
    description: "description for repo 2",
    language: "JavaScript",
    stargazers_count: 105,
    subscribers_count: 80,
    contributors_url:
      "https://api.github.com/repos/kaz-yamada/Catalyst-Repo-Explorer/contributors",
    license: null,
  },
  {
    name: "repo three",
    fork: false,
    html_url: "https://github.com/kaz-yamada/Catalyst-Repo-Explorer",
    description: "description for repo three",
    language: "Python",
    stargazers_count: 310,
    subscribers_count: 10,
    contributors_url:
      "https://api.github.com/repos/kaz-yamada/Catalyst-Repo-Explorer/contributors",
    license: null,
  },
];

describe("Repository list component", () => {
  test("renders the correct amout of repositories", () => {
    render(<RepositoryList data={testrepos} />);

    const items = screen.getAllByTestId("item");

    expect(items.length).toEqual(3);
  });
});
