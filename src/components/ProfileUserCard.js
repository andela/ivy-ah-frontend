import React from 'react';
import { Image, Header, Button } from 'semantic-ui-react';

const ProfileUserCard = () => (
  <div className="profile">
    <Image
      style={{ margin: '0 auto' }}
      src="https://images.pexels.com/photos/2080383/pexels-photo-2080383.jpeg?cs=srgb&dl=adult-facial-expression-male-2080383.jpg&fm=jpg"
      size="medium"
      circular
      fluid
    />
    <Header className="profile-username" size="huge">
      Daddy Kossy Supreme
    </Header>
    <p>
      Been on Authors&apos; Haven
      <span style={{ display: 'inline-block' }}>since December 10, 2018</span>
    </p>
    <Button className="btn blueButton">Edit profile</Button>
  </div>
);

export default ProfileUserCard;
