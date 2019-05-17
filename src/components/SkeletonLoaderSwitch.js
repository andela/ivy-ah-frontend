import React from 'react';
import PropTypes from 'prop-types';

const SkeletonPreviewSwitch = ({ isSmall }) => {
  if (isSmall) {
    return (
      <div className="ui card article-card-small">
        <div className="content">
          <div className="ui placeholder">
            <div className="rectangular image" />
            <div className="line" />
            <div className="line" />
            <div className="line" />
            <div className="line" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="ui card article-card-large skeleton">
      <div className="content">
        <div className="ui placeholder">
          <div className="rectangular image" />
          <div className="line" />
          <div className="line" />
        </div>
      </div>
    </div>
  );
};

SkeletonPreviewSwitch.propTypes = {
  isSmall: PropTypes.bool.isRequired,
};

export default SkeletonPreviewSwitch;
