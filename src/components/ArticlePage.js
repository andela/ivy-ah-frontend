import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ArticleContent from './ArticleContent';
import ArticleMetadata from './ArticleMetadata';
import ArticleTag from './ArticleTag';
import AuthorMetadata from './AuthorMetadata';
import Ratings from './Ratings';

const ArticlePage = ({
  article: { data }, totalArticleHype, loading, error
}) => {
  if (error) {
    return (<Redirect to="/notFound" />);
  }
  return (data ? (
    <div className="article-page">
      <ArticleMetadata data={data} totalArticleHype={totalArticleHype} />
      <ArticleContent className="article-body" body={data.body} />
      <div className="tags">
        <ArticleTag tagList={data.tagList} />
      </div>
      <div className="ui grid">
        <div className="four column row bio-ratings">
          <AuthorMetadata user={data.user} className="left floated column" />
          <Ratings />
        </div>
      </div>
    </div>
  ) : <div />);
};

ArticlePage.propTypes = {
  article: PropTypes.shape({
    data: PropTypes.object,
  }).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  totalArticleHype: PropTypes.number
};

ArticlePage.defaultProps = {
  loading: true,
  error: false,
  totalArticleHype: 0
};

export default ArticlePage;
