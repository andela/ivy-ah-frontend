import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Tab, Divider, Button } from 'semantic-ui-react';

import Modal from '../components/AuthModal';
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
  const { loading, signedUp, authRedirectPath, isAuthenticated } = props;

  const [formInput, setFormInput] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [shouldOpen, setShouldOpen] = useState({ shouldOpen: false, opening: 'sign up' });

  console.log(props);
  let authRedirect = null;
  if (signedUp) {
    authRedirect = <Redirect to={authRedirectPath} />;
  }

  console.log(authRedirect, authRedirectPath);

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

  const panes = [
    {
      menuItem: 'Sign up',
      render: () => (
        <Tab.Pane>
          {' '}
          <div>
            <div className="margin-bottom-md">
              <p className="authMainText"> Create your Account </p>
              <p className="authSubText">
                Join the largest community of authors and readers
              </p>
            </div>
            <SocialLogin buttonArray={buttonArray} />
            <Divider style={{ margin: '2rem 0' }} horizontal>
              Or
            </Divider>
            <SignupForm
              signedUp={isAuthenticated}
              loading={loading}
              submit={submitHandler}
              changed={inputChangedHandler}
            />
          </div>
        </Tab.Pane>
      )
    },
    { menuItem: 'Sign in', render: () => <Tab.Pane>Sign in form</Tab.Pane> }
  ];

  return (
    <div>
      <Button onClick>Mini</Button>
      <Button >Tiny</Button>
      <Modal message="click me" open={shouldOpen} size="small" callToAction="Auth button">
        <AuthTab>{panes}</AuthTab>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  verified: state.auth.verified,
  authRedirectPath: state.auth.authRedirectPath,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onSignup: (firstname, lastname, email, password) => dispatch(signUp(firstname, lastname, email, password))
});

export default connect(mapStateToProps,
  mapDispatchToProps)(Auth);
