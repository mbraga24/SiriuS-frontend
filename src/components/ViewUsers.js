import React, { useEffect } from 'react';
import { Icon, Table, Container, Header, Button, Divider } from 'semantic-ui-react';
import '../resources/ViewUsers.css';
import { getUsers } from '../api'


const ViewUsers = () => {

  useEffect(() => {
    getUsers()
    .then(usersData => {
      dispatch({ type: "SET USERS", payload: usersData })
    })
  })

  const renderRows = () => {
    return <Table.Row>
      <Table.Cell>First Name</Table.Cell>
      <Table.Cell>Last Name</Table.Cell>
      <Table.Cell>Email</Table.Cell>
      <Table.Cell>None</Table.Cell>
    </Table.Row>
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
          <Button className="ViewUsers-Button-Invite-User">
            <Icon name='add' /> 
            Invite Collaborator
          </Button>
        </span>
      </Header>
      <Divider/>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Job Title</Table.HeaderCell>
            <Table.HeaderCell>Project</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          
        </Table.Body>
      </Table>
    </Container>
  )
}

export default ViewUsers;
{/* <Table.Cell error>
<Icon name='attention' />
  Classified
</Table.Cell> 
</Table.Cell> */}