import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Verify from 'Components/verifyPage';
import NotFound from 'Components/NotFound';
import ForgotPasswordContainer from 'Containers/ForgotPasswordContainer';
import ResetPasswordContainer from 'Containers/ResetPassordContainer';
import PasswordLinkSent from 'Components/PasswordLinkSent';
import Auth from 'Containers/Auth';
import Article from 'Containers/FetchArticle';
import Profile from 'Containers/Profile';
import ArticleHeader from 'Components/ArticleHeader';
import Footer from 'Components/Footer';
import Articles from 'Containers/ArticleContainer';
import { profileRedirect } from '../helpers/profileHelper';
import createArticlePage from '../components/createArticlespage';

const article = () => (
  <div>
    <ArticleHeader />
    <Articles />
    <Footer />
    <div style={{ display: 'none' }} id="background" className="background effect" />
  </div>
);

const App = () => (

  <Router>
    <Auth />
    <Switch>
      <Route path="/forgotPassword" exact component={ForgotPasswordContainer} />
      <Route path="/resetPassword" exact component={ResetPasswordContainer} />
      <Route path="/requestSent" exact component={PasswordLinkSent} />
      <Route path="/" exact component={article} />
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
      <Route path="/profile" component={Profile} />
      <Route path="/createarticle" component={createArticlePage} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
