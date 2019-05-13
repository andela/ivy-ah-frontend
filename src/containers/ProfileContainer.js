import React, { useEffect, useState } from 'react';
import ProfileContainerSwitch from '../components/ProfileContainerSwitch';

const ProfileContainer = () => {
  let listRef;
  let contentRef;
  let profileRef;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 590);

  const setListRef = (ref) => { listRef = ref; };

  const setContentRef = (ref) => { contentRef = ref; };

  const setProfileRef = (ref) => { profileRef = ref; };

  const toggleList = (isOutside) => {
    if (!listRef) { return; }
    if (listRef.classList.contains('opens') || isOutside === true) {
      listRef.classList.remove('opens');
      if (isMobile) {
        listRef.style.removeProperty('left');
      } else {
        listRef.style.height = 0;
      }
    } else {
      listRef.classList.add('opens');
      if (isMobile) {
        listRef.style.left = '0px';
      } else {
        listRef.style.height = `${contentRef.offsetHeight}px`;
      }
    }
  };

  useEffect(() => {
    const menuSwitch = () => {
      setIsMobile(window.innerWidth < 590);
      if (window.innerWidth < 590 || isMobile) {
        toggleList(true);
      }
    };
    window.addEventListener('resize', menuSwitch);
    if (isMobile && profileRef) {
      const handleOutsideClick = ({ target }) => {
        if (!profileRef) { return; }
        if (!profileRef.contains(target)) {
          toggleList(true);
          window.removeEventListener('click', handleOutsideClick);
        }
      };
      window.addEventListener('click', handleOutsideClick);
    }
    return () => window.removeEventListener('resize', menuSwitch);
  });

  return (
    <div ref={setProfileRef} className="profile-container">
      <button onClick={toggleList} type="button" className="profile-inner-container" />
      <ProfileContainerSwitch
        isMobile={isMobile}
        setContentRef={setContentRef}
        setListRef={setListRef}
        toggleList={toggleList}
      />
    </div>
  );
};

export default ProfileContainer;
