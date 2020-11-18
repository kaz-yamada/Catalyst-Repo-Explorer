import { useEffect, useState } from "react";
import { InlineIcon } from "@iconify/react";
import repoIcon from "@iconify-icons/octicon/repo";
import linkExternal16 from "@iconify-icons/octicon/link-external-16";
import markGithub16 from "@iconify-icons/octicon/mark-github-16";
import mapMarker from "@iconify-icons/el/map-marker";

import { fetchGithubApi } from "../api/githubApi";

const Header = () => {
  const [data, setData] = useState({});
  //   const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetchOrgData = async () => {
      const res = await fetchGithubApi();
      const json = await res.json();
      if (!ignore) setData(json);
    };

    fetchOrgData();
    return () => {
      ignore = true;
    };
  }, []);

  const { name, public_repos, location, description, blog, html_url } = data;

  return (
    <div className="header container">
      {data === {} ? (
        <div className="loader"></div>
      ) : (
        <>
          <div className="row titles">
            <h1 data-testid="name" className="name">
              {name}
            </h1>
            <p data-testid="description" className="description">
              {description}
            </p>
          </div>
          <div className="row info">
            <div className="repos">
              <InlineIcon icon={repoIcon} />
              <div>
                Repositories: <span data-testid="repos">{public_repos}</span>
              </div>
            </div>
            <div className="location">
              <InlineIcon icon={mapMarker} />
              <div data-testid="location">{location}</div>
            </div>
          </div>
          <div className="row links">
            <a className="button" href={html_url}>
              <InlineIcon icon={markGithub16} />
              <span>{html_url}</span>
            </a>
            <a href={blog} className="button">
              <InlineIcon icon={linkExternal16} />
              <span>{blog}</span>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
