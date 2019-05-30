import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ArticlePreviewImage from './ArticlePreviewImage';
import BookmarkContainer from '../containers/BookmarkContainer';


const ArticlePreviewSwitch = ({ article, isSmall }) => {
  const image = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.exec(article.body) || [article.bannerImage];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 590);
  const [articleId, setArticleId] = useState(null);

  useEffect(() => {
    if (isSmall) return;
    const swithPreview = () => {
      setIsMobile(window.innerWidth < 590);
    };
    window.addEventListener('resize', swithPreview);

    return () => window.removeEventListener('resize', swithPreview);
  });

  const openArticle = () => {
    setArticleId(article.id);
  };

  if (articleId) {
    return (<Redirect push to={`/article/${article.id}`} />);
  }

  return !isSmall && !isMobile ? (
    <div onClick={openArticle} className="ui card article-card-large">
      <ArticlePreviewImage className="image article-image-large" imageUrl={image[0]} />
      <div className="content">
        <div className="header">{article.title}</div>
        <div className="meta">{`${article.user.firstname} ${article.user.lastname}`}</div>
      </div>
      <BookmarkContainer articleId={article.id} />
    </div>
  ) : (
    <div onClick={openArticle} className="ui card article-card-small">
      <ArticlePreviewImage className="image article-image-small" imageUrl={image[0]} />
      <div className="content">
        <div className="category">{article.tagList[0]}</div>
        <div className="header">{article.title}</div>
        <div className="meta">{`${article.user.firstname} ${article.user.lastname}`}</div>
        <div className="preview-stat">
          <span className="hype-stat">
            <span className="hype-icon" />
            <span className="hype-count">{`${article.ratings} hype${article.ratings === 1 ? '' : 's'}`}</span>
          </span>
          <span className="read-stat">{`${Math.floor(parseInt(article.readTime, 10) / 60) || '<1'} min read`}</span>
          {article.isPremium ? <i className="star icon premium-icon" /> : null}
        </div>
        <div className="description">
          {article.plainText.replace(/^"([\w\W]+)"$/, '$1').replace(/\\n/g, '').slice(0, 200).concat('...')}
        </div>
      </div>
      <BookmarkContainer articleId={article.id} />
    </div>
  );
};

ArticlePreviewSwitch.propTypes = {
  article: PropTypes.shape({
    bannerImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  isSmall: PropTypes.bool.isRequired
};

export default ArticlePreviewSwitch;
