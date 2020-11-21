import React from 'react';
import { withRouter } from 'react-router-dom';
import { Divider, Grid } from 'semantic-ui-react';
import DocumentList from './DocumentList';
import UserArchive from './UserArchive';
import UserProjects from './UserProjects';
// import Loading from './Loading';
import '../resources/UserHistory.css';

const UserHistory = props => {
  return (
    <div id="UserHistory-Container">
      <UserProjects />
      <Divider/>
      <Grid stackable divided>
        <Grid.Row columns={2}>
          <Grid.Column>
            <UserArchive />
          </Grid.Column>
          <Grid.Column>
            <DocumentList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default withRouter(UserHistory);