import { memo } from "react";
import { InlineIcon } from "@iconify/react";
import starFill24 from "@iconify-icons/octicon/star-fill-24";
import eye16 from "@iconify-icons/octicon/eye-16";
import PropTypes from "prop-types";

const RepositoryListItem = ({ data, onContributorsCliked }) => (
  <div key={data.name} data-testid="item">
    <h2 className="name">{data.name}</h2>
    <div className="meta">
      <span>
        <InlineIcon icon={starFill24} />
        {data.stargazers_count}
      </span>
      <span>
        <InlineIcon icon={eye16} />
        {data.subscribers_count}
      </span>
      <span>{data.language}</span>
      {data.fork || <span>Forked</span>}
    </div>
    <div>
      <p className="description">{data.description}</p>
    </div>
    <div className="links">
      <a
        className="button"
        href={data.html_url}
        target="_blank"
        rel="noreferrer"
      >
        Source
      </a>
      <button
        className="button"
        onClick={() => onContributorsCliked(data.contributors_url)}
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
    license: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  onContributorsCliked: PropTypes.func,
};

export default memo(RepositoryListItem);
