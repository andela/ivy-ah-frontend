import React from 'react';
import { Divider } from 'semantic-ui-react';
import Modal from '../components/Modal';
import SignupForm from '../components/SignupForm';
import AuthTab from '../components/AuthTab';
import SocialLogin from '../components/SocialLogin';

const buttonArray = [
  {
    type: 'whiteButton', icon: 'facebook square', iconColor: 'blue', callToAction: 'Signup with facebook'
  },
  {
    type: 'whiteButton', icon: 'twitter', iconColor: 'blue', callToAction: 'Signup with Twitter'
  }

];
const Auth = () => (
  <Modal message="click me" size="small" callToAction="Auth button">
    <AuthTab>
      <div>
        <SocialLogin buttonArray={buttonArray} />
        <Divider style={{ margin: '2rem 0' }} horizontal>Or</Divider>
        <SignupForm />
      </div>
    </AuthTab>
  </Modal>
);

export default Auth;
