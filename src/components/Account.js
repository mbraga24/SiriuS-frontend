import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, Divider, Grid, Button } from 'semantic-ui-react';
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
    <React.Fragment>
      <div id="Account-Container">
        <Header as='h2' className="Account-Header">
          <Icon name='address card' className="Account-Items"/>
          <Header.Content>
            <span className="Account-Title">Account Summary</span>
            <Header.Subheader>{ first_name } { last_name } { keyHolder.admin ? "- Administrator" : "- Collaborator" } </Header.Subheader>
          </Header.Content>
        </Header>
        <Divider/>
        <Grid columns='3' celled='internally'>
          <Grid.Row>
            { 
              <Grid.Column>  
                <React.Fragment>
                  { 
                    !keyHolder.admin ?
                    <Link to={`/user/projects/${keyHolder.id}`}>
                      <div className="Account-Items" >
                        <Icon name='history' size="large" className="Account-Items-Icon"/>
                        Account History
                      </div>
                    </Link> : 
                      <div className="Account-Items">
                        <Icon name='users' size="large"/>
                        Collaborators: {users.length}
                      </div>
                  }
                  <div className="Account-Items">
                    <Icon name='tasks' size="large"/>
                    Projects: { keyHolder.admin ? adminProjectsCount : projects.length }
                  </div>
                  <div className="Account-Items">
                    <Icon name='id badge' size="large"/>
                    Job Title: {job_title}
                  </div>
                </React.Fragment>
              </Grid.Column>
              }
            <Grid.Column>
              <div className="Account-Items">
                <Icon name='travel' size="large"/>
                Company Name: {company}
              </div>
              <div className="Account-Items">
                <Icon name='mail' size="large"/>
                <a href={`${email}`}>{email}</a>
              </div>
              <div className="Account-Items">
                <Icon name='linkify' size="large"/>
                <a href='http://www.semantic-ui.com'>company-site.com</a>
              </div>
              <Button icon='user' content="Collaborators: 7" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </React.Fragment>
    ) 
  )
}

export default Account;