import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { v4 } from 'uuid';
import Button from './Button';

const SocialLogin = ({ buttonArray = [] }) => {
  const socialButtons = buttonArray.map((button, index) => (
    <Button key={v4()} type={button.type}>
      <Icon size="large" name={button.icon} color={button.iconColor} />
      <span style={{ color: '#676767', fontWeight: '200' }}>
        {button.callToAction}
      </span>
    </Button>
  ));
  return <div>{socialButtons}</div>;
};

SocialLogin.propTypes = {
  buttonArray: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SocialLogin;
