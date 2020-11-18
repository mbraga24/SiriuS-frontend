import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteInvites } from '../api';
import { REMOVE_INVITATION } from '../store/type';
import TableList from './TableList';

const InviteList = () => {

  const invitations = useSelector(state => state.invitation.invitations)
  const loadInvitations = useSelector(state => state.load.loadInvites) 
  const dispatch = useDispatch()

  const removeInvite = inviteId => {
    deleteInvites(inviteId)
    .then(data => {
      dispatch({ type: REMOVE_INVITATION, payload: data.invite })
    })
  }

  return (
    <TableList 
      hideColumn={true}
      iconName="sticky note"
      header="Pending Invitations"
      loadItems={loadInvitations} 
      items={invitations}
      func={removeInvite}
    />
  )
}

export default InviteList;