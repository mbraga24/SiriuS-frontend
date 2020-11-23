import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteInvites } from '../api';
import { REMOVE_INVITATION } from '../store/type';
import TableList from './TableList';

const InviteList = () => {

  const invitations = useSelector(state => state.invitation.invitations)
  const isLoading = useSelector(state => state.load.isLoadingRequestIds) 
  const dispatch = useDispatch()

  const removeInvite = inviteId => {
    deleteInvites(inviteId)
    .then(data => {
      dispatch({ type: REMOVE_INVITATION, payload: data.invite })
    })
  }

  console.log("!isLoading.includes(invites)", isLoading)

  return (
    <TableList 
      inviteActions={true}
      headerIcon="envelope"
      removeOptionIcon="envelope open"
      header="Pending Invitations"
      loadItems={isLoading.includes("invites")} 
      items={invitations}
      func={removeInvite}
    />
  )
}

export default InviteList;