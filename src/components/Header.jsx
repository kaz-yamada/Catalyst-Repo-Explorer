import { InlineIcon } from "@iconify/react";
import repoIcon from "@iconify-icons/octicon/repo";
import linkExternal16 from "@iconify-icons/octicon/link-external-16";
import markGithub16 from "@iconify-icons/octicon/mark-github-16";
import mapMarker from "@iconify-icons/el/map-marker";

import PropTypes from "prop-types";

const Header = ({ data }) => {
  if (!data) return <div></div>;

  const { name, public_repos, location, description, blog, html_url } = data;

  return (
    <div>
      <div className="titles">
        <h1 data-testid="name">{name}</h1>
        <h3 data-testid="description">{description}</h3>
      </div>
      <div className="info">
        <div className="repos">
          <InlineIcon icon={repoIcon} />
          <div>
            Repositories:
            <span data-testid="repos">{public_repos}</span>
          </div>
        </div>
        <div className="location">
          <InlineIcon icon={mapMarker} />
          <div data-testid="location">{location}</div>
        </div>
      </div>
      <div className="links">
        <a className="button" href={html_url}>
          <InlineIcon icon={markGithub16} />
          <span>{html_url}</span>
        </a>
        <a href={blog} className="button">
          <InlineIcon icon={linkExternal16} />
          <span>{blog}</span>
        </a>
      </div>
    </div>
  );
};

Header.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    public_repos: PropTypes.number,
    location: PropTypes.string,
    description: PropTypes.string,
    blog: PropTypes.string,
    html_url: PropTypes.string,
  }),
};
export default Header;
