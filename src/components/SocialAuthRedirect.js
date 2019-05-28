import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';
import { decode } from 'jsonwebtoken';
import { authSuccess } from '../actions/auth';

const SocialAuthRedirect = ({ onAuthSuccess }) => {
  const value = qs.parse(location.search);
  const token = value['?token'];
  const user = decode(token) || {};
  onAuthSuccess(token, user.id, user.email);
  return (
    <Redirect to="/" />
  );
};

SocialAuthRedirect.propTypes = {
  onAuthSuccess: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onAuthSuccess: (token, userid, email) => dispatch(authSuccess(token, userid, email))
});

export default connect(null, mapDispatchToProps)(SocialAuthRedirect);
