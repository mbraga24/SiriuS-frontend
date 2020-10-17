import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, Container, List, Divider, Label } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import '../resources/Account.css';

const Account = () => {

  const users = useSelector(state => state.user.users)
  const keyHolder = useSelector(state => state.app.keyHolder) 
  const adminProjectsCount = useSelector(state => state.project.projects.length)
  const { email, first_name, last_name, company, job_title, projects } = keyHolder

  return (
    !keyHolder.email ? (
      <h1>Loading...</h1>
    ) : (
    <>
      <Container id="Account-Container">
        <Header as='h2' className="Account-Header">
          <Icon name='address card' className="Account-Items"/>
          <Header.Content>
            <span className="Account-Title">Account Summary</span>
            <Header.Subheader>{ first_name } { last_name } { keyHolder.admin ? "- Administrator" : "- Collaborator" } </Header.Subheader>
          </Header.Content>
        </Header>
        <Divider/>
        <List divided className="Account-List">
          { 
            !keyHolder.admin &&
            <List.Item className="Account-Items" as={Link} to={`/user/projects/${keyHolder.id}`}>
              <List.Icon name='history' size="large" className="Account-Items-Icon"/>
              <List.Content>Account History</List.Content>
            </List.Item>
          }
          <List.Item className="Account-Items">
            <List.Icon name='tasks' size="large"/>
            <List.Content>Projects: { keyHolder.admin ? adminProjectsCount : projects.length }</List.Content>
          </List.Item>
          { 
            keyHolder.admin &&
            <>
              <List.Item className="Account-Items">
                <List.Icon name='users' size="large"/>
                <List.Content>Collaborators: {users.length} </List.Content>
              </List.Item>
              <List.Item disabled className="Account-Items-Disabled">
                <Label as='a' color='purple' ribbon='right' className="Account-Feature-Ribbon">
                  Feature coming soon
                </Label>
                <List.Icon name='user x' size="large"/>
                <List.Content>Pending Acceptance: 1</List.Content>
              </List.Item>
            </> 
          }
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
  )
}

export default Account;