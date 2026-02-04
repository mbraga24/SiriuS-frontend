import React from 'react';
import { Grid } from 'semantic-ui-react';
import { ActionButton } from '../../../../../shared';

const AdminActions = ({ userId, usersCount, invitationCount }) => {
  return (
    <>
      <Grid.Column className="Account-Items">
        <ActionButton
          icon="users"
          label={`Collaborators: ${usersCount}`}
          to="/users"
          size="large"
          className="Account-Container Account-Btn Account-Button-Color Button-Change"
        />
      </Grid.Column>
      <Grid.Column className="Account-Items">
        <ActionButton
          icon="envelope"
          label={invitationCount === 0 ? "No pending invitations" : `Pending Invitations: ${invitationCount}`}
          to="/invitations"
          size="large"
          className="Account-Container Account-Btn Account-Button-Color Button-Change"
        />
      </Grid.Column>
    </>
  );
};

export default AdminActions;
