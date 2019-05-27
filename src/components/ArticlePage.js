import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import ReportModalSection from './ReportModalSection';
import ArticleContent from './ArticleContent';
import ArticleMetadata from './ArticleMetadata';
import ArticleTag from './ArticleTag';
import AuthorMetadata from './AuthorMetadata';
import Ratings from './Ratings';
import SocialMedia from './SocialMedia';

const ArticlePage = ({
  article: { data },
  totalArticleHype,
  loading,
  error,
  id
}) => {
  if (error) {
    return <Redirect to="/notFound" />;
  }
  window.prerenderReady = true;
  return data ? (
    <div className="article-page">
      <Helmet>
        <title>{data.title}</title>
        <meta
          property="og:url"
          content={`https://ivy-ah-frontend.herokuapp.com/article/${data.id}`}
        />
        <meta property="og:title" content={data.title} />
        <meta property="twitter:title" content={data.title} />
        <meta
          property="og:description"
          content={data.plainText
            .replace(/^"([\w\W]+)"$/, '$1')
            .replace(/\\n/g, '')
            .slice(0, 200)
            .concat('...')}
        />
        <meta property="og:image" content={data.bannerImage} />
      </Helmet>
      <ArticleMetadata data={data} totalArticleHype={totalArticleHype} />
      <ArticleContent className="article-body" body={data.body} />
      <div className="tag-report">
        <div className="tags">
          <ArticleTag tagList={data.tagList} />
        </div>
        <div className="report"><ReportModalSection articleid={id} /></div>
      </div>
      <div className="ui grid">

        <div className="four column row bio-ratings">
          <AuthorMetadata
            user={data.user}
            className="left floated column bio"
          />
          <div className="social-ratings">
            <Ratings />
            <SocialMedia data={data} title={data.title} />

          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  ) : (
    <div />
  );
};

ArticlePage.propTypes = {
  article: PropTypes.shape({
    data: PropTypes.object
  }).isRequired,
  error: PropTypes.bool,
  totalArticleHype: PropTypes.number
};

ArticlePage.propTypes = {
  article: PropTypes.shape({
    data: PropTypes.object,
  }).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  totalArticleHype: PropTypes.number,
  id: PropTypes.string.isRequired
};

ArticlePage.propTypes = {
  article: PropTypes.shape({
    data: PropTypes.object,
  }).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  totalArticleHype: PropTypes.number,
  id: PropTypes.string.isRequired
};

ArticlePage.defaultProps = {
  loading: true,
  error: false,
  totalArticleHype: 0
};

export default ArticlePage;
