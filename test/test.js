import React from 'react';
import { shallow } from 'enzyme';
import Home from '../src/components/Home';
import NotFound from '../src/components/NotFound';

describe('<Home />', () => {
  it('it renders home component', () => {
    const h = shallow(<Home />);
    expect(h.find('h1').length).toEqual(1);
  });
});

describe('<NotFound />', () => {
  it('it renders home component', () => {
    const h = shallow(<NotFound />);
    expect(h.find('h1').length).toEqual(1);
  });
});
