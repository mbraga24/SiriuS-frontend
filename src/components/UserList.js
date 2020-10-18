import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Table, Container, Header, Button, Divider } from 'semantic-ui-react';
import { deleteUser } from '../api';
import { UPDATE_ACTIVE_PROJECT, UPDATE_PROJECT, REMOVE_USER, REMOVE_DOCUMENT } from '../store/type';
import '../resources/UserList.css';


const UserList = () => {

  const users = useSelector(state => state.user.users)
  const keyHolder = useSelector(state => state.app.keyHolder)
  const dispatch = useDispatch()

  const removeUser = userId => {
    deleteUser(userId)
    .then(data => {
      console.log("REMOVE USER FETCH --> ", data)
      dispatch({ type: REMOVE_USER, payload: data.user })
      for (let project of data.projects) {
        console.log("UPDATE PROJECT FETCH --> ", project)
        dispatch({ type: UPDATE_ACTIVE_PROJECT, payload: project })
        dispatch({ type: UPDATE_PROJECT, payload: project })
      }

      for (let document of data.documents) {
        console.log("UPDATE DOCUMENT FETCH --> ", document)
        dispatch({ type: REMOVE_DOCUMENT, payload: document })
      }
    })
  }

  const renderRows = () => {
    return users.map(user => {
      return (user.id !== keyHolder.id) ? (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.first_name}</Table.Cell>
                  <Table.Cell>{user.last_name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.job_title}</Table.Cell>
                  { keyHolder.admin && 
                    <>
                      <Table.Cell textAlign='center'>
                        <Link to={`/user/projects/${user.id}`}> 
                          <Icon name='user' size="large" className="UserList-Icon-Color"/>
                        </Link>
                      </Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Icon name='delete' size="large" className="UserList-Icon-Color" onClick={() => removeUser(user.id)} />
                      </Table.Cell>
                    </>
                  }
                </Table.Row>
              ) : null
    })
  }
  return (
    <Container id="UserList-Container">
      <Header as='h2' className="UserList-Header-Align-Items">
        <span>
          <Icon name='users' size="large" className="UserList-Icon-Color"/>
          <Header.Content>
            <span className="UserList-Title">Collaborators</span>
          </Header.Content>
        </span>
        {
          keyHolder.admin && 
          <span>
            <Button className="UserList-Button-Invite-User" disabled>
              <Icon name='add' /> 
              Invite Collaborator
            </Button>
          </span>
        }
      </Header>
      <Divider/>
      <Table celled structured>
        <Table.Header>
        <Table.Row textAlign='center'>
          <Table.HeaderCell rowSpan='2'>First Name</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Last Name</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Email</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Job Title</Table.HeaderCell>
          {
            keyHolder.admin &&
            <>
              <Table.HeaderCell rowSpan='1'>History</Table.HeaderCell>
              <Table.HeaderCell rowSpan='1'>Remove</Table.HeaderCell> 
            </>
          }
        </Table.Row>
        </Table.Header>
          {users && renderRows()}
      </Table>
    </Container>
  )
}

export default UserList;