/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Tab, Divider, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import Modal from '../components/AuthModal';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/Login';
import AuthTab from '../components/AuthTab';
import SocialLogin from '../components/SocialLogin';
import { signUp, login, failedValidation } from '../actions/auth';
import AuthErrorMessage from '../components/AuthErrorMessage';

const buttonArray = callToAction => (
  [
    {
      type: 'whiteButton',
      icon: 'facebook square',
      iconColor: 'blue',
      callToAction: `${callToAction} facebook`
    },
    {
      type: 'whiteButton',
      icon: 'twitter',
      iconColor: 'blue',
      callToAction: `${callToAction} Twitter`
    }
  ]);

const Auth = (props) => {
  const {
    loading, isAuthenticated, error
  } = props;
  const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  const [formInput, setFormInput] = useState(initialState);

  const [modal, setModal] = useState({ open: false, opening: '' });

  const getFormErrors = (email, password, confirmPassword, firstname, lastname) => {
    const errors = {};
    if (email.trim() === '') {
      errors.foundError = true;
      errors.email = 'email address is required';
    }
    if (password.trim() === '') {
      errors.foundError = true;
      errors.password = 'password is required';
    } else if (password.trim().length < 8) {
      errors.foundError = true;
      errors.password = 'password must be at least 8 chracters long';
    } else if (confirmPassword !== undefined && confirmPassword.trim() === '') {
      errors.foundError = true;
      errors.password = 'Please confirm your password';
    } else if (confirmPassword !== undefined && password.trim() !== confirmPassword.trim()) {
      errors.foundError = true;
      errors.password = 'passwords do not match';
    }
    if (firstname !== undefined && firstname.trim() === '') {
      errors.foundError = true;
      errors.firstname = 'firstname is required';
    }
    if (lastname !== undefined && lastname.trim() === '') {
      errors.foundError = true;
      errors.lastname = 'lastname is required';
    }
    return errors;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const {
      firstname, lastname, email, password, confirmPassword
    } = formInput;
    const errors = getFormErrors(email, password, confirmPassword, firstname, lastname);
    if (errors.foundError) {
      props.reportError(errors);
    } else {
      props.onSignup(firstname, lastname, email, password);
    }
  };

  const submitHandlerLogin = (event) => {
    event.preventDefault();
    const {
      email, password
    } = formInput;
    const errors = getFormErrors(email, password);
    if (errors.foundError) {
      props.reportError(errors);
    } else {
      props.onLogin(email, password);
    }
  };

  const modalHandler = (open, opening) => {
    setFormInput({
      ...initialState
    });
    const updatedModal = {
      ...modal
    };
    updatedModal.open = open;
    updatedModal.opening = opening;
    setModal({
      ...updatedModal
    });
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
            <SocialLogin buttonArray={buttonArray('Signup with')} />
            <Divider style={{ margin: '2rem 0' }} horizontal>
              Or
            </Divider>
            <AuthErrorMessage hidden={!error} error={error} />
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
    {
      menuItem: 'Sign in',
      render: () => (
        <Tab.Pane>
          {' '}
          <div>
            <div className="margin-bottom-md">
              <p className="authMainText"> Sign in to your Account </p>
              <p className="authSubText">
                Join the largest community of authors and readers
              </p>
            </div>
            <SocialLogin buttonArray={buttonArray('Continue with')} />
            <Divider style={{ margin: '2rem 0' }} horizontal>
              Or
            </Divider>
            <AuthErrorMessage hidden={!error} error={error} />
            <LoginForm
              loggedIn={isAuthenticated}
              loading={loading}
              submit={submitHandlerLogin}
              changed={inputChangedHandler}
            />
          </div>
        </Tab.Pane>
      )
    }
  ];

  return (
    <div>
      <Button onClick={() => modalHandler(true, 'sign up')}>Sign up</Button>
      <Button onClick={() => modalHandler(true, 'sign in')}>Sign in</Button>
      <Modal
        close={() => modalHandler(false, '')}
        open={modal.open}
        size="small"
        callToAction="Auth button"
      >
        <AuthTab active={modal.opening}>{panes}</AuthTab>
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
  reportError: error => dispatch(failedValidation(error)),
  onSignup: (firstname,
    lastname,
    email,
    password) => dispatch(signUp(firstname, lastname, email, password)),
  onLogin: (email,
    password) => dispatch(login(email, password))
});

Auth.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  reportError: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onSignup: PropTypes.func.isRequired,
};

export default connect(mapStateToProps,
  mapDispatchToProps)(Auth);
