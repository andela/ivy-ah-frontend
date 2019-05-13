import React, { useState, useEffect } from 'react';
import Scroll from 'overlayscrollbars';
import CategoryMenuBtn from '../components/CategoryMenuBtn';
import CategoryMenu from '../components/CategoryMenu';

const CategoryMenuContainer = () => {
  const [menuState, setMenu] = useState({ open: false });

  let categoryMenu;
  let scrollContainer;

  const onButtonClick = () => {
    if (!menuState.open) {
      setMenu({ open: true });
    } else {
      categoryMenu.style.removeProperty('left');
      menuState.open = false;
    }
  };

  const setMenuRef = (ref) => {
    categoryMenu = ref;
  };

  const scrollRef = (ref) => {
    Scroll(scrollContainer, {
      overflowBehavior: { x: 'hidden' },
      scrollbars: {
        autoHide: 'move',
        autoHideDelay: 1000,
      }
    });
    const handleOutsideClick = ({ target }) => {
      scrollContainer = ref;
      if (!categoryMenu) { return; }
      if (!categoryMenu.contains(target)) {
        onButtonClick();
        document.removeEventListener('click', handleOutsideClick);
      }
    };
    document.addEventListener('click', handleOutsideClick);
  };

  const closeMenu = () => {
    if (!menuState.open) {
      setMenu({ open: false });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 590) {
        onButtonClick();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
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
