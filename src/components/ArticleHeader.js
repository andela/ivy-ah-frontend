import React from 'react';
import CategoryContainer from './CategoryContainer';
import CategoryContainerMobile from './CategoryContainerMobile';
import SideMenuContainer from './SideMenuContainer';
import AuthButtonContainer from '../containers/AuthButtonContainer';

const header = () => (
  <div className="top-header-container">
    <div className="main-header-container">
      <div className="ui grid header-title-container">
        <div className="column header-title-small">
          {"Authors' Haven"}
        </div>
        <div className="column header-button-top">
          <div className="header-button-container">
            <button type="button" className="header-search" />
            <AuthButtonContainer
              loginClass="ui primary button header-signin"
              signupClass="ui primary button header-signup"
              containerClass="auth-button-container"
            />
          </div>
        </div>
      </div>
      <div className="header-title-container-mobile">
        <SideMenuContainer />
        <div className="column header-title-small">
          {"Authors' Haven"}
        </div>
        <button type="button" className="header-search" />
      </div>
      <div id="header-container" className="ui center aligned container header-container">
        <h1 className="ui header header-title">
          GREAT AUTHORS
          <br />
          GREAT ARTICLES
        </h1>
        <div className="ui divider header-divider" />
        <p className="header-slogan">... Platform For The Creative At Heart</p>
        <button type="button" className="ui primary button header-button">
          {"Join Authors' Haven"}
        </button>
      </div>
      <CategoryContainer />
      <CategoryContainerMobile />
    </div>
  </div>
);


export default header;
