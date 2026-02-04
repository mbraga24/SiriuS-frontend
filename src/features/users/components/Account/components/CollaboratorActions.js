import React from 'react';
import { Grid } from 'semantic-ui-react';
import { ActionButton } from '../../../../../shared';

const CollaboratorActions = ({ userId }) => {
  return (
    <>
      <Grid.Column className="Account-Items">
        <ActionButton
          icon="history"
          label="Account History"
          to={`/user/projects/${userId}`}
          size="large"
          className="Account-Container Account-Btn Account-Button-Color Button-Change"
        />
      </Grid.Column>
      <Grid.Column className="Account-Items">
        <ActionButton
          icon="calendar times outline"
          label="Request Time Off"
          to={`/user/projects/${userId}`}
          disabled
          size="large"
          className="Account-Container Account-Btn Account-Button-Color Button-Change"
        />
      </Grid.Column>
    </>
  );
};

export default CollaboratorActions;
