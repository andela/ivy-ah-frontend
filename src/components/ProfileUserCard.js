import React from 'react';
import PropTypes from 'prop-types';
import { Image, Header, Button } from 'semantic-ui-react';
import dateFormater from '../helpers/dateFormater';

const ProfileUserCard = ({
  profile,
  signedInUser,
  onEdit,
  editingProfile,
  onImageChange,
  changingProfileImage
}) => {
  const formatedDate = dateFormater(profile.createdAt);
  return (
    <div className="profile">
      <label nesting id="label" htmlFor="profileimage">
        <Image
          style={{ margin: '0 auto' }}
          src={
            changingProfileImage
              ? '/assets/sass/components/assets/Spinner-1s-200px.svg'
              : profile.image
                ? profile.image
                : `https://ui-avatars.com/api/?bold=true&background=3157BE&color=fff&name=+${
                  profile.firstname
                }+${profile.lastname}`
          }
          size="medium"
          circular
          fluid
        />
      </label>
      {editingProfile ? (
        <span style={{ paddingBottom: '0.8rem', color: 'red' }}>
          click picture to edit
        </span>
      ) : null}
      <input
        onChange={onImageChange}
        disabled={!editingProfile}
        type="file"
        hidden
        id="profileimage"
      />
      <Header className="profile-username" size="huge">
        {`${profile.firstname} ${profile.lastname}`}
      </Header>
      <p>
        Been on Authors&apos; Haven
        <span style={{ display: 'block' }}>
          since
          {' '}
          {formatedDate}
        </span>
      </p>
      {!editingProfile ? (
        <Button
          onClick={signedInUser === profile.id ? onEdit : null}
          className="btn blueButton"
        >
          {signedInUser === profile.id ? 'Edit Profile' : 'Follow'}
        </Button>
      ) : null}
    </div>
  );
};

ProfileUserCard.propTypes = {
  profile: PropTypes.shape({}),
  signedInUser: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  editingProfile: PropTypes.bool.isRequired,
  onImageChange: PropTypes.func.isRequired,
  changingProfileImage: PropTypes.bool.isRequired
};

ProfileUserCard.defaultProps = {
  profile: {}
};

export default ProfileUserCard;
