import React from 'react';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
  Container
} from 'semantic-ui-react'

const Home = () => {
  return(
    <Container>
      <Segment placeholder style={{ margin: '25vh auto', height: '50vh' }}>
        <Grid columns={2} stackable textAlign='center'>
          <Divider vertical>Or</Divider>

          <Grid.Row verticalAlign='middle'>
            <Grid.Column>
              <Header icon>
                <Icon name='sign-in' />
                Already have an account?
              </Header>
              <Link to="/login">
                <Button color='teal'>Sign In</Button>
              </Link>
            </Grid.Column>

            <Grid.Column>
              <Header icon>
                <Icon name='signup' />
                Wanna be part of our community?
              </Header>
              <Link to="/signup">
                <Button color='teal'>Create Account</Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  )
}

export default Home;