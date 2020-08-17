import React, { useEffect } from 'react';
import { getProjects } from '../api';
import { Header, Icon, Container, List, Divider, Label } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import '../resources/Account.css';

const Account = () => {

  const dispatch = useDispatch() 
  const projects = useSelector(state => state.project.projects)
  const keyHolder = useSelector(state => state.app.keyHolder) 
  const { email, first_name, last_name, company, users, job_title } = keyHolder

  useEffect(() => {
    getProjects()
    .then(projectData => {
      dispatch({ type: "SET PROJECTS", payload: projectData })
    })
  }, [dispatch])

  return (
    <>
    <Container id="Account-Container">
      <Header as='h2' className="Account-Header">
        <Icon name='address card' className="Account-Items"/>
        <Header.Content>
          <span className="Account-Title">Account Summary</span>
          <Header.Subheader>{ first_name } { last_name } { keyHolder.company ? "- Administrator" : "Collaborator" }</Header.Subheader>
        </Header.Content>
      </Header>
      <Divider/>
      <List divided className="Account-List">
        <List.Item className="Account-Items">
          <List.Icon name='tasks' size="large"/>
          <List.Content>Projects: {projects.length}</List.Content>
        </List.Item>
        <List.Item className="Account-Items">
          <List.Icon name='users' size="large"/>
          <List.Content>Collaborators: {users.length} </List.Content>
        </List.Item>
        <List.Item disabled className="Account-Items-Disabled">
          <Label as='a' color='purple' ribbon='right' className="Account-Feature-Ribbon">
            Feature coming soon
          </Label>
          <List.Icon name='user x' size="large"/>
          <List.Content>Pending Acceptance: {users.length-2} 
          </List.Content>
        </List.Item>
        <List.Item className="Account-Items">
          <List.Icon name='travel' size="large"/>
          <List.Content>Company Name: {company}</List.Content>
        </List.Item>
        <List.Item className="Account-Items">
          <List.Icon name='id badge' size="large"/>
          <List.Content>Job Title: {job_title}</List.Content>
        </List.Item>
        <List.Item className="Account-Items">
          <List.Icon name='mail' size="large"/>
          <List.Content>
            <a href={`${email}`}>{email}</a>
          </List.Content>
        </List.Item>
        <List.Item className="Account-Items">
          <List.Icon name='linkify' size="large"/>
          <List.Content>
            <a href='http://www.semantic-ui.com'>company-site.com</a>
          </List.Content>
        </List.Item>
      </List>
    </Container>
    </>
  )
}

export default Account;