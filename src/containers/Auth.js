import React from 'react';
import { Tab, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from 'Components/AuthModal';
import SignupForm from 'Components/SignupForm';
import LoginForm from 'Components/loginForm';
import AuthTab from 'Components/AuthTab';
import SocialLogin from 'Components/SocialLogin';
import { signUp, logIn, toggleModal } from 'Actions/auth';
import VerifyPage from 'Components/verifyEmail';


const buttonArray = callToAction => (
  [
    {
      type: 'whiteButton',
      icon: 'facebook square',
      iconColor: 'blue',
      callToAction: `${callToAction} Facebook`
    },
    {
      type: 'whiteButton',
      icon: 'twitter',
      iconColor: 'blue',
      callToAction: `${callToAction} Twitter`
    }
  ]
);

const Auth = (props) => {
  const {
    loading,
    isAuthenticated,
    error,
    onLogin,
    onSignup,
    openModal,
    onToggleModal,
    modalPane,
    shouldRedirect,
    userEmail
  } = props;

  const signupSubmitHandler = ({
    firstname, lastname, email, password
  }) => {
    onSignup(firstname, lastname, email, password);
  };

  const loginSubmitHandler = ({
    email, password
  }) => {
    onLogin(email, password);
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
            <SocialLogin buttonArray={buttonArray('Sign up with')} />
            <Divider style={{ margin: '2rem 0' }} horizontal>
              Or
            </Divider>
            <SignupForm
              authError={error}
              signedUp={isAuthenticated}
              loading={loading}
              submit={signupSubmitHandler}
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
            <LoginForm
              authError={error}
              loggedIn={isAuthenticated}
              loading={loading}
              submit={loginSubmitHandler}
            />
          </div>
        </Tab.Pane>
      )
    }
  ];

  if (shouldRedirect) {
    return <VerifyPage email={userEmail} />;
  }
  return (
    <div>
      <Modal
        close={() => onToggleModal()}
        open={openModal}
        size="small"
        callToAction="Auth button"
      >
        <AuthTab active={modalPane}>{modalPanes}</AuthTab>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  verified: state.auth.verified,
  isAuthenticated: state.auth.token !== null,
  openModal: state.auth.openModal,
  modalPane: state.auth.modalPane,
  shouldRedirect: state.auth.shouldRedirect,
  userEmail: state.auth.email
});

const mapDispatchToProps = dispatch => ({
  onSignup:
  (firstname, lastname, email, password) => dispatch(signUp(firstname, lastname, email, password)),
  onLogin:
  (email, password) => dispatch(logIn(email, password)),
  onToggleModal:
  modalPane => dispatch(toggleModal(modalPane))
});

Auth.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.oneOf(['null', null, PropTypes.object]).isRequired,
  onLogin: PropTypes.func,
  onSignup: PropTypes.func,
  openModal: PropTypes.bool.isRequired,
  onToggleModal: PropTypes.func,
  modalPane: PropTypes.string,
  shouldRedirect: PropTypes.bool.isRequired,
  userEmail: PropTypes.string.isRequired,
};

const defaultFunc = input => input;

Auth.defaultProps = {
  onLogin: defaultFunc,
  onSignup: defaultFunc,
  onToggleModal: defaultFunc,
  modalPane: 'sign in'
};

export default connect(mapStateToProps,
  mapDispatchToProps)(Auth);
