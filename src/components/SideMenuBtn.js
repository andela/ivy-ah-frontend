import React from 'react';
import propTypes from 'prop-types';

const SideMenuBtn = ({ onOpenMenu }) => (
  <button type="button" className="side-menu-btn" onClick={onOpenMenu}>
    <i className="bars icon menu-bar" />
  </button>
);

SideMenuBtn.propTypes = {
  onOpenMenu: propTypes.func.isRequired
};

export default SideMenuBtn;
