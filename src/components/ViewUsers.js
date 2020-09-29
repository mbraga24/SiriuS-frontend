import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Table, Container, Header, Button, Divider } from 'semantic-ui-react';
import { deleteUser } from '../api';
import { REMOVE_USER } from '../store/type';
import '../resources/ViewUsers.css';


const ViewUsers = () => {

  const users = useSelector(state => state.user.users)
  const dispatch = useDispatch()

  const removeUser = userId => {
    deleteUser(userId)
    .then(deletedUser => {
      dispatch({ type: REMOVE_USER, payload: deletedUser })
    })
  }

  const addToProject = () => {
    console.log("ADD COLLABORATOR")
  }

  const renderRows = () => {
    return users.map(user => (
      
      <Table.Row key={user.id}>
        <Table.Cell>{user.first_name}</Table.Cell>
        <Table.Cell>{user.last_name}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>{user.job_title}</Table.Cell>
        <Table.Cell textAlign='center'>
          <Link to={`/user/projects/${user.id}`}> 
            <Icon name='user' size="large" className="ViewUsers-Icon-Color"/>
          </Link>
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon name='delete' size="large" className="ViewUsers-Icon-Color" onClick={() => removeUser(user.id)} />
        </Table.Cell>
        <Table.Cell textAlign='center'>
          <Icon name='add' size="large" className="ViewUsers-Icon-Color" onClick={() => addToProject(user.id)} />
        </Table.Cell>
      </Table.Row>
    ))
  }
  return (
    <Container id="ViewUsers-Container">
      <Header as='h2' className="ViewUsers-Header-Align-Items">
        <span>
          <Icon name='users' size="large" className="ViewUsers-Icon-Color"/>
          <Header.Content>
            <span className="ViewUsers-Title">Collaborators</span>
          </Header.Content>
        </span>
        <span>
          {/* attribute: disabled */}
          <Button className="ViewUsers-Button-Invite-User" disabled>
            <Icon name='add' /> 
            Invite Collaborator
          </Button>
        </span>
      </Header>
      <Divider/>
      <Table celled structured>
        <Table.Header>
        <Table.Row textAlign='center'>
          <Table.HeaderCell rowSpan='2'>First Name</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Last Name</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Email</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Job Title</Table.HeaderCell>
          <Table.HeaderCell rowSpan='1'>History</Table.HeaderCell>
          <Table.HeaderCell rowSpan='1'>Remove</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
          {users && renderRows()}
      </Table>
    </Container>
  )
}

export default ViewUsers;