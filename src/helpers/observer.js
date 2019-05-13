const addImage = (entries, observer) => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) {
      target.src = target.imageUrl;
      observer.unobserve(target);
    }
  });
};

const observer = new IntersectionObserver(addImage, {
  rootMargin: '0px',
  threshold: 0.1
});

export default observer;
