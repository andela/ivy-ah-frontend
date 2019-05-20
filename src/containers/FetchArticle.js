import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticle } from '../actions/articleActions';
import ArticlePage from '../components/ArticlePage';

export const Article = ({
  // eslint-disable-next-line no-shadow
  article, totalArticleHype, match, fetchArticle, loading, error
}) => {
  useEffect(() => {
    fetchArticle(match.params.id);
  }, []);

  return (
    <div className="article-view">
      <ArticlePage
        article={article}
        loading={loading}
        error={error}
        totalArticleHype={totalArticleHype}
      />
    </div>
  );
};

Article.propTypes = {
  article: PropTypes.shape({}),
  fetchArticle: PropTypes.func.isRequired,
  match: PropTypes.shape({}),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  totalArticleHype: PropTypes.number
};

Article.defaultProps = {
  article: {},
  match: {},
  loading: true,
  error: false,
  totalArticleHype: 0
};

const mapStateToProps = (state) => {
  const {
    article, totalArticleHype, loading, error
  } = state.article;
  return {
    article, totalArticleHype, loading, error
  };
};

const mapDispatchToProps = {
  fetchArticle
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
