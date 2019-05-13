import React from 'react';
import propTypes from 'prop-types';

const CategoryMenu = ({
  onCloseMenu, setMenuRef, closeMenu, scrollRef
}) => (
  <div ref={setMenuRef} onTransitionEnd={closeMenu} className="side-menu-container category">
    <div className="close-menu-button container">
      <button type="button" onClick={onCloseMenu} className="close-menu-button">
        <i className="angle left icon" />
      </button>
    </div>
    <p className="category title">Categories</p>
    <div className="side-menu category container outer" ref={scrollRef}>
      <div className="side-menu category container">
        <button type="button" className="side-menu button primary">Andela</button>
        <button type="button" className="side-menu button primary">Crime</button>
        <button type="button" className="side-menu button primary">Money</button>
        <button type="button" className="side-menu button primary">Power</button>
        <button type="button" className="side-menu button primary">Glory</button>
        <button type="button" className="side-menu button primary">Science</button>
        <button type="button" className="side-menu button primary">Tech</button>
        <button type="button" className="side-menu button primary">Mathematics</button>
        <button type="button" className="side-menu button primary">Religion</button>
        <button type="button" className="side-menu button primary">What Else</button>
        <button type="button" className="side-menu button primary">JavaScript</button>
        <button type="button" className="side-menu button primary">Python</button>
        <button type="button" className="side-menu button primary">Computing</button>
        <button type="button" className="side-menu button primary">AI</button>
        <button type="button" className="side-menu button primary">Gaming</button>
        <button type="button" className="side-menu button primary">Gossip</button>
        <button type="button" className="side-menu button primary">Rumour</button>
        <button type="button" className="side-menu button primary">Game of Thrones</button>
      </div>
    </div>
    <p className="side-menu footer text">
      {"Copyright Authors' Haven"}
    </p>
  </div>
);

CategoryMenu.propTypes = {
  onCloseMenu: propTypes.func.isRequired,
  setMenuRef: propTypes.func.isRequired,
  closeMenu: propTypes.func.isRequired,
  scrollRef: propTypes.func.isRequired
};

export default CategoryMenu;
