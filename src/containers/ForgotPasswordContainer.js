import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import ForgotPasswordForm from '../components/ForgotPasswordForm';
import { sendLink } from '../actions/password';

const forgPassword = (props) => {
  const {
    loading,
    error,
    isAuthenticated,
    onSignup,
    passwordResetToken
  } = props;

  const submitHandler = ({ email, url }) => {
    onSignup(email, url);
  };

  return !passwordResetToken ? (
    <div>
      <div>
        <ForgotPasswordForm
          authError={error}
          signedUp={isAuthenticated}
          loading={loading}
          submit={submitHandler}
        />
      </div>
    </div>
  ) : (
    <Redirect to="/forgotPasswordo" />
  );
};

const mapStateToProps = state => ({
  loading: state.forgotPassword.loading,
  error: state.forgotPassword.error,
  isAuthenticated: state.forgotPassword.isAuthenticated,
  passwordResetToken: state.forgotPassword.passwordResetToken
});

const mapDispatchToProps = dispatch => ({
  onSignup: (email, url) => dispatch(sendLink(email, url)),
});

forgPassword.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.oneOf(['null', null, PropTypes.object]).isRequired,
  onSignup: PropTypes.func,
  passwordResetToken: PropTypes.bool.isRequired
};

const defaultFunc = input => input;

forgPassword.defaultProps = {
  onSignup: defaultFunc,
};

export default connect(mapStateToProps, mapDispatchToProps)(forgPassword);
