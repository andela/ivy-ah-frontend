import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { v4 } from 'uuid';
import Button from './Button';

const SocialLogin = ({ buttonArray = [] }) => {
  const socialButtons = buttonArray.map((button, index) => (
    <a href={button.url} key={v4()}>
      <Button type={button.type}>
        <Icon size="large" name={button.icon} style={button.iconStyle} />
        <span style={{ fontWeight: '400' }}>
          {button.callToAction}
        </span>
      </Button>
    </a>
  ));
  return <div>{socialButtons}</div>;
};

SocialLogin.propTypes = {
  buttonArray: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SocialLogin;
