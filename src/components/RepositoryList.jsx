import PropTypes from "prop-types";
import RepositoryListItem from "./RepositoryListItem";

const RepositoryList = ({ data }) => {
  if (!data || !data.length) return <div></div>;

  return (
    <div className="repository-list" data-testid="repo-list">
      {data.map((item) => (
        <RepositoryListItem key={item.name} data={item} />
      ))}
    </div>
  );
};

RepositoryList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      fork: PropTypes.bool,
      html_url: PropTypes.string,
      description: PropTypes.string,
      language: PropTypes.string,
      stargazers_count: PropTypes.number,
      subscribers_count: PropTypes.number,
      contributors_url: PropTypes.string,
      license: PropTypes.objectOf(PropTypes.string),
    })
  ).isRequired,
};

export default RepositoryList;
