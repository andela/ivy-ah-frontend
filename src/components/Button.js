import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const styledButton = ({ children, type }) => <Button active className={['btn', type].join(' ')}>{children}</Button>;

styledButton.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
export default styledButton;
