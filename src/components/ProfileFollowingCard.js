import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, Grid } from 'semantic-ui-react';

const ProfileFollowingCard = ({ follower }) => (
  <Grid.Column>
    <Link href="profileRedirect" to={`/profileRedirect/${follower.id}`}>
      <div style={{ marginBottom: '2rem' }}>
        <Card fluid>
          <Card.Content>
            <Image
              style={{ width: '6rem', marginRight: '2rem' }}
              floated="left"
              size="small"
              circular
              src={
            follower.image
              ? follower.image
              : `https://ui-avatars.com/api/?bold=true&background=3157BE&color=fff&name=+${
                follower.lastname
              }+${follower.firstname}`
          }
            />
            <Card.Header
              style={{ paddingTop: '0.7rem', paddingBottom: '0.3rem' }}
            >
              {`${follower.lastname} ${follower.firstname}`}
            </Card.Header>
            <Card.Meta style={{ paddingBottom: '0.5rem' }}>
              {'joined Authors\' haven '}
            </Card.Meta>
            <Card.Meta>Following</Card.Meta>
          </Card.Content>
        </Card>
      </div>
    </Link>
  </Grid.Column>
);

ProfileFollowingCard.propTypes = {
  follower: PropTypes.shape([])
};

ProfileFollowingCard.defaultProps = {
  follower: []
};

export default ProfileFollowingCard;
