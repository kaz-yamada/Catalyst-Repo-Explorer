import { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

import { fetchGithubApi } from "../api/githubApi";

const ContributorsList = ({ name, url }) => {
  const [contributorsList, setContributorsList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setLoading(true);
      fetchGithubApi(url)
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
  }, [url]);

  if (isLoading) return <div>Loading</div>;

  if (contributorsList && contributorsList.length)
    return (
      <div className="contributors-list">
        <div className="repo-name">{name}</div>
        {contributorsList.map(({ html_url, avatar_url }) => (
          <div className="contributor" key={html_url}>
            <a href={html_url}>
              <img src={avatar_url} alt={html_url} height="50" width="50" />
            </a>
          </div>
        ))}
      </div>
    );

  return <></>;
};

ContributorsList.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
};

export default memo(ContributorsList);
