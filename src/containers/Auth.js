import React from 'react';
import { Tab, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from '../components/AuthModal';
import SignupForm from '../components/SignupForm';
import AuthTab from '../components/AuthTab';
import SocialLogin from '../components/SocialLogin';
import { signUp, toggleModal } from '../actions/auth';


const buttonArray = [
  {
    type: 'whiteButton',
    icon: 'facebook square',
    iconStyle: { color: '#4267B2' },
    callToAction: 'Sign up with Facebook'
  },
  {
    type: 'whiteButton',
    icon: 'twitter',
    iconStyle: { color: '#00aced' },
    callToAction: 'Sign up with Twitter'
  }
];

const Auth = (props) => {
  const {
    loading,
    isAuthenticated,
    error,
    onSignup,
    openModal,
    onToggleModal,
    modalPane,
  } = props;

  const submitHandler = ({
    firstname, lastname, email, password
  }) => {
    onSignup(firstname, lastname, email, password);
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
            <SignupForm
              authError={error}
              signedUp={isAuthenticated}
              loading={loading}
              submit={submitHandler}
            />
          </div>
        </Tab.Pane>
      )
    },
    { menuItem: 'Sign in', render: () => <Tab.Pane>Sign in form</Tab.Pane> }
  ];

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
  authRedirectPath: state.auth.authRedirectPath,
  isAuthenticated: state.auth.token !== null,
  openModal: state.auth.openModal,
  modalPane: state.auth.modalPane,
});

const mapDispatchToProps = dispatch => ({
  onSignup:
  (firstname, lastname, email, password) => dispatch(signUp(firstname, lastname, email, password)),
  onToggleModal:
  modalPane => dispatch(toggleModal(modalPane))
});

Auth.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.oneOf(['null', null, PropTypes.object]).isRequired,
  onSignup: PropTypes.func,
  openModal: PropTypes.bool.isRequired,
  onToggleModal: PropTypes.func,
  modalPane: PropTypes.string
};

const defaultFunc = input => input;

Auth.defaultProps = {
  onSignup: defaultFunc,
  onToggleModal: defaultFunc,
  modalPane: 'sign in'
};

export default connect(mapStateToProps,
  mapDispatchToProps)(Auth);
