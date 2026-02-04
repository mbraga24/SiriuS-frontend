import React from 'react';
import { Grid } from 'semantic-ui-react';
import { ActionButton } from '../../../../../shared';

const CommonActions = ({ userId, projectsCount }) => {
  return (
    <>
      <Grid.Column className="Account-Items">
        <ActionButton
          icon="settings"
          label="Update Account"
          to={`/update-account/${userId}`}
          size="large"
          className="Account-Container Account-Btn Account-Button-Color Button-Change"
        />
      </Grid.Column>
      <Grid.Column className="Account-Items">
        <ActionButton
          icon="tasks"
          label={`Projects: ${projectsCount}`}
          to="/projects"
          size="large"
          className="Account-Container Account-Btn Account-Button-Color Button-Change"
        />
      </Grid.Column>
    </>
  );
};

export default CommonActions;
