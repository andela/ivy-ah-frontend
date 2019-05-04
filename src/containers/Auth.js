import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Divider } from 'semantic-ui-react';
import Modal from '../components/Modal';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/Login';
import AuthTab from '../components/AuthTab';
import SocialLogin from '../components/SocialLogin';
import { signUp } from '../actions/auth';

const buttonArray = [
  {
    type: 'whiteButton',
    icon: 'facebook square',
    iconColor: 'blue',
    callToAction: 'Signup with facebook'
  },
  {
    type: 'whiteButton',
    icon: 'twitter',
    iconColor: 'blue',
    callToAction: 'Signup with Twitter'
  }
];

const Auth = (props) => {
  const [formInput, setFormInput] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const submitHandler = (event) => {
    event.preventDefault();
    const {
      firstname, lastname, email, password
    } = formInput;
    props.onSignup(firstname, lastname, email, password);
  };

  const inputChangedHandler = (event, { name }) => {
    const updatedFormInput = {
      ...formInput
    };
    updatedFormInput[name] = event.target.value;
    setFormInput({
      ...updatedFormInput
    });
  };

  return (
    <Modal message="click me" size="small" callToAction="Auth button">
      <AuthTab>
        <div>
          <SocialLogin buttonArray={buttonArray} />
          <Divider style={{ margin: '2rem 0' }} horizontal>
          Or
          </Divider>
          <SignupForm submit={submitHandler} changed={inputChangedHandler} />
          <LoginForm submit={submitHandler} changed={inputChangedHandler} />
        </div>
      </AuthTab>
    </Modal>
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  verified: state.auth.verified,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onSignup: (firstname, lastname, email, password) => dispatch(signUp(firstname, lastname, email, password))
});

export default connect(mapStateToProps,
  mapDispatchToProps)(Auth);
