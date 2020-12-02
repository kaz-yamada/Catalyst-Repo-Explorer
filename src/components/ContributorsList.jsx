import { memo } from "react";
import PropTypes from "prop-types";

const ContributorsList = ({ data }) => (
  <div className="contributors-list" data-testid="contributors-list">
    <div className="contributors">
      {data.map(({ login, html_url, avatar_url }) => (
        <div
          className="contributor"
          key={html_url}
          data-testid="contributor-item"
        >
          <a href={html_url}>
            <img src={avatar_url} alt={html_url} height="50" width="50" />
            <span className="contributor-name">@{login}</span>
          </a>
        </div>
      ))}
    </div>
  </div>
);

ContributorsList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      login: PropTypes.string,
      html_url: PropTypes.string,
      avatar_url: PropTypes.string,
    })
  ),
};

export default memo(ContributorsList);
