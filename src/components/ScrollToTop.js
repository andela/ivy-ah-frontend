import React from 'react';

const ScrollToTop = () => (
  <div className="scroll-to-top-wrapper">
    <button
      className="scroll-to-top-button"
      type="button"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }}
    />
  </div>
);

export default ScrollToTop;
