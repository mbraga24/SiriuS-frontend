import React from 'react';
import { Header, Icon, Container, Divider, Button, List, Segment } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../resources/Project.css';

const ShowProject = props => {

  // useSelector takes in a callback that has access to the redux state as an argument
  // source: https://stackoverflow.com/questions/61580674/redux-useselector-with-conditional-statement
  const projects = useSelector(state => {
    if (props.match.path === "/project/:id") {
      return {
        data: state.project.projects
      }
    } else {
      return {
        data: state.completeProject.complete,
        message: `All activities for this project were closed on <INSERT SOME DATE HERE>`
      }
    }
  })
  const matchId = parseInt(props.match.params.id)
  const thisProject = projects.data.find(pro => pro.id === matchId)

  return (
    <Container id="Project-Container">
      { projects.message && 
        <Segment inverted color='red' tertiary size="big" textAlign="center">
          <Icon name='warning' />
          {projects.message}
        </Segment>
      }
      { 
        thisProject && 
          <>
            <Header as='h2' className="Project-Header-Align-Items">
              <span>
                <Icon name='clipboard list' size="large" className="Project-Icon-Color"/>
                <Header.Content>
                  <span className="Project-Title">Project: {thisProject.name}</span>
                </Header.Content>
              </span>
              <span>
                <Link to="/">
                  <Button className="Project-Button-Style" disabled>
                    <Icon name='add' /> 
                    Add Collaborator
                  </Button>
                </Link>
              </span>
            </Header>
            <Divider/>
            <List divided className="Project-List">
              <List.Item className="Project-Items">
                <List.Icon name='file alternate' size="large"/>
                <List.Content>Description: <span className="Project-Description-Text">{thisProject.description}</span></List.Content>
              </List.Item>
              <List.Item className="Project-Items">
                <List.Icon name='calendar alternate' size="large"/>
                <List.Content>Start Date: {thisProject.start_date}</List.Content>
              </List.Item>
              <List.Item className="Project-Items">
                <List.Icon name='calendar check' size="large"/>
                <List.Content>Due Date: {thisProject.due_date}</List.Content>
              </List.Item>
              <List.Item className="Project-Items">
                <List.Icon name="users" size="large"/>
                <List.Content>Collaborators: {thisProject.users.length}</List.Content>
              </List.Item>
              <List.Item className="Project-Items">
                <List.Icon name='linkify' size="large"/>
                <List.Content>
                  <a href='http://www.semantic-ui.com'>company-site.com</a>
                </List.Content>
              </List.Item>
            </List>
            <List.Item className="Project-Items">
              <Button
                content="Share New Document"
                labelPosition="left"
                icon="file"
                className="Project-Button-Style"
                disabled
                
              />
              <input
                type="file"
                hidden
              />
            </List.Item>
          </>
      }
    </Container>
  )
}
export default withRouter(ShowProject);