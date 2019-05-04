import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

const AuthErrorMessage = ({ error, hidden }) => {
  const list = error
    ? Object.keys(error).map(err => (
      <p>
        {err}
:
        {' '}
        {error[err]}
      </p>
    ))
    : null;
  return (
    <Message
      hidden={hidden}
      error
      header="OH! Seems We have an Error"
      list={list}
    />
  );
};

AuthErrorMessage.propTypes = {
  hidden: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.object.isRequired
};
export default AuthErrorMessage;
