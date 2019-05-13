import React from 'react';
import PropTypes from 'prop-types';

const ProfileContainerSwitch = (props) => {
  const {
    isMobile, setListRef, toggleList, setContentRef
  } = props;
  return isMobile ? (
    <div ref={setListRef} className="side-menu profile-content-list">
      <div className="close-menu-button container">
        <button type="button" onClick={toggleList} className="close-menu-button">
          <i className="angle left icon" />
        </button>
      </div>
      <div className="test-content-profile">
        <div className="profile-content-container">
          <div className="profile-menu-content first">
            <div className="profile-menu-image" />
            <p className="profile-menu-name">Kossy supreme</p>
          </div>
          <button type="button" className="side-menu button primary">New story</button>
          <button type="button" className="side-menu button primary">Profile</button>
          <button type="button" className="side-menu button primary">Sign out</button>
        </div>
      </div>
    </div>
  ) : (
    <div ref={setListRef} className="profile-content-list">
      <div ref={setContentRef} className="test-content-profile">
        <div className="profile-content-arrow" />
        <div className="profile-content-container">
          <div className="profile-menu-content first">
            <div className="profile-menu-image" />
            <p className="profile-menu-name">Kossy supreme</p>
          </div>
          <button type="button" className="profile-menu-content">New story</button>
          <button type="button" className="profile-menu-content">Profile</button>
          <button type="button" className="profile-menu-content">Sign out</button>
        </div>
      </div>
    </div>
  );
};

ProfileContainerSwitch.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  setListRef: PropTypes.func.isRequired,
  toggleList: PropTypes.func.isRequired,
  setContentRef: PropTypes.func.isRequired
};

export default ProfileContainerSwitch;
