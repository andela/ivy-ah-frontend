import React from 'react';
import propTypes from 'prop-types';

const CategoryMenuBtn = ({ onOpenMenu }) => (
  <button onClick={onOpenMenu} type="button" className="side-menu button primary category">
    Categories
    <i className="angle right icon" />
  </button>
);

CategoryMenuBtn.propTypes = {
  onOpenMenu: propTypes.func.isRequired
};

export default CategoryMenuBtn;
