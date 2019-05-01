import React, { useState } from 'react';
import { Tab, Divider, Button } from 'semantic-ui-react';

import Modal from '../components/AuthModal';
import SignupForm from '../components/SignupForm';
import AuthTab from '../components/AuthTab';
import SocialLogin from '../components/SocialLogin';

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

  const [modal, setModal] = useState({ open: false, opening: '' });

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
              signedUp={false}
              loading={false}
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
        <AuthTab active={modal.opening}>{panes}</AuthTab>
      </Modal>
    </div>
  );
};

export default Auth;
