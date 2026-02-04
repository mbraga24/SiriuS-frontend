import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon, Divider, Grid, Button } from 'semantic-ui-react';
import { Loading } from '../../../../shared';
import './Account.css';

const AccountView = ({ 
  user,
  users,
  projectsCount,
  adminInvitationCount,
  isAdmin,
  isLoading 
}) => {
  const { email, first_name, last_name, company, job_title, id } = user;

  if (!isLoading) {
    return <Loading loadingClass={true} />;
  }

  return (
    <div id="Account-Container">
      <Header as='h2' className="Account-Header">
        <Icon name='address card' className="Account-Items"/>
        <Header.Content>
          <span className="Account-Title">Account Summary</span>
          <Header.Subheader>
            {first_name} {last_name} {isAdmin ? "- Administrator" : "- Collaborator"}
          </Header.Subheader>
        </Header.Content>
      </Header>
      <Divider/>
      
      <Grid doubling columns='2' textAlign="center">
        <Grid.Row>
          <Grid padded columns='1'>
            <Grid.Row>
              {!isAdmin ? (
                <>
                  <Grid.Column className="Account-Items">
                    <Button 
                      as={Link} 
                      to={`/user/projects/${id}`} 
                      className="Account-Container Account-Btn Account-Button-Color Button-Change"
                    >
                      <Icon name='history' size="large"/>
                      Account History
                    </Button>
                  </Grid.Column>
                  <Grid.Column className="Account-Items">
                    <Button 
                      disabled 
                      as={Link} 
                      to={`/user/projects/${id}`} 
                      className="Account-Container Account-Btn Account-Button-Color Button-Change"
                    >
                      <Icon name='calendar times outline' size="large"/>
                      Request Time Off
                    </Button>
                  </Grid.Column>
                </>
              ) : (
                <>
                  <Grid.Column className="Account-Items">
                    <Button 
                      as={Link} 
                      to="/users" 
                      className="Account-Container Account-Btn Account-Button-Color Button-Change"
                    >
                      <Icon name='users' size="large"/>
                      Collaborators: {users.length}
                    </Button>
                  </Grid.Column>
                  <Grid.Column className="Account-Items">
                    <Button 
                      as={Link} 
                      to="/invitations" 
                      className="Account-Container Account-Btn Account-Button-Color Button-Change"
                    >
                      <Icon name='envelope' size="large"/>
                      {adminInvitationCount === 0 
                        ? "No pending invitations" 
                        : `Pending Invitations: ${adminInvitationCount}`
                      }
                    </Button>
                  </Grid.Column>
                </>
              )}
              
              <Grid.Column className="Account-Items">
                <Button 
                  as={Link} 
                  to={`/update-account/${id}`} 
                  className="Account-Container Account-Btn Account-Button-Color Button-Change"
                >
                  <Icon name='settings' size="large"/>
                  Update Account
                </Button>
              </Grid.Column>
              
              <Grid.Column className="Account-Items">
                <Button 
                  as={Link} 
                  to="/projects" 
                  className="Account-Container Account-Btn Account-Button-Color Button-Change"
                >
                  <Icon name='tasks' size="large" />
                  Projects: {projectsCount}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          
          <Grid padded columns='1'>
            <Grid.Row>
              <Grid.Column className="Account-Items">
                <Button secondary active className="Account-Btn No-Active">
                  <Icon name='id badge' size="large"/>
                  {job_title}
                </Button>
              </Grid.Column>
              <Grid.Column className="Account-Items">
                <Button secondary active className="Account-Btn No-Active">
                  <Icon name='travel' size="large"/>
                  {company}
                </Button>
              </Grid.Column>
              <Grid.Column className="Account-Items">
                <Button secondary active className="Account-Btn No-Active">
                  <Icon name='mail' size="large"/>
                  {email}
                </Button>
              </Grid.Column>
              <Grid.Column className="Account-Items">
                <Button secondary active className="Account-Btn Link No-Active">
                  <Icon name='linkify' size="large"/>
                  <a href='http://www.semantic-ui.com'>company-site.com</a>
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default AccountView;
