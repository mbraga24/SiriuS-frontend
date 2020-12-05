import React from "react";
import { withRouter } from 'react-router-dom';
import Signup from "./Signup";
import { Container, Grid, Image } from 'semantic-ui-react';
import '../resources/Home.css';
import '../resources/Signup.css';

const Home = props => {

  return(
    <Container id="Home-Container">
      <Grid stackable>
        <Grid.Row>
          <Grid.Column className="Logo-Action-Wrapper" width={10}>
              <Grid columns="equal" stackable >
                <Grid.Row>
                  <Grid.Column textAlign="center">
                    <Image src={require('../Icon/polygonal-crab-inverted.png')} size='big' />
                  </Grid.Column>
                  <Grid.Column className="Home-Call-Action-Wrapper" textAlign="center">
                    <p className="Home-Call-Action-1">
                      Join our community in a new and slacking proof way to work and let's get <span>SiriuS!</span>
                    </p>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign="center">
                    <p className="Home-Call-Action-2">
                      Create your new team, set goals, keep track of your progress, share your ideas, archive your work and more. 
                    </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
          </Grid.Column>
          <Grid.Column width={6}>    
            <Signup />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default withRouter(Home);