import React from 'react';
import PropTypes from 'prop-types';
import Follow from '../containers/Follow';

const AuthorMetadata = ({
  user: {
    username, bio, image, firstname, id
  }
}) => (
  <div className="author-metadata">
    {image
      ? (
        <img className="profile-pic" src={image} alt={firstname} />
      )
      : (
        <img className="profile-pic" src="http://www.gravatar.com/avatar/?d=identicon" alt={firstname} />
      )
    }
    <div className="author-bio">
      {firstname
        ? <span className="author-name">{firstname}</span>
        : <span className="author-name">{username}</span>
      }
      <br />
      {bio && <span className="bio">{bio}</span>}
      <br />
      <Follow authorId={id} />
    </div>
  </div>
);

AuthorMetadata.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    firstname: PropTypes.string,
  }).isRequired
};

export default AuthorMetadata;
