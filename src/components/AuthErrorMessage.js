import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

const AuthErrorMessage = ({ error, hidden }) => {
  if (typeof (error) === 'string') {
    error = { error };
  }
  const list = error
    ? Object.keys(error).map(err => (
      <p>
        {' '}
        {error[err]}
      </p>
    ))
    : null;
  return (
    <Message
      hidden={hidden}
      error
      header="Oh! It seems something went wrong"
      list={list}
    />
  );
};

AuthErrorMessage.propTypes = {
  hidden: PropTypes.bool.isRequired,
  error: PropTypes.oneOf(['null', {}]).isRequired
};
export default AuthErrorMessage;
