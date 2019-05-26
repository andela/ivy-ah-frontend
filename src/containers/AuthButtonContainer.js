import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleModal, signOut } from '../actions/auth';
import ProfileContainer from './ProfileContainer';
import { persistor } from '../store';

const AuthButtonContainer = ({
  token, user, signup, login, signout, signupClass, loginClass, containerClass, onClick
}) => {
  const click = (islogin) => {
    if (islogin) { login(); } else { signup(); }
    if (onClick) { onClick(); }
  };
  return !token ? (
    <div className={containerClass}>
      <button onClick={() => click(true)} type="button" className={signupClass}>Sign In</button>
      <button onClick={() => click(false)} type="button" className={loginClass}>Sign Up</button>
    </div>
  ) : (
    <ProfileContainer signout={signout} user={user} />
  );
};

const mapDispatchToProps = dispatch => ({
  signup: () => dispatch(toggleModal('sign up')),
  login: () => dispatch(toggleModal('sign in')),
  signout: () => {
    dispatch(signOut());
    persistor.flush().then(() => window.location.reload());
  },
});

const mapStateToProps = ({ auth: { token, user }, profileReducer }) => ({
  token,
  user
});

AuthButtonContainer.propTypes = {
  token: PropTypes.string,
  signup: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loginClass: PropTypes.string.isRequired,
  signupClass: PropTypes.string.isRequired,
  containerClass: PropTypes.string.isRequired,
  onClick: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.func]),
  signout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

AuthButtonContainer.defaultProps = {
  onClick: false,
  token: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthButtonContainer);
