import React from 'react';
import PropTypes from 'prop-types';

const Hype = ({
  hovered, mouseLeave, clicked, position, resolveClass, hypesColor
}) => (
  <svg onMouseEnter={() => hovered(position)} onMouseLeave={mouseLeave} onClick={() => clicked(position)} className={`hype rating-hype article-icon ${hypesColor ? 'hype-grey' : 'hype-blue'} ${resolveClass(position)}`} width="18" height="22" viewBox="0 0 18 22" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.127 0C10.127 0 10.9158 2.65 10.9158 4.8C10.9158 6.86 9.47671 8.53 7.28076 8.53C5.07415 8.53 3.41119 6.86 3.41119 4.8L3.44317 4.44C1.28986 6.84 0 9.95 0 13.33C0 17.75 3.81627 21.33 8.52798 21.33C13.2397 21.33 17.056 17.75 17.056 13.33C17.056 7.94 14.295 3.13 10.127 0ZM8.21884 18.33C6.32136 18.33 4.78633 16.93 4.78633 15.19C4.78633 13.57 5.90562 12.43 7.78178 12.07C9.66859 11.71 11.6194 10.86 12.7067 9.49C13.1224 10.78 13.3356 12.14 13.3356 13.53C13.3356 16.18 11.0437 18.33 8.21884 18.33Z" />
  </svg>
);

Hype.propTypes = {
  hovered: PropTypes.func.isRequired,
  mouseLeave: PropTypes.func.isRequired,
  clicked: PropTypes.func.isRequired,
  resolveClass: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
  hypesColor: PropTypes.bool.isRequired
};

export default Hype;
