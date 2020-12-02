import { memo, useState } from "react";
import { InlineIcon } from "@iconify/react";
import starFill24 from "@iconify-icons/octicon/star-fill-24";
import law24 from "@iconify-icons/octicon/law-24";
import eye16 from "@iconify-icons/octicon/eye-16";
import linkExternal16 from "@iconify-icons/octicon/link-external-16";
import code16 from "@iconify-icons/octicon/code-16";
import gitFork24 from "@iconify-icons/octicon/git-fork-24";
import chevronDown16 from "@iconify-icons/octicon/chevron-down-16";
import PropTypes from "prop-types";
import { fetchGithubApi } from "../api/githubApi";
import ContributorsList from "./ContributorsList";

const RepositoryListItem = ({ data }) => {
  const [contributors, setContributors] = useState([]);
  const [showContributors, setShowContributors] = useState(false);
  const [status, setStatus] = useState("IDLE");

  const handleShowContributors = () => {
    if (contributors.length > 0) {
      setShowContributors(!showContributors);
    } else if (status === "IDLE") {
      setStatus("FETCHING");
      const { contributors_url: url } = data;

      fetchGithubApi(url, { per_page: 5 })
        .then((res) => res.json())
        .then((json) => {
          setContributors(json);
          setStatus("FETCHED");
          setShowContributors(true);
        });
    }
  };

  return (
    <div
      className={`repository ${
        showContributors && contributors.length ? "show-more" : ""
      }`}
      data-testid="repo-item"
    >
      <h2 className="name">{data.name}</h2>
      <div>
        <p className="description">{data.description}</p>
      </div>
      <div className="meta">
        <table>
          <tbody>
            <tr>
              <td>
                <InlineIcon icon={starFill24} />
              </td>
              <td>Starred:</td>
              <td>{data.stargazers_count}</td>
            </tr>
            <tr>
              <td>
                <InlineIcon icon={eye16} />
              </td>
              <td>Watchers:</td>
              <td>{data.subscribers_count || 0}</td>
            </tr>
            <tr>
              <td>
                <InlineIcon icon={code16} />
              </td>
              <td>Language:</td>
              <td>{data.language ? data.language : "N/A"}</td>
            </tr>
            <tr>
              <td>
                <InlineIcon icon={gitFork24} />
              </td>
              <td>Forked:</td>
              <td>{data.fork ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>
                <InlineIcon icon={law24} />
              </td>
              <td>Licence:</td>
              <td>{data.license ? data.license.name : "None"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="links">
        <a
          className="button inline-icon-button"
          target="_blank"
          rel="noreferrer"
          href={data.html_url}
        >
          <InlineIcon icon={linkExternal16} />
          Source
        </a>
      </div>
      <button
        className="link"
        disabled={status === "FETCHING"}
        onClick={handleShowContributors}
      >
        Top Contributors
        <span className="show-more-icon">
          <InlineIcon icon={chevronDown16} />
        </span>
      </button>
      <div className="top-contributors">
        {status === "FETCHING" && <div className="loader"></div>}
        {status !== "FETCHING" && showContributors && (
          <ContributorsList data={contributors} />
        )}
      </div>
    </div>
  );
};

RepositoryListItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    fork: PropTypes.bool,
    html_url: PropTypes.string,
    description: PropTypes.string,
    language: PropTypes.string,
    stargazers_count: PropTypes.number,
    subscribers_count: PropTypes.number,
    contributors_url: PropTypes.string,
    license: PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string,
      spdx_id: PropTypes.string,
      url: PropTypes.string,
      node_id: PropTypes.string,
    }),
  }).isRequired,
};

export default memo(RepositoryListItem);
