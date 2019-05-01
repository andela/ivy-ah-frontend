import React from 'react';
import PropTypes from 'prop-types';
import ArticlePreviewSwitch from './ArticlePreviewSwitch';
import SkeletonPreviewSwitch from './SkeletonLoaderSwitch';

const key = () => Math.random().toString();

const articlesList = [];

const articleMap = (article, Preview, insertions, loadedArticles) => {
  let limit = 12;
  let chunk = [];
  const result = loadedArticles || [];
  let smallCount = 0;
  let insertCount = 0;

  for (let i = 0; i < article.length; i += 1) {
    smallCount += 1;
    if (smallCount === 7) {
      const random = Math.floor(Math.random() * 3);
      smallCount = 0;
      chunk.splice(chunk.length - random, 0,
        <Preview key={key()} article={article[i]} isSmall={false} />);
      limit -= 2;
    } else {
      chunk.push(<Preview key={key()} article={article[i]} isSmall />);
      limit -= 1;
    }
    if (limit < 1 || i === article.length - 1) {
      result.push(<div key={key()} className="test-grid">{chunk}</div>, insertions[insertCount] || null);
      insertCount += 1;
      limit = 12;
      chunk = [];
    }
  }

  return result;
};


const ArticlePreviewList = (props) => {
  const {
    articles, isLoading, initial, ads
  } = props;

  const loadingArticles = () => {
    if (!initial) {
      return articlesList.concat(<div key={key()} className="article ui active centered inline loader" />);
    }
    let i = 20;
    const dummyArray = [];
    while (i > 0) { dummyArray.push(i); i -= 1; }
    return articlesList
      .concat(articleMap(dummyArray, SkeletonPreviewSwitch, []));
  };

  if (!isLoading) {
    articleMap(articles,
      ArticlePreviewSwitch,
      ads, articlesList);
  }

  return (
    <div className="preview-container">
      {isLoading ? loadingArticles() : articlesList}
    </div>
  );
};

ArticlePreviewList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  isLoading: PropTypes.bool.isRequired,
  initial: PropTypes.bool.isRequired,
  ads: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ArticlePreviewList;
