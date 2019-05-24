import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleModal, signOut } from '../actions/auth';
import { clearArticleEditor } from '../actions/createArticleActions';
import ProfileContainer from './ProfileContainer';
import { persistor } from '../store';

const AuthButtonContainer = ({
  token, user, signup, login, signout, signupClass,
  loginClass, containerClass, onClick, clearEditor, editorOpen
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
    <ProfileContainer
      signout={signout}
      user={user}
      clearEditor={clearEditor}
      editorOpen={editorOpen}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  signup: () => dispatch(toggleModal('sign up')),
  login: () => dispatch(toggleModal('sign in')),
  signout: () => {
    dispatch(signOut());
    persistor.flush().then(() => window.location.reload());
  },
  clearEditor: () => dispatch(clearArticleEditor())
});

const mapStateToProps = ({ auth: { token, user }, createArticleReducer: { editorOpen } }) => ({
  token,
  user,
  editorOpen,
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
  clearEditor: PropTypes.func.isRequired,
  editorOpen: PropTypes.bool.isRequired,
};

AuthButtonContainer.defaultProps = {
  onClick: false,
  token: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthButtonContainer);
