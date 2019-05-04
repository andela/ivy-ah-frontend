import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import NotFound from '../components/NotFound';
import Login from '../components/Login';
import ForgotPassword from '../components/forgotPasswordForm';
// import Auth from './Auth';

const App = () => (

  <Router>
    {/* <Auth /> */}
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/forgotPassword" exact component={() => <ForgotPassword passwordHandler="yes" />} />
      <Route path="/resetPassword" exact component={ForgotPassword} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
