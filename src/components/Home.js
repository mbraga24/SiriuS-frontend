import React from 'react';
import { Link } from 'react-router-dom';
import '../resources/Home.css';
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
    <Container id="Home-Container">
      <Segment placeholder className="Home-Segment">
        <Grid columns={2} stackable textAlign='center'>
          <Divider vertical>Or</Divider>

          <Grid.Row verticalAlign='middle'>
            <Grid.Column>
              <Header icon>
                <Icon name='sign-in' />
                Already have an account?
              </Header>
              <Link to="/login">
                <Button className="Home-Button-Color">Sign In</Button>
              </Link>
            </Grid.Column>

            <Grid.Column>
              <Header icon>
                <Icon name='signup' />
                Wanna be part of our community?
              </Header>
              <Link to="/signup">
                <Button className="Home-Button-Color">Create Account</Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  )
}

export default Home;