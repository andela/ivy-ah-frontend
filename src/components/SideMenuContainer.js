import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SideMenuBtn from './SideMenuBtn';
import SideMenu from './SideMenu';
import { backgroundToggle } from '../helpers/backgroundToggle';

const SideMenuContainer = ({ isAuth, user }) => {
  const [menuState, setMenu] = useState({ open: false });

  let sideMenu;

  const onButtonClick = () => {
    if (!menuState.open) {
      setMenu({ open: true });
      backgroundToggle(true);
    } else {
      sideMenu.style.removeProperty('left');
      menuState.open = false;
      backgroundToggle(false);
    }
  };

  const setMenuRef = (ref) => {
    if (!ref) { return; }
    sideMenu = ref;
  };

  const closeMenu = (force) => {
    if (!menuState.open || force === true) {
      setMenu({ open: false });
    }
  };

  useEffect(() => {
    const handleOutsideClick = ({ target }) => {
      if (!sideMenu.contains(target)) {
        onButtonClick();
      }
    };
    if (sideMenu) {
      sideMenu.style.left = '0px';
      window.addEventListener('click', handleOutsideClick);
    }

    const handleResize = () => {
      if (window.innerWidth > 590) {
        closeMenu(true);
        backgroundToggle(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div>
      {menuState.open
        ? (
          <SideMenu
            setMenuRef={setMenuRef}
            onCloseMenu={onButtonClick}
            closeMenu={closeMenu}
            isAuth={isAuth}
            user={user}
          />
        )
        : null}
      <SideMenuBtn onOpenMenu={onButtonClick} />
    </div>
  );
};

SideMenuContainer.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth: { token, user } }) => ({
  isAuth: !!token,
  user
});

export default connect(mapStateToProps)(SideMenuContainer);
