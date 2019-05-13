import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const VerifyPage = ({ email }) => (
  <div>
    <div id="nav">
      <h1>Authors Haven</h1>
    </div>
    <div id="main">
      <h1>Verify your email address</h1>
      <p>
We just sent an email to you
        <br />
        <span>{email}</span>
      </p>
      <p>Please check your inbox and follow the instructions in the mail to confirm your email</p>
    </div>
  </div>
);

const mapStateToProps = state => ({
  email: state.auth.email
});

VerifyPage.propTypes = {
  email: PropTypes.string.isRequired
};

export default connect(mapStateToProps, null)(VerifyPage);
