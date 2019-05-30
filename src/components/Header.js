import React from 'react';
import { Link } from 'react-router-dom';
import SideMenuContainer from './SideMenuContainer';
import AuthButtonContainer from '../containers/AuthButtonContainer';


const Header = () => (
  <div>
    <div className="ui grid header-title-container">
      <div className="column header-title-small">
        <Link to="/">
          <img
            className="authors-haven-logo"
            src="https://res.cloudinary.com/ivy-league/image/upload/c_scale,w_200/v1558960765/imageedit_4_4952981594.png"
            alt="authors-haven-log"
          />
        </Link>
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
