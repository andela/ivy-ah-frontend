import React from 'react';
import CategoryContainer from './CategoryContainer';
import CategoryContainerMobile from './CategoryContainerMobile';
import Header from './Header';
import JoinButton from '../containers/JoinButtonContainer';

const header = () => (
  <div className="top-header-container">
    <div className="main-header-container">
      <Header
        loginClass="ui primary button header-signin"
        signupClass="ui primary button header-signup"
        containerClass="auth-button-container"
      />
      <div id="header-container" className="ui center aligned container header-container">
        <h1 className="ui header header-title">
          GREAT AUTHORS
          <br />
          GREAT ARTICLES
        </h1>
        <div className="ui divider header-divider" />
        <p className="header-slogan">Platform for the creative at heart</p>
        <JoinButton />
      </div>
      <CategoryContainer />
      <CategoryContainerMobile />
    </div>
  </div>
);


export default header;
