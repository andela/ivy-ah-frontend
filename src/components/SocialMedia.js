import React from 'react';
import PropTypes from 'prop-types';
import facebookIcon from '../assets/sass/components/assets/facebook-icon.svg';
import twitterIcon from '../assets/sass/components/assets/twitter-icon.svg';
import mailIcon from '../assets/sass/components/assets/mail-icon.svg';
import * as socialSharing from '../helpers/socialSharing';

const articleUrl = window.location.toString();

const SocialMedia = ({ title }) => (
  <div className="social-sharing">
    <button
      id="facebook"
      type="button"
      onClick={() => (socialSharing.facebookShare(title, articleUrl))}
    >
      <img src={facebookIcon} alt="facebook-logo" />
    </button>
    <button
      id="twitter"
      type="button"
      onClick={() => (socialSharing.twitterShare(title, articleUrl))}
    >
      <img src={twitterIcon} alt="twitter-logo" />
    </button>
    <button
      id="email"
      type="button"
      onClick={() => (socialSharing.emailShare(title, articleUrl))}
    >
      <img src={mailIcon} alt="mail-logo" />
    </button>
  </div>
);

SocialMedia.propTypes = {
  title: PropTypes.string.isRequired
};

export default SocialMedia;
