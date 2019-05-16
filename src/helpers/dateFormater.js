const dateFormater = (inputDate) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date(inputDate);
  const formatedDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  return formatedDate;
};

export default dateFormater;
