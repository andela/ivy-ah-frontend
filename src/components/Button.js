import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const styledButton = ({
  children, type, clicked, loading, disabled
}) => <Button disabled={disabled} loading={loading} onClick={clicked} active className={['btn', type].join(' ')}>{children}</Button>;

styledButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  type: PropTypes.string.isRequired,
  clicked: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,

};

const defaultFunc = input => input;

styledButton.defaultProps = {
  loading: false,
  disabled: false,
  clicked: defaultFunc,


};
export default styledButton;
