import React from 'react';
import { shallow } from 'enzyme';
import Home from '../src/components/Home';
import SignupForm from '../src/components/SignupForm';
import Button from '../src/components/Button';
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

describe('<SignupForm />', () => {
  it('it renders signup form', () => {
    const Signup = shallow(<SignupForm />);
    expect(Signup.find('Form').length).toEqual(1);
  });
});

describe('<Button />', () => {
  it('it renders signup form', () => {
    const button = shallow(<Button />);
    expect(button.find('Button').length).toEqual(1);
  });
});
