import React, { useEffect } from 'react';
import { getProjects } from '../api';
import { Header, Icon, Container, List } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

const Account = () => {

  const dispatch = useDispatch() 
  const projects = useSelector(state => state.project.projects)
  const keyHolder = useSelector(state => state.app.keyHolder) 
  const { email, first_name, last_name } = keyHolder

  useEffect(() => {
    getProjects()
    .then(projectData => {
      dispatch({ type: "SET PROJECTS", payload: projectData })
    })
  }, [dispatch])

  console.log("ACCOUNT:", keyHolder.)

  return (
    <>
    <Container>
      <Header as='h2'>
        <Icon name='address card'/>
        <Header.Content>
          Account Summary
          <Header.Subheader>{ first_name } { last_name } { keyHolder.company ? "- Administrator" : "Collaborator" }</Header.Subheader>
        </Header.Content>
      </Header>

      <List>
        <List.Item>
          <List.Icon name='clipboard list' />
          <List.Content>Projects: {projects.length}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='users'/>
          <List.Content>Collaborators: {keyHolder.users_count} </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='travel' />
          <List.Content>Company Name: IntellActions</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='mail' />
          <List.Content>
            <a href='mailto:jack@semantic-ui.com'>jack@semantic-ui.com</a>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='linkify' />
          <List.Content>
            <a href='http://www.semantic-ui.com'>semantic-ui.com</a>
          </List.Content>
        </List.Item>
      </List>
      
    </Container>
    </>
  )
}

export default Account;