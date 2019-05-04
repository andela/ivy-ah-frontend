import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';

const AuthTab = ({ children, active }) => (
  <div className="authTab">
    <Tab
      defaultActiveIndex={(active === 'sign in') ? 1 : 0}
      menu={{
        className: 'authMenu',
        stackable: true,
        borderless: true,
        tabular: false,
        size: 'massive',
        inverted: false,
        widths: 2,
        attached: true
      }}
      panes={children}
    />
  </div>
);

AuthTab.propTypes = {
  children: PropTypes.element.isRequired,
  active: PropTypes.string
};

AuthTab.defaultProps = {
  active: 'sign up'
};

export default AuthTab;
