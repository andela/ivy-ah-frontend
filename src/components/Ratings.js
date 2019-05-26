import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Hype from './Hype';
import { rateAnArticle } from '../actions/rating';

export const Rating = ({
  userCurrentHype, updateHypeError, rateArticleHandler, articleId,
}) => {
  const [hypeHoverIndex, setHoverIndex] = useState(0);
  const [clickedHypeIndex, setHypeIndex] = useState(0);
  const [hypesColor, setHypesColor] = useState(false);

  const hoverPosition = (position) => {
    setHoverIndex(position);
  };

  const mouseLeave = () => {
    setHoverIndex(0);
    if (!clickedHypeIndex) {
      setHypesColor(false);
    }
  };

  const updateHypeClass = (position) => {
    if (updateHypeError) {
      setHypeIndex(userCurrentHype);
    }
    if (hypeHoverIndex === 0 && position <= clickedHypeIndex) {
      return 'hype-blue';
    }
    if (hypeHoverIndex !== 0 && position <= hypeHoverIndex) {
      setHypesColor(true);
      return 'hype-blue';
    }
    return '';
  };

  const clicked = (position) => {
    rateArticleHandler(articleId, position);
    setHypeIndex(position);
  };

  const generateHypes = () => {
    const hypes = [];
    for (let i = 1; i <= 5; i += 1) {
      hypes.push(<Hype
        key={i}
        hovered={hoverPosition}
        mouseLeave={mouseLeave}
        position={i}
        resolveClass={updateHypeClass}
        clicked={clicked}
        hypesColor={hypesColor}
      />);
    }
    return hypes;
  };

  return (
    <div className="rating">
      {generateHypes()}
    </div>
  );
};

const mapStateToProps = state => ({
  userCurrentHype: state.article.userCurrentHype,
  updateHypeError: state.article.updateHypeError,
  articleId: state.article.article.data.id,
  isLoggedIn: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  rateArticleHandler: (articleId, position) => dispatch(rateAnArticle(articleId, position)),
});

Rating.propTypes = {
  updateHypeError: PropTypes.bool.isRequired,
  userCurrentHype: PropTypes.number.isRequired,
  rateArticleHandler: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Rating);
