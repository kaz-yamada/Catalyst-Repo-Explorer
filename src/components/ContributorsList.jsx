import { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

import { fetchGithubApi } from "../api/githubApi";

const ContributorsList = ({ name, url, onClose }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [contributorsList, setContributorsList] = useState([]);

  useEffect(() => {
    let ignore = false;

    const fetchContributors = async () => {
      setIsFetching(true);
      const res = await fetchGithubApi(url, { per_page: 5 });
      const json = await res.json();

      if (!ignore) setContributorsList(json);

      setIsFetching(false);
    };

    fetchContributors();

    return () => {
      ignore = true;
    };
  }, [url]);

  if (!isFetching && contributorsList && contributorsList.length)
    return (
      <div className="contributors-list" data-testid="contributors-list">
        <div className="contributors-header">
          <h3>
            Top contributors for:
            <span className="repo-name">{name}</span>
          </h3>
        </div>
        <div className="contributors">
          {contributorsList.map(({ login, html_url, avatar_url }) => (
            <div className="contributor" key={html_url}>
              <a href={html_url}>
                <img src={avatar_url} alt={html_url} height="50" width="50" />
                <span className="contributor-name">@{login}</span>
              </a>
            </div>
          ))}
        </div>
        <button className="button" onClick={onClose}>
          Close
        </button>
      </div>
    );

  return (
    <div className="contributors-list" data-testid="contributors-list">
      <div className="loader"></div>
    </div>
  );
};

ContributorsList.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  onClose: PropTypes.func,
};

export default memo(ContributorsList);
