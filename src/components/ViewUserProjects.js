import React from 'react';
import { withRouter } from 'react-router-dom';
import { Header, Icon, Container, List, Divider, Button, Table } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import '../resources/ViewUserProjects.css';

const ViewUserProjects = (props) => {
  
  const projects = useSelector(state => state.project.projects)
  const users = useSelector(state => state.user.users)
  
  const userPage = (userId) => {
    return users.find(user => user.id.toString() === userId )
  }

  const thisUser = userPage(props.match.params.id)

  const renderProjects = () => {
    return thisUser.projects.map(project => (
      <List.Item key={project.id} className="ViewUserProjects-List-Item">
        <List.Icon name='puzzle' size='large' verticalAlign='middle' className="ViewUserProjects-Icon-Color" />
        <List.Content>
          <List.Content floated='right'>
            <Button className="ViewUserProjects-Button-Color" disabled>Delete</Button>
          </List.Content>
          <List.Header as='a' className="ViewUserProjects-Project-Name">{project.name}</List.Header>
          <List.Description as='a'className="ViewUserProjects-Project-Date">Start date: {project.start_date} | Due date: {project.due_date}</List.Description>
        </List.Content>
      </List.Item>
    ))
  }
  
  return (
    <>
    <Container id="ViewUserProjects-Container">
      <Header as='h2' className="ViewUserProjects-Header-Align-Items">
        <span>
          <Icon name='user' size="large" className="ViewUserProjects-Icon-Color"/>
          <Header.Content>
            <span className="ViewUserProjects-Title">{thisUser.first_name} {thisUser.last_name}'s Project History</span>
          </Header.Content>
        </span>
      </Header>
      <Divider/>
      <List divided relaxed size="large">
        { projects && renderProjects() }
      </List>
      <Divider/>
      <Header as='h2' className="ViewUserProjects-Header-Align-Items">
        <span>
          <Icon name='attach' size="large" className="ViewUserProjects-Icon-Color"/>
          <Header.Content>
            <span className="ViewUserProjects-Title">Documents</span>
          </Header.Content>
        </span>
      </Header>
      <Table basic>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Notes</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body className="ViewUserProjects-Table-Body">
      <Table.Row>
        <Table.Cell>
          <Icon name='folder' />
          js
        </Table.Cell>
        <Table.Cell>
          error on send
        </Table.Cell>
        <Table.Cell>
          10 hours ago
        </Table.Cell>
        <Table.Cell>
          <Button size='small' compact className="ViewUserProjects-Button-Color" disabled>Open</Button>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Icon name='folder' />
          chat feature
        </Table.Cell>
        <Table.Cell>
          chat feature attempt 2
        </Table.Cell>
        <Table.Cell>
          7 hours ago
        </Table.Cell>
        <Table.Cell>
          <Button size='small' compact className="ViewUserProjects-Button-Color" disabled>Open</Button>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Icon name='folder' />
          pdf
        </Table.Cell>
        <Table.Cell>
          request for contacts
        </Table.Cell>
        <Table.Cell>
          2 days ago
        </Table.Cell>
        <Table.Cell>
          <Button size='small' compact className="ViewUserProjects-Button-Color" disabled>Open</Button>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
    </Container>
    </>
  )
}

export default withRouter(ViewUserProjects);