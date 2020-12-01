import { memo } from "react";
import { InlineIcon } from "@iconify/react";
import starFill24 from "@iconify-icons/octicon/star-fill-24";
import law24 from "@iconify-icons/octicon/law-24";
import eye16 from "@iconify-icons/octicon/eye-16";
import linkExternal16 from "@iconify-icons/octicon/link-external-16";
import code16 from "@iconify-icons/octicon/code-16";
import gitFork24 from "@iconify-icons/octicon/git-fork-24";
import PropTypes from "prop-types";

// npm install --save-dev @iconify/react @iconify-icons/octicon

const RepositoryListItem = ({ data, onContributorsClicked }) => (
  <div className="repository" data-testid="repo-item">
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
      <button
        className="button"
        onClick={() =>
          onContributorsClicked({
            name: data.name,
            url: data.contributors_url,
          })
        }
      >
        Top Contributors
      </button>
    </div>
  </div>
);

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
  onContributorsClicked: PropTypes.func,
};

export default memo(RepositoryListItem);
