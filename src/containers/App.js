import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Verify from '../components/verifyPage';
import NotFound from '../components/NotFound';
import Login from '../components/Login';
import ForgotPasswordContainer from './ForgotPasswordContainer';
import ResetPasswordContainer from './ResetPassordContainer';
import PasswordLinkSent from '../components/PasswordLinkSent';
import Auth from './Auth';
import Article from './FetchArticle';
import Profile from './Profile';

const App = () => (

  <Router>
    <Auth />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/forgotPassword" exact component={ForgotPasswordContainer} />
      <Route path="/resetPassword" exact component={ResetPasswordContainer} />
      <Route path="/requestSent" exact component={PasswordLinkSent} />
      <Route path="/login" component={Login} />
      <Route path="/verify-email" component={Verify} />
      <Route path="/article/:id" component={Article} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
