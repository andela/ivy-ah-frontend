import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { decode } from 'jsonwebtoken';
import { authSuccess } from '../actions/auth';

const SocialAuthRedirect = ({ onAuthSuccess }) => {
  const value = queryString.parse(location.search);
  const { token } = value;
  const user = decode(token) || {};
  onAuthSuccess(token, user.id, user.email);
  return (
    <Redirect to="/" />
  );
};

SocialAuthRedirect.propTypes = {
  onAuthSuccess: PropTypes.func.isRequired
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  onAuthSuccess: (token, userid, email) => dispatch(authSuccess(token, userid, email))
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialAuthRedirect);
