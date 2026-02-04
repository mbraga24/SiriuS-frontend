import React from 'react';
import { useSelector } from 'react-redux';
import AccountView from './AccountView';

const AccountContainer = () => {
  const users = useSelector(state => state.user.users);
  const keyHolder = useSelector(state => state.app.keyHolder);
  const allProjects = useSelector(state => state.project.projects);
  const isLoading = useSelector(state => state.load.isLoadingRequestIds);
  const adminInvitationCount = useSelector(state => state.invitation.invitations);

  const projectsCount = keyHolder.admin 
    ? allProjects.length 
    : (keyHolder.projects?.length || 0);

  const isDataLoaded = isLoading.includes("keyHolder") && isLoading.includes("projects");

  return (
    <AccountView
      user={keyHolder}
      users={users}
      projectsCount={projectsCount}
      adminInvitationCount={adminInvitationCount.length}
      isAdmin={keyHolder.admin}
      isLoading={isDataLoaded}
    />
  );
};

export default AccountContainer;
