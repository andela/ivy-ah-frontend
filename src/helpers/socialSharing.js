export const twitterShare = (title, articleUrl) => {
  const url = encodeURI(`https://twitter.com/intent/tweet?hashtags=AuthorsHaven&text=${title}\n${articleUrl}`);
  return window.open(url, '_blank');
};

export const facebookShare = (title, articleUrl) => {
  const url = encodeURI(`https://www.facebook.com/sharer.php?u=${articleUrl}&quote=${title}`);
  return window.open(url, '_blank');
};

export const emailShare = (title, articleUrl) => {
  const url = encodeURI(`mailto:?subject=${title}&body=${articleUrl}`);
  window.location = url;
};
