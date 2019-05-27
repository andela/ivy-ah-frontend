import React from 'react';
import SideMenuContainer from './SideMenuContainer';
import AuthButtonContainer from '../containers/AuthButtonContainer';

const Header = () => (
  <div>
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
  </div>
);


export default Header;
