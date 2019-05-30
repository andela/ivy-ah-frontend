import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProfileContainerSwitch from '../components/ProfileContainerSwitch';

const ProfileContainer = ({
  signout, user, clearEditor, editorOpen
}) => {
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
      listRef.style.height = 0;
    } else {
      listRef.classList.add('opens');
      listRef.style.height = `${contentRef.offsetHeight}px`;
    }
  };

  useEffect(() => {
    const menuSwitch = () => {
      setIsMobile(window.innerWidth < 590);
    };
    const handleOutsideClick = ({ target }) => {
      if (!profileRef) { return; }
      if (!profileRef.contains(target)) {
        toggleList(true);
      }
    };
    window.addEventListener('resize', menuSwitch);
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('resize', menuSwitch);
      window.removeEventListener('click', handleOutsideClick);
    };
  });

  return (
    <div ref={setProfileRef} className="profile-container">
      {!isMobile && (
        <img
          onClick={toggleList}
          className="profile-menu-image"
          src={user.image || `https://ui-avatars.com/api/?bold=true&background=3157BE&color=fff&name=+${user.firstname}+${user.lastname}`}
          alt={`${user.firstname}`}
        />
      )}
      <ProfileContainerSwitch
        isMobile={isMobile}
        setContentRef={setContentRef}
        setListRef={setListRef}
        signout={signout}
        user={user}
        clearEditor={clearEditor}
        editorOpen={editorOpen}
      />
    </div>
  );
};

ProfileContainer.propTypes = {
  signout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  clearEditor: PropTypes.func.isRequired,
  editorOpen: PropTypes.bool.isRequired,
};

export default ProfileContainer;
