import React, { useState, useEffect } from 'react';
import Scroll from 'overlayscrollbars';
import CategoryMenuBtn from '../components/CategoryMenuBtn';
import CategoryMenu from '../components/CategoryMenu';

const CategoryMenuContainer = () => {
  const [menuState, setMenu] = useState({ open: false });

  let categoryMenu;
  let catetoryScroll;

  const onButtonClick = () => {
    if (!menuState.open) {
      setMenu({ open: true });
    } else {
      categoryMenu.style.removeProperty('left');
      menuState.open = false;
    }
  };

  const setMenuRef = (ref) => {
    if (!ref) { return; }
    categoryMenu = ref;
    categoryMenu.style.left = '0px';
  };

  const scrollRef = (ref) => {
    if (!ref) { return; }
    catetoryScroll = Scroll(ref, {
      overflowBehavior: { x: 'hidden' },
      scrollbars: {
        autoHide: 'move',
        autoHideDelay: 1000,
      }
    });
  };

  const closeMenu = (force) => {
    if (!menuState.open || force === true) {
      setMenu({ open: false });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 590) {
        closeMenu(true);
      }
    };
    window.addEventListener('resize', handleResize);

    const handleOutsideClick = ({ target }) => {
      if (!categoryMenu.contains(target)) {
        onButtonClick();
      }
    };
    if (categoryMenu) { window.addEventListener('click', handleOutsideClick); }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleOutsideClick);
      if (catetoryScroll) { catetoryScroll.destroy(); }
    };
  });

  return (
    <div className="category-menu-button container">
      {menuState.open
        ? (
          <CategoryMenu
            setMenuRef={setMenuRef}
            onCloseMenu={onButtonClick}
            closeMenu={closeMenu}
            scrollRef={scrollRef}
          />
        )
        : null}
      <CategoryMenuBtn onOpenMenu={onButtonClick} />
    </div>
  );
};

export default CategoryMenuContainer;
