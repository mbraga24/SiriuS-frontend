import React from 'react';
import { TableList } from '../../../../shared';

const UserListView = ({ users, isLoaded, onRemoveUser }) => {
  return (
    <TableList 
      inviteActions={false}
      headerIcon="users"
      removeOptionIcon="user times"
      header="Collaborators"
      isLoaded={isLoaded} 
      items={users}
      func={onRemoveUser}
    />
  );
};

export default UserListView;
