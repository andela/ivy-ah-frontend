import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import observer from '../helpers/observer';

const ArticlePreviewImage = ({ imageUrl, className }) => {
  let imgRef;

  const [status, setStatus] = useState('loading');

  const reducedImg = /res.cloudinary.com/.test(imageUrl)
    ? imageUrl.replace(/upload\//, 'upload/w_22,q_10,c_scale/') : false;

  useEffect(() => {
    if (!imgRef) { return; }
    imgRef.onerror = () => {
      setStatus('error');
    };
    imgRef.onload = () => {
      if (reducedImg) {
        imgRef.classList.add('reveal');
      }
    };
    imgRef.imageUrl = imageUrl;
    observer.observe(imgRef);
  });

  return (
    <div className={className}>
      {status === 'error'
        ? null : <img ref={(ref) => { imgRef = ref; }} onAnimationEnd={() => setStatus('loaded')} alt="article banner" />}
      {status === 'loading' && reducedImg ? <img src={reducedImg} alt="preview" /> : null}
      {status === 'error'
        ? (
          <div className="image error">
            <i className="icon frown outline" />
          </div>
        ) : null}
    </div>
  );
};

ArticlePreviewImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default ArticlePreviewImage;
