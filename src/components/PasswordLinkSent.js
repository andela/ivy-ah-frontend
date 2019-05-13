import React from 'react';
import PropTypes from 'prop-types';


const ForgotPasswordForm = ({
  authError, submit, loading, signedUp
}) => (
  <div
    className="yellow-box"
    style={{
      position: 'absolute',
      height: '400px',
      width: '600px',
      margin: '-100px 0 0 -150px',
      top: '30%',
      left: '40%',
      padding: '35px',
      boxShadow: '2px 2px 12px 2px rgba(.2, .2, .2, .2)'
    }}
  >
    <div>
      <h2 style={{ textAlign: 'center', padding: '10px', color: 'black' }}>Link sent</h2>
      <p style={{
        padding: '10px', color: 'black', wordSpacing: '5px', border: 'solid #0645f0 1px'
      }}
      >
      Check your inbox and click on the link sent to reset your password.
      If you don not recieve an email,
      and its not in your spam folder this could mean you registered with a different email address.
      </p>

    </div>
  </div>
);

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func,
  signedUp: PropTypes.bool,
  loading: PropTypes.bool,
  authError: PropTypes.oneOf(['null', null, PropTypes.object]).isRequired,
};

const defaultFunc = input => input;

ForgotPasswordForm.defaultProps = {
  signedUp: false,
  loading: false,
  submit: defaultFunc
};


export default ForgotPasswordForm;
