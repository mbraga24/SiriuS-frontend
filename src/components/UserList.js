import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../api';
import { UPDATE_ACTIVE_PROJECT, UPDATE_PROJECT, REMOVE_USER, REMOVE_DOCUMENT } from '../store/type';
import TableList from './TableList';
import '../resources/UserList.css';


const UserList = () => {

  const users = useSelector(state => state.user.users)
  const keyHolder = useSelector(state => state.app.keyHolder)
  const loadUsers = useSelector(state => state.load.loadUsers) 
  const dispatch = useDispatch()

  const removeUser = userId => {
    deleteUser(userId)
    .then(data => {
      dispatch({ type: REMOVE_USER, payload: data.user })
      for (let project of data.projects) {
        console.log("UPDATE PROJECT FETCH --> ", project)
        dispatch({ type: UPDATE_ACTIVE_PROJECT, payload: project })
        dispatch({ type: UPDATE_PROJECT, payload: project })
      }
      for (let document of data.documents) {
        dispatch({ type: REMOVE_DOCUMENT, payload: document })
      }
    })
  }

  return (
    <TableList 
      hideColumn={false}
      iconName="users"
      header="Pending Invitations"
      loadItems={loadUsers} 
      keyHolder={keyHolder}
      items={users}
      func={removeUser}
    />
  )
}

export default UserList;