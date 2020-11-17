import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, Divider, Grid, Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import Loading from './Loading';
import '../resources/Account.css';

const Account = () => {

  const users = useSelector(state => state.user.users)
  const keyHolder = useSelector(state => state.app.keyHolder) 
  const loadKeyholder = useSelector(state => state.load.loadKeyholder) 
  // const loadUsers = useSelector(state => state.load.loadUsers) 
  // const loadInvites = useSelector(state => state.load.loadInvites) 
  // const loadProjects = useSelector(state => state.load.loadProjects) 
  const adminProjectsCount = useSelector(state => state.project.projects.length)
  const adminInvitationCount = useSelector(state => state.invitation.invitations.length)
  const { email, first_name, last_name, company, job_title, projects } = keyHolder

  return (
    <React.Fragment>
      <div id="Account-Container">
        <Header as='h2' className="Account-Header">
          <Icon name='address card' className="Account-Items"/>
          <Header.Content>
            <span className="Account-Title">Account Summary</span>
            { !loadKeyholder && <Header.Subheader>{ first_name } { last_name } { keyHolder.admin ? "- Administrator" : "- Collaborator" } </Header.Subheader> }
          </Header.Content>
        </Header>
        <Divider/>
        {
          loadKeyholder ? 
          <Loading loadingClass={true} /> 
          :
          <Grid doubling columns='2' textAlign="center">
            <Grid.Row>
              <Grid padded columns='1'>
                <Grid.Row>
                  {
                    !keyHolder.admin ?
                    <Grid.Column className="Account-Items">
                      <Button as={Link} to={`/user/projects/${keyHolder.id}`} className="Account-Container Account-Btn Account-Button-Color Button-Change">
                      <Icon name='history' size="large"/>
                      Account History
                      </Button>
                    </Grid.Column> :
                    <React.Fragment>
                      <Grid.Column className="Account-Items">
                        <Button as={Link} to={`/users`} className="Account-Container Account-Btn Account-Button-Color Button-Change">
                        <Icon name='users' size="large"/>
                        Collaborators: {users.length}
                        </Button>
                      </Grid.Column>
                      <Grid.Column className="Account-Items">
                        <Button as={Link} to={`/invitations`} className="Account-Container Account-Btn Account-Button-Color Button-Change">
                        <Icon name='sticky note' size="large"/>
                        Pending Invitations: {adminInvitationCount}
                        </Button>
                      </Grid.Column>
                    </React.Fragment>
                  } 
                  <Grid.Column className="Account-Items">
                    <Button as={Link} to={`/projects`}  className="Account-Container Account-Btn Account-Button-Color Button-Change">
                    <Icon name='tasks' size="large" />
                    Projects: { keyHolder.admin ? adminProjectsCount : projects.length }
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid padded columns='1'>
                <Grid.Row>    
                  <Grid.Column className="Account-Items">
                    <Button color="grey" active className="Account-Btn No-Active">
                    <Icon name='id badge' size="large"/>
                    {job_title}
                    </Button>
                  </Grid.Column>
                  <Grid.Column className="Account-Items">
                    <Button color="grey" active className="Account-Btn No-Active">
                    <Icon name='travel' size="large"/>
                    {company}
                    </Button>
                  </Grid.Column>
                  <Grid.Column className="Account-Items">
                    <Button color="grey" active className="Account-Btn No-Active">
                    <Icon name='mail' size="large"/>
                    {email}
                    </Button>
                  </Grid.Column>
                  <Grid.Column className="Account-Items">
                    <Button color="grey" active className="Account-Btn Link No-Active">
                    <Icon name='linkify' size="large"/>
                    <a href='http://www.semantic-ui.com'>company-site.com</a>
                    </Button>
                  </Grid.Column>
              </Grid.Row>
            </Grid>

          </Grid.Row>
        </Grid>
        }
      </div>
    </React.Fragment>
    ) 
}

export default Account;