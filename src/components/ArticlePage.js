import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ArticleContent from 'Components/ArticleContent';
import ArticleMetadata from './ArticleMetadata';
import ArticleTag from './ArticleTag';
import AuthorMetadata from './AuthorMetadata';

const ArticlePage = ({ article: { data }, loading, error }) => {
  if (error) {
    return (<Redirect to="/notFound" />);
  }
  return (data ? (
    <div className="article-page">
      <ArticleMetadata data={data} />
      <ArticleContent className="article-body" body={data.body} />
      <div className="tags">
        <ArticleTag tagList={data.tagList} />
      </div>
      <div className="ui grid">
        <div className="four column row bio-ratings">
          <AuthorMetadata user={data.user} className="left floated column" />
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
  error: PropTypes.bool
};

ArticlePage.defaultProps = {
  loading: true,
  error: false
};

export default ArticlePage;
