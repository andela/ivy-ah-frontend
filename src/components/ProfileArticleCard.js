import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const ProfileArticleCard = () => (
  <div className="profile-article">
    <Card.Group>
      <div className="profile-article-wrapper">
        <Image
          className="profile-article-user-image"
          src="https://images.pexels.com/photos/555790/pexels-photo-555790.png?cs=srgb&dl=black-and-white-boy-casual-555790.jpg&fm=jpg"
          avatar
          floated="left"
        />
        <span className="profile-article-user-name">Daddy Kossy supreme</span>
        <p className="profile-article-readtime"> 2 min read</p>
      </div>
      <div
        style={{
          overflow: 'hidden',
          minWidth: '100%',
          height: '10rem',
          backgroundImage:
            "url('https://images.pexels.com/photos/2259810/pexels-photo-2259810.jpeg?cs=srgb&dl=adventure-alps-clouds-2259810.jpg&fm=jpg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        `
      </div>
      <div className="w-100">
        <div className="detail-container">
          <p>awesome article</p>
          <div className="article-hypes">70 hypes</div>
        </div>
      </div>
    </Card.Group>
  </div>
);

export default ProfileArticleCard;
