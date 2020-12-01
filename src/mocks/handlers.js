import { rest } from "msw";

export const fakeOrg = {
  name: "org name",
  public_repos: 300,
  location: "Sydney, Australia",
  description: "A great organization",
  blog: "https://www.github.com",
  html_url: "https://www.github.com",
};

export const testrepos = [
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

export const handlers = [
  rest.post("", (req, res, ctx) => {
    return res(ctx.json(fakeOrg));
  }),

  rest.get("https://api.github.com/orgs/catalyst", (req, res, ctx) => {
    return res(ctx.json(fakeOrg));
  }),

  rest.get("https://api.github.com/orgs/catalyst/repos", (req, res, ctx) => {
    // console.log(testrepos);
    return res(ctx.json(testrepos));
  }),

  rest.get(
    "https://api.github.com/orgs/catalyst/repos/{owner}/{repo}/contributors",
    (req, res, ctx) => {
      console.log("cont");
      return res(ctx.json(testrepos));
    }
  ),
];
