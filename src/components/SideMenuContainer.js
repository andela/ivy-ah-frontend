import React, { useState, useEffect } from 'react';
import SideMenuBtn from './SideMenuBtn';
import SideMenu from './SideMenu';
import { backgroundToggle } from '../helpers/backgroundToggle';

const SideMenuContainer = () => {
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
        ? <SideMenu setMenuRef={setMenuRef} onCloseMenu={onButtonClick} closeMenu={closeMenu} />
        : null}
      <SideMenuBtn onOpenMenu={onButtonClick} />
    </div>
  );
};

export default SideMenuContainer;
