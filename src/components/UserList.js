import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../api';
import { UPDATE_PROJECT, REMOVE_USER, REMOVE_DOCUMENT } from '../store/type';
import TableList from './TableList';


const UserList = () => {

  const users = useSelector(state => state.user.users)
  const loadUsers = useSelector(state => state.load.loadUsers) 
  const dispatch = useDispatch()

  const removeUser = userId => {
    deleteUser(userId)
    .then(data => {
      dispatch({ type: REMOVE_USER, payload: data.user })
      for (let project of data.projects) {
        dispatch({ type: UPDATE_PROJECT, payload: project })
      }
      for (let document of data.documents) {
        dispatch({ type: REMOVE_DOCUMENT, payload: document })
      }
    })
  }

  return (
    <TableList 
      inviteActions={false}
      headerIcon="users"
      removeOptionIcon="user times"
      header="Collaborators"
      loadItems={loadUsers} 
      items={users}
      func={removeUser}
    />
  )
}

export default UserList;