import { Component } from 'react';

class verifyRedirect extends Component {
  componentWillMount() {
    window.location = '/verify-email';
  }
}

export default verifyRedirect;
