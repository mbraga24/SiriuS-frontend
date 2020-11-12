import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, Divider, Grid } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import Loading from './Loading';
import '../resources/Account.css';

const Account = () => {

  const users = useSelector(state => state.user.users)
  const keyHolder = useSelector(state => state.app.keyHolder) 
  const loadKeyholder = useSelector(state => state.load.loadKeyholder) 
  const adminProjectsCount = useSelector(state => state.project.projects.length)
  const { email, first_name, last_name, company, job_title, projects } = keyHolder

  return (
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
        {
          loadKeyholder ? 
          <Loading loadingClass={true} /> 
          :
          <Grid doubling padded columns='2'>
            <Grid.Row>
              { 
                  <React.Fragment>
                    { 
                    !keyHolder.admin ?
                    <Grid.Column className="Account-Items">
                      <Link to={`/user/projects/${keyHolder.id}`}>
                        <Icon name='history' size="large" className="Account-Items-Icon"/>
                        Account History
                      </Link> 
                    </Grid.Column>: 
                      <>
                        <Grid.Column className="Account-Items">
                          <Icon name='users' size="large"/>
                          Collaborators: {users.length}
                        </Grid.Column>
                        <Grid.Column className="Account-Items">
                          <Icon name='hourglass two' size="large"/>
                          Pending Invitations: {keyHolder.sent_invites.length}
                        </Grid.Column>
                      </>
                    }
                    <Grid.Column className="Account-Items">
                      <Icon name='tasks' size="large"/>
                      Projects: { keyHolder.admin ? adminProjectsCount : projects.length }
                    </Grid.Column>
                    <Grid.Column className="Account-Items">
                      <Icon name='id badge' size="large"/>
                      Job Title: {job_title}
                    </Grid.Column>
                  </React.Fragment>
                }
                <Grid.Column className="Account-Items">
                  <Icon name='travel' size="large"/>
                  Company Name: {company}
                </Grid.Column>
                <Grid.Column className="Account-Items">
                  <Icon name='mail' size="large"/>
                  <a href={`${email}`}>{email}</a>
                </Grid.Column>
                <Grid.Column className="Account-Items">
                  <Icon name='linkify' size="large"/>
                  <a href='http://www.semantic-ui.com'>company-site.com</a>
                </Grid.Column>
            </Grid.Row>
          </Grid>
        }
      </div>
    </React.Fragment>
    ) 
}

export default Account;