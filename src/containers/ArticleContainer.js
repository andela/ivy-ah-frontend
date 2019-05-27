import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBookmarks } from '../actions/bookmark';
import { fetchArticles } from '../actions/article';
import ArticlePreviewList from '../components/ArticlePreviewList';
import Upgrade from '../components/Upgrade';

const ArticleContainer = ({
  newArticles, currentPage, numberOfPages, isLoading, error, dispatch
}) => {
  const ads = [<Upgrade key={Math.random().toString()} />];

  const fetchData = () => {
    if (currentPage < numberOfPages && !isLoading) {
      dispatch(fetchArticles(currentPage + 1, 11));
      dispatch(fetchBookmarks());
    }
  };

  let scrolling = false;

  const onScroll = () => {
    if (!scrolling) { return; }
    scrolling = false;
    const scrollDifference = (document.getElementById('root').offsetHeight - window.innerHeight) - window.scrollY;
    if (scrollDifference <= 1) {
      fetchData();
    }
    window.requestAnimationFrame(onScroll);
  };

  const watchScroll = () => {
    if (!scrolling) {
      scrolling = true;
      onScroll();
    }
  };

  window.addEventListener('scroll', watchScroll);

  useEffect(() => {
    if (!currentPage && !isLoading && !error) { fetchData(); }
    return () => window.removeEventListener('scroll', watchScroll);
  }, [isLoading, error, currentPage]);

  return (
    <div>
      <ArticlePreviewList
        articles={newArticles}
        initial={currentPage < 1}
        isLoading={isLoading}
        ads={currentPage === 1 ? ads : []}
      />
    </div>
  );
};

ArticleContainer.propTypes = {
  newArticles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  currentPage: PropTypes.number.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {
    articles, isLoading, error, currentPage, numberOfPages, newArticles
  } = state.articleReducer;

  return {
    articles,
    newArticles,
    currentPage,
    numberOfPages,
    isLoading,
    error
  };
}

export default connect(mapStateToProps)(ArticleContainer);
