const timeConverter = (date) => {
  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dateObj = new Date(date);

  return `${months[dateObj.getMonth()]} ${dateObj.getDate()}`;
};

export default timeConverter;
