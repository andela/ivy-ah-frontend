import React from 'react';
import PropTypes from 'prop-types';
import { Image, Header, Button } from 'semantic-ui-react';
import dateFormater from '../helpers/dateFormater';


const ProfileUserCard = ({ profile, signedInUser }) => {
  const formatedDate = dateFormater(profile.createdAt);
  return (
    <div className="profile">
      <Image
        style={{ margin: '0 auto' }}
        src={(profile.image) ? profile.image : `https://ui-avatars.com/api/?bold=true&background=3157BE&color=fff&name=+${profile.lastname}+${profile.firstname}`}
        size="medium"
        circular
        fluid
      />
      <Header className="profile-username" size="huge">
        {`${profile.firstname} ${profile.lastname}`}
      </Header>
      <p>
      Been on Authors&apos; Haven
        <span style={{ display: 'block' }}>
          since
          {' '}
          { formatedDate }
        </span>
      </p>
      <Button className="btn blueButton">{(signedInUser === profile.id) ? 'Edit Profile' : 'Follow'}</Button>
    </div>
  );
};

ProfileUserCard.propTypes = {
  profile: PropTypes.shape({}),
  signedInUser: PropTypes.string.isRequired,
};

ProfileUserCard.defaultProps = {
  profile: {}
};

export default ProfileUserCard;
