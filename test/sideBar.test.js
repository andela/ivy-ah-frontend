import React from 'react';
import renderer from 'react-test-renderer';

const onCloseMenu = jest.fn();
const setMenuRef = jest.fn();
const closeMenu = jest.fn();

it('renders the side bar', () => {
  const sideBar = renderer
    .create(<sideMenu
      onCloseMenu={onCloseMenu}
      setMenuRef={setMenuRef}
      closeMenu={closeMenu}
    />)
    .toJSON();
  expect(sideBar).toMatchSnapshot();
});
