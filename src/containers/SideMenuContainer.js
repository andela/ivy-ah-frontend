import React, { useState, useEffect } from 'react';
import SideMenuBtn from '../components/SideMenuBtn';
import SideMenu from '../components/SideMenu';
import { backgroundToggle, background } from '../helpers/backgroundToggle';

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
    sideMenu = ref;
  };

  const closeMenu = () => {
    if (!menuState.open) {
      setMenu({ open: false });
    }
  };

  useEffect(() => {
    if (sideMenu) {
      sideMenu.style.left = '0px';

      const handleOutsideClick = () => {
        onButtonClick();
        background().removeEventListener('click', handleOutsideClick);
      };
      background().addEventListener('click', handleOutsideClick);

      const handleResize = () => {
        if (window.innerWidth > 590) {
          onButtonClick();
        }
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('click', handleOutsideClick);
        window.removeEventListener('resize', handleResize);
      };
    }
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
