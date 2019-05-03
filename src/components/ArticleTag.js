import React from 'react';
import PropTypes from 'prop-types';

const ArticleTag = ({ tagList }) => (
  <React.Fragment>
    {tagList.map(tag => (
      <span className="article-tag" key={tag}>
        {tag}
      </span>
    ))}
  </React.Fragment>
);

ArticleTag.propTypes = {
  tagList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired
};

export default ArticleTag;
