import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../api';
import { removeUser } from '../store/slices/userSlice';
import { updateProject } from '../store/slices/projectSlice';
import { removeDocument } from '../store/slices/documentSlice';
import TableList from './TableList';


const UserList = () => {

  const users = useSelector(state => state.user.users)
  const isLoading = useSelector(state => state.load.isLoadingRequestIds) 
  const dispatch = useDispatch()

  const removeUserHandler = userId => {
    deleteUser(userId)
    .then(data => {
      dispatch(removeUser(data.user))
      for (let project of data.projects) {
        dispatch(updateProject(project))
      }
      for (let document of data.documents) {
        dispatch(removeDocument(document))
      }
    })
  }

  return (
    <TableList 
      inviteActions={false}
      headerIcon="users"
      removeOptionIcon="user times"
      header="Collaborators"
      isLoaded={isLoading.includes("users")} 
      items={users}
      func={removeUserHandler}
    />
  )
}

export default UserList;