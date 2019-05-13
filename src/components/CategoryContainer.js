import React, { useEffect } from 'react';
import Scroll from 'overlayscrollbars';

const CategoryContainer = () => {
  let category;
  let leftBtn;
  let rightBtn;
  let hostWidth;
  let contentWidth;
  let categoryScroll;
  let scrollContent;

  const registerChange = ({ xScrollable }) => {
    leftBtn.disabled = !xScrollable;
    rightBtn.disabled = !xScrollable;
  };

  const checkScroll = (e = { target: scrollContent }) => {
    if ((((contentWidth - hostWidth) - e.target.scrollLeft) <= 1)) {
      rightBtn.disabled = true;
    } else {
      rightBtn.disabled = false;
    }
    if (e.target.scrollLeft <= 1) {
      leftBtn.disabled = true;
    } else {
      leftBtn.disabled = false;
    }
  };

  useEffect(() => {
    categoryScroll = Scroll(category, {
      overflowBehavior: { y: 'hidden' },
      scrollbars: {
        autoHide: 'move',
        autoHideDelay: 1000,
      },
      callbacks: {
        onOverflowChanged: registerChange,
        onHostSizeChanged: ({ width }) => { hostWidth = width; },
        onContentSizeChanged: ({ width }) => { contentWidth = width; },
        onScroll: checkScroll
      }
    });

    scrollContent = categoryScroll.getElements('viewport');
    checkScroll({ target: category });

    return () => categoryScroll.destroy();
  });


  const scrollLeft = () => {
    categoryScroll.scroll(scrollContent.scrollLeft - (hostWidth / 10), 250, undefined, checkScroll);
  };

  const scrollRight = () => {
    categoryScroll.scroll(scrollContent.scrollLeft + (hostWidth / 10), 250, undefined, checkScroll);
  };

  return (
    <div className="main-category-container">
      <div className="category-container">
        <button ref={(ref) => { leftBtn = ref; }} onClick={scrollLeft} type="button" className="direction-button left">
          <i className="chevron left icon" />
        </button>
        <div ref={(ref) => { category = ref; }} className="outer-category-container">
          <div ref={(ref) => { if (!ref) { return; } contentWidth = ref.offsetWidth; }} className="inner-category-container">
            <button type="button" className="ui primary button header-category">Money</button>
            <button type="button" className="ui primary button header-category">Politics</button>
            <button type="button" className="ui primary button header-category">Movies</button>
            <button type="button" className="ui primary button header-category">Andela</button>
            <button type="button" className="ui primary button header-category">Crime</button>
            <button type="button" className="ui primary button header-category">Tech</button>
            <button type="button" className="ui primary button header-category">Money</button>
            <button type="button" className="ui primary button header-category">Politics</button>
            <button type="button" className="ui primary button header-category">Movies</button>
            <button type="button" className="ui primary button header-category">Andela</button>
            <button type="button" className="ui primary button header-category">Crime</button>
            <button type="button" className="ui primary button header-category">Tech</button>
            <button type="button" className="ui primary button header-category">Money</button>
            <button type="button" className="ui primary button header-category">Politics</button>
            <button type="button" className="ui primary button header-category">Movies</button>
            <button type="button" className="ui primary button header-category">Andela</button>
            <button type="button" className="ui primary button header-category">Crime</button>
            <button type="button" className="ui primary button header-category">Tech</button>
          </div>
        </div>
        <button ref={(ref) => { rightBtn = ref; }} onClick={scrollRight} type="button" className="direction-button right">
          <i className="chevron right icon" />
        </button>
      </div>
    </div>
  );
};

export default CategoryContainer;
