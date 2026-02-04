import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Loading, PageHeader } from '../../../../shared';
import AccountActions from './components/AccountActions';
import UserInfo from './components/UserInfo';
import './Account.css';

const AccountView = ({ 
  user,
  users,
  projectsCount,
  adminInvitationCount,
  isAdmin,
  isLoading 
}) => {
  const { email, first_name, last_name, company, job_title, id } = user;

  if (!isLoading) {
    return <Loading loadingClass={true} />;
  }

  return (
    <div id="Account-Container">
      <PageHeader 
        icon="address card"
        title="Account Summary"
        subtitle={`${first_name} ${last_name} ${isAdmin ? "- Administrator" : "- Collaborator"}`}
        className="Account-Header Account-Items"
      />
      
      <Grid doubling columns='2' textAlign="center">
        <Grid.Row>
          <AccountActions
            userId={id}
            isAdmin={isAdmin}
            usersCount={users.length}
            invitationCount={adminInvitationCount}
            projectsCount={projectsCount}
          />
          <UserInfo
            email={email}
            jobTitle={job_title}
            company={company}
          />
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default AccountView;
