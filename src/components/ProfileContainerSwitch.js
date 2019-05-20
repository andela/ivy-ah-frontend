import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileContainerSwitch = ({
  isMobile, setListRef, setContentRef, signout, user
}) => (isMobile ? (
  <div className="profile-content-mobile">
    <div className="test-content-profile-mobile">
      <div className="profile-content-container">
        <div className="profile-menu-content mobile first">
          <img
            className="profile-menu-image"
            src={`https://ui-avatars.com/api/?bold=true&background=3157BE&color=fff&name=+${user.firstname}+${user.lastname}`}
            alt={`${user.firstname}`}
          />
          <p className="profile-menu-name">
            {`${user.firstname} ${user.lastname}`}
          </p>
        </div>
        <Link to="/createarticle">
          <button type="button" className="side-menu button primary">New story</button>
        </Link>
        <Link to="/profile">
          <button type="button" className="side-menu button primary">Profile</button>
        </Link>
        <button onClick={signout} type="button" className="side-menu button primary">Sign out</button>
      </div>
    </div>
  </div>
) : (
  <div ref={setListRef} className="profile-content-list">
    <div ref={setContentRef} className="test-content-profile">
      <div className="profile-content-container">
        <div className="profile-menu-content first">
          <img
            className="profile-menu-image"
            src={`https://ui-avatars.com/api/?bold=true&background=3157BE&color=fff&name=+${user.firstname}+${user.lastname}`}
            alt={`${user.firstname}`}
          />
          <p className="profile-menu-name">
            {`${user.firstname} ${user.lastname}`}
          </p>
        </div>
        <Link to="/createarticle">
          <button type="button" className="profile-menu-content">New story</button>
        </Link>
        <Link to={`/profile/${user.id}`}>
          <button type="button" className="profile-menu-content">Profile</button>
        </Link>
        <button onClick={signout} type="button" className="profile-menu-content">Sign out</button>
      </div>
    </div>
  </div>
));
ProfileContainerSwitch.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  setListRef: PropTypes.func.isRequired,
  setContentRef: PropTypes.func.isRequired,
  signout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default ProfileContainerSwitch;
