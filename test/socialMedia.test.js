import React from 'react';
import { mount } from 'enzyme';
import SocialMedia from '../src/components/SocialMedia';

window.open = jest.fn();

describe('Social Media Sharing', () => {
  it('should render the component', () => {
    const props = {
      title: 'My first Article'
    };
    const wrapper = mount(<SocialMedia {...props} />);
    wrapper.find('#facebook').simulate('click');
    wrapper.find('#twitter').simulate('click');
    wrapper.find('#email').simulate('click');
    expect(wrapper.find('button').length).toEqual(3);
    expect(wrapper.find('img').length).toEqual(3);
  });
});
