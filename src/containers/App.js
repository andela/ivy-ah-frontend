import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'Components/Home';
import Verify from 'Components/verifyPage';
import NotFound from 'Components/NotFound';
import Login from 'Components/Login';
import ForgotPasswordContainer from 'Containers/ForgotPasswordContainer';
import ResetPasswordContainer from 'Containers/ResetPassordContainer';
import PasswordLinkSent from 'Components/PasswordLinkSent';
import Auth from 'Containers/Auth';
import Article from 'Containers/FetchArticle';
import Profile from 'Containers/Profile';
import { profileRedirect } from '../helpers/profileHelper';


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
      <Route
        exact
        path="/profileRedirect/:id"
        component={profileRedirect}
      />
      <Route
        path="/profile/:id"
        component={Profile}
      />
      <Route path="/notfound" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
