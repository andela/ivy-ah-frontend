import React from 'react';

const Footer = () => (
  <div className="ui grid footer-container">
    <div className="column footer-title">
      <i className="copyright icon footer-icon" />
      {"Authors' Haven"}
    </div>
    <div className="column footer-button-top">
      <button type="button" className="ui primary button footer-button">Home</button>
      <button type="button" className="ui primary button footer-button">About Us</button>
      <button type="button" className="ui primary button footer-button">Services</button>
      <button type="button" className="ui primary button footer-button">Contact</button>
      <button type="button" className="ui primary button footer-button">Privacy</button>
    </div>
  </div>
);

export default Footer;
