const background = () => document.getElementById('background');

const backgroundToggle = (show) => {
  if (show) {
    background().style.display = 'block';
    background().classList.add('show');
  } else {
    const removeDisplay = () => {
      background().style.display = 'none';
      background().removeEventListener('transitionend', removeDisplay);
    };
    background().addEventListener('transitionend', removeDisplay);
    background().classList.remove('show');
  }
};

export { backgroundToggle, background };
