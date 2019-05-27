import React from 'react';
import PropTypes from 'prop-types';
import * as socialSharing from '../helpers/socialSharing';

const articleUrl = window.location.toString();

const SocialMedia = ({ title }) => (
  <div className="social-sharing">
    <button
      id="facebook"
      type="button"
      onClick={() => (socialSharing.facebookShare(title, articleUrl))}
    >
      <img src="https://res.cloudinary.com/politic/image/upload/v1558961287/facebook-icon.svg" alt="facebook-logo" />
    </button>
    <button
      id="twitter"
      type="button"
      onClick={() => (socialSharing.twitterShare(title, articleUrl))}
    >
      <img src="https://res.cloudinary.com/politic/image/upload/v1558961108/twitter-icon.svg" alt="twitter-logo" />
    </button>
    <button
      id="email"
      type="button"
      onClick={() => (socialSharing.emailShare(title, articleUrl))}
    >
      <img src="https://res.cloudinary.com/politic/image/upload/v1558961423/mail-icon.svg" alt="mail-logo" />
    </button>
  </div>
);

SocialMedia.propTypes = {
  title: PropTypes.string.isRequired
};

export default SocialMedia;
