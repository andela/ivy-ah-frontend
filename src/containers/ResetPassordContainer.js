import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { toggleModal } from '../actions/auth';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { reset } from '../actions/password';

const resetPassword = (props) => {
  const {
    loading,
    error,
    isAuthenticated,
    onSignup,
    message,
    login
  } = props;

  const submitHandler = ({ password }) => {
    onSignup(password);
  };

  if (message) {
    login();
  }

  return !message ? (
    <div>
      <div>
        <ResetPasswordForm
          authError={error}
          signedUp={isAuthenticated}
          loading={loading}
          submit={submitHandler}
        />
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

const mapStateToProps = state => ({
  loading: state.resetPassword.loading,
  error: state.resetPassword.error,
  isAuthenticated: state.resetPassword.isAuthenticated,
  message: state.resetPassword.message
});

const mapDispatchToProps = dispatch => ({
  onSignup: password => dispatch(reset(password)),
  login: () => dispatch(toggleModal('sign in'))
});

resetPassword.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.oneOf(['null', null, PropTypes.object]).isRequired,
  onSignup: PropTypes.func,
  message: PropTypes.bool.isRequired,
  login: PropTypes.bool.isRequired
};

const defaultFunc = input => input;

resetPassword.defaultProps = {
  onSignup: defaultFunc,
};

export default connect(mapStateToProps, mapDispatchToProps)(resetPassword);
