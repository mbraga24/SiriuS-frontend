import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteInvites } from '../api';
import { removeInvitation } from '../store/slices/invitationSlice';
import TableList from './TableList';

const InviteList = () => {

  const invitations = useSelector(state => state.invitation.invitations)
  const isLoading = useSelector(state => state.load.isLoadingRequestIds) 
  const dispatch = useDispatch()

  const removeInvite = inviteId => {
    deleteInvites(inviteId)
    .then(data => {
      dispatch(removeInvitation(data.invite))
    })
  }

  return (
    <TableList 
      inviteActions={true}
      headerIcon="envelope"
      removeOptionIcon="envelope open"
      header="Pending Invitations"
      isLoaded={isLoading.includes("invites")} 
      items={invitations}
      func={removeInvite}
    />
  )
}

export default InviteList;