import { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

import { fetchGithubApi } from "../api/githubApi";

const ContributorsList = ({ name, url, onClose }) => {
  const [contributorsList, setContributorsList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setLoading(true);
      fetchGithubApi(url, { per_page: 5 })
        .then((res) => res.json())
        .then((json) => {
          setLoading(false);
          setContributorsList(json);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  if (isLoading)
    return <div className="contributors-list loading">Loading</div>;

  if (contributorsList && contributorsList.length)
    return (
      <div className="contributors-list">
        <h3 className="repo-title">
          Contributors for:
          <span className="repo-name">{name}</span>
        </h3>
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

  return <></>;
};

ContributorsList.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  onClose: PropTypes.func,
};

export default memo(ContributorsList);
