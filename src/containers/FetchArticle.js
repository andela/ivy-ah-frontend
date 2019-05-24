import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticle } from '../actions/articleActions';
import ArticlePage from '../components/ArticlePage';

export const Article = ({
  article, totalArticleHype, match, fetchArticleHandler, loading, error, comments
}) => {
  useEffect(() => {
    fetchArticleHandler(match.params.id);
  }, []);
  return (
    <div>
      <ArticlePage
        article={article}
        loading={loading}
        error={error}
        totalArticleHype={totalArticleHype}
        comments={comments}
        id={match.params.id}
      />
    </div>
  );
};

Article.propTypes = {
  article: PropTypes.shape({}),
  fetchArticleHandler: PropTypes.func.isRequired,
  match: PropTypes.shape({}),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  totalArticleHype: PropTypes.number,
  comments: PropTypes.arrayOf(PropTypes.shape({}))
};

Article.defaultProps = {
  article: {},
  match: {},
  loading: true,
  error: false,
  totalArticleHype: 0,
  comments: []
};

const mapStateToProps = (state) => {
  const {
    article, totalArticleHype, loading, error, comments
  } = state.article;
  return {
    article, totalArticleHype, loading, error, comments
  };
};

const mapDispatchToProps = {
  fetchArticleHandler: fetchArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
