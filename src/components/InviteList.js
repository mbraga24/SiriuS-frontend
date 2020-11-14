import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteInvites } from '../api';
import { REMOVE_INVITATION } from '../store/type';
import TableList from './TableList';
import Loading from './Loading';
import '../resources/UserList.css';

const InviteList = () => {

  const invitations = useSelector(state => state.invitation.invitations)
  const keyHolder = useSelector(state => state.app.keyHolder)
  const loadInvitations = useSelector(state => state.load.loadInvites) 
  const dispatch = useDispatch()

  const removeInvite = inviteId => {
    deleteInvites(inviteId)
    .then(data => {
      dispatch({ type: REMOVE_INVITATION, payload: data.invite })
    })
  }

  return (
    loadInvitations ?
    <Loading loadingClass={true} /> :
    <TableList 
      hideColumn={true}
      iconName="sticky note"
      header="Pending Invitations"
      loadItems={loadInvitations} 
      keyHolder={keyHolder}
      items={invitations}
      func={removeInvite}
    />
  )
}

export default InviteList;