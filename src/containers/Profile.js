import React from 'react';
import { Grid, Tab, Container } from 'semantic-ui-react';
import ProfileUserCard from '../components/ProfileUserCard';
import ProfileArticleCard from '../components/ProfileArticleCard';

const Profile = () => {
  const panes = [
    {
      menuItem: 'articles',
      render: () => (
        <Tab.Pane attached={false}>
          <ProfileArticleCard />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'following',
      render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
    }
  ];
  return (
    <Container>
      <Grid stackable>
        <Grid.Column width={6}>
          <ProfileUserCard />
        </Grid.Column>
        <Grid.Column width={10}>
          <div className="tab-wrapper">
            <Tab
              className="tabs"
              menu={{ secondary: true, pointing: true }}
              panes={panes}
            />
          </div>
        </Grid.Column>
      </Grid>

      <Grid stackable columns={2} padded>
        <Grid.Column>
          <ProfileArticleCard />
        </Grid.Column>
        <Grid.Column>
          <ProfileArticleCard />
        </Grid.Column>
        <Grid.Column>
          <ProfileArticleCard />
        </Grid.Column>
        <Grid.Column>
          <ProfileArticleCard />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Profile;
