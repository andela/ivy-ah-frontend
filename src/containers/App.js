import React from 'react';
import PropTypes from 'prop-types';
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
import Header from 'Components/Header';
import Articles from 'Containers/ArticleContainer';
import Follow from 'Containers/Follow';
import createArticlePage from '../components/createArticlespage';
import CommentContainer from './CommentContainer';

const articles = () => (
  <div>
    <ArticleHeader />
    <Articles />
    <div style={{ display: 'none' }} id="background" className="background effect" />
  </div>
);

const singleArticle = ({ match }) => (
  <div className="single-article-page">
    <Header />
    <div className="article-view">
      <Article match={match} />
      <CommentContainer match={match} />
    </div>
  </div>
);

const profile = ({ match }) => (
  <div className="profile-outer-container">
    <Header />
    <Profile match={match} />
  </div>
);

const App = () => (

  <Router>
    <Auth />
    <Switch>
      <Route path="/follow" component={Follow} />
      <Route path="/forgotPassword" exact component={ForgotPasswordContainer} />
      <Route path="/resetPassword" exact component={ResetPasswordContainer} />
      <Route path="/requestSent" exact component={PasswordLinkSent} />
      <Route path="/" exact component={articles} />
      <Route path="/verify-email" component={Verify} />
      <Route path="/article/:id" component={singleArticle} />
      <Route
        path="/profile/:id"
        component={profile}
      />
      <Route path="/notfound" component={NotFound} />
      <Route path="/profile" component={Profile} />
      <Route path="/createarticle" component={createArticlePage} />
      <Route component={NotFound} />
    </Switch>
    <Footer />
  </Router>
);

singleArticle.propTypes = {
  match: PropTypes.object.isRequired,
};

profile.propTypes = {
  match: PropTypes.object.isRequired,
};

export default App;
