import React from 'react';
import PropTypes from 'prop-types';

const AuthTab = ({ children }) => (
  <div className="authModal">
    <div className="authSwitch">
      <div className="row">
        <div><span className="switch ">Sign up</span></div>
        <div><span className="switch active">Sign In</span></div>
      </div>
    </div>
    <div className="margin-bottom-md">
      <p className="authMainText"> Create your Account </p>
      <p className="authSubText">Join the largest community of authors and readers</p>
    </div>
    { children }
  </div>
);

AuthTab.propTypes = {
  children: PropTypes.element.isRequired
};

export default AuthTab;
