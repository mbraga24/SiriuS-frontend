import React from 'react';
import { Grid } from 'semantic-ui-react';
import AdminActions from './AdminActions';
import CollaboratorActions from './CollaboratorActions';
import CommonActions from './CommonActions';

const AccountActions = ({ 
  userId, 
  isAdmin, 
  usersCount, 
  invitationCount, 
  projectsCount 
}) => {
  return (
    <Grid padded columns='1'>
      <Grid.Row>
        {isAdmin ? (
          <AdminActions 
            userId={userId}
            usersCount={usersCount}
            invitationCount={invitationCount}
          />
        ) : (
          <CollaboratorActions userId={userId} />
        )}
        <CommonActions userId={userId} projectsCount={projectsCount} />
      </Grid.Row>
    </Grid>
  );
};

export default AccountActions;
