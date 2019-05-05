import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tab, Divider, Button } from 'semantic-ui-react';

import Modal from '../components/AuthModal';
import SignupForm from '../components/SignupForm';
import AuthTab from '../components/AuthTab';
import SocialLogin from '../components/SocialLogin';
import { signUp } from '../actions/auth';
import AuthErrorMessage from '../components/AuthErrorMessage';
import authValidation from '../helpers/authValidation';

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
  const {
    loading, isAuthenticated, error, onSignup
  } = props;

  const [formInput, setFormInput] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    formError: {}
  });

  const [modal, setModal] = useState({ open: false, opening: '' });

  const submitHandler = (event) => {
    event.preventDefault();
    const {
      formError, firstname, lastname, email, password
    } = formInput;
    if (Object.keys(formError).length === 0) {
      onSignup(firstname, lastname, email, password);
    }
  };

  const modalHandler = (open, opening) => {
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

  const checkInputValidity = (event) => {
    const updatedFormInput = { ...formInput };
    const fieldName = event.target.name;
    const checkForm = authValidation(fieldName, updatedFormInput);
    setFormInput({
      ...updatedFormInput,
      formError: checkForm
    });
  };

  const modalPanes = [
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
            <AuthErrorMessage
              hidden={
                !!(!error && Object.keys(formInput.formError).length === 0)
              }
              error={error || formInput.formError}
            />
            <SignupForm
              blured={checkInputValidity}
              value={formInput}
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
      <Button onClick={() => modalHandler(true, 'sign up')}>Sign up</Button>
      <Button onClick={() => modalHandler(true, 'sign in')}>Sign in</Button>
      <Modal
        close={() => modalHandler(false, '')}
        open={modal.open}
        size="small"
        callToAction="Auth button"
      >
        <AuthTab active={modal.opening}>{modalPanes}</AuthTab>
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
  onSignup:
  (firstname, lastname, email, password) => dispatch(signUp(firstname, lastname, email, password))
});

Auth.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.oneOf(['null', PropTypes.object]).isRequired,
  onSignup: PropTypes.func

};

const defaultFunc = input => input;

Auth.defaultProps = {
  onSignup: defaultFunc
};

export default connect(mapStateToProps,
  mapDispatchToProps)(Auth);
