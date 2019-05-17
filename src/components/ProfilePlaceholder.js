import React from 'react';
import { Placeholder, Grid } from 'semantic-ui-react';

const ProfilePlaceholder = () => (
  <Grid.Column>
    <div className="profile">
      <Placeholder fluid>
        <Placeholder.Image />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder>
    </div>
  </Grid.Column>
);

export default ProfilePlaceholder;
