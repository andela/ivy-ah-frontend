/**
 * @jest-environment jsdom
 */

import React from 'react';
import { mount } from 'enzyme';
import CategoryContainer from '../src/components/CategoryContainer';
import CategoryContainerMobile from '../src/components/CategoryContainerMobile';
import CategoryMenu from '../src/components/CategoryMenu';
import CategoryMenuBtn from '../src/components/CategoryMenuBtn';
import CategoryMenuContainer from '../src/containers/CategoryMenuContainer';

jest.mock('overlayscrollbars', () => jest.fn((a, options) => {
  if (options.callbacks) {
    options.callbacks.onOverflowChanged({ xScrollable: true });
    options.callbacks.onHostSizeChanged({ width: 500 });
    options.callbacks.onContentSizeChanged({ width: 500 });
    options.callbacks.onScroll({ target: { scrollLeft: 5000000 } });
    options.callbacks.onScroll({ target: { scrollLeft: -10 } });
  }
  return {
    getElements: () => ({ scrollLeft: 500 }),
    scroll: () => 0,
    destroy: () => 0
  };
}));

it('renders <CategoryContainer />', () => {
  const sideBar = mount(<CategoryContainer />);
  sideBar.find('.direction-button.left').simulate('click');
  sideBar.find('.direction-button.right').simulate('click');
  expect(sideBar.find('.main-category-container').length).toEqual(1);
  sideBar.unmount();
});

it('renders <CategoryMobileContainer />', () => {
  const wrapper = mount(<CategoryContainerMobile />);
  expect(wrapper.find(CategoryContainerMobile).length).toEqual(1);
  wrapper.unmount();
});

it('renders <CategoryMenu />', () => {
  const onCloseMenu = () => 0;
  const setMenuRef = () => 0;
  const closeMenu = () => 0;
  const scrollRef = () => 0;
  const wrapper = mount(<CategoryMenu
    onCloseMenu={onCloseMenu}
    setMenuRef={setMenuRef}
    closeMenu={closeMenu}
    scrollRef={scrollRef}
  />);
  expect(wrapper.find(CategoryMenu).length).toEqual(1);
  wrapper.unmount();
});

it('renders <CategoryMenuBtn />', () => {
  const wrapper = mount(<CategoryMenuBtn />);
  expect(wrapper.find(CategoryMenuBtn).length).toEqual(1);
  wrapper.unmount();
});

it('renders <CategoryMenuContainer />', () => {
  const wrapper = mount(<CategoryMenuContainer />);
  wrapper.find(CategoryMenuBtn).simulate('click');
  wrapper.update();

  wrapper.find('.side-menu-container.category').simulate('transitionend');
  wrapper.update();
  mount(<div />).simulate('click');
  wrapper.find('button.close-menu-button').simulate('click');
  wrapper.find('.side-menu-container.category').simulate('transitionend');

  wrapper.unmount();


  expect(wrapper.find(CategoryMenuContainer).length).toEqual(0);
});
