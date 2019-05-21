import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';

const ProfileTab = ({ tabHandler }) => {
  const panes = [
    { menuItem: 'articles', render: () => <Tab.Pane attached={false} /> },
    { menuItem: 'followers', render: () => <Tab.Pane attached={false} /> },
    { menuItem: 'following', render: () => <Tab.Pane attached={false} /> },
    { menuItem: 'bio', render: () => <Tab.Pane active={false} attached={false} /> }
  ];

  return (
    <Tab
      defaultActiveIndex={0}
      onTabChange={tabHandler}
      className="tabs"
      menu={{ secondary: true, pointing: true }}
      panes={panes}
    />
  );
};

ProfileTab.propTypes = {
  tabHandler: PropTypes.func.isRequired
};

export default ProfileTab;
