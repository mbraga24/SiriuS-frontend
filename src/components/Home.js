import React from "react";
import { withRouter } from 'react-router-dom';
import Signup from "./Signup";
import { Container, Grid, Image, Popup } from 'semantic-ui-react';
import '../resources/Home.css';
import '../resources/Signup.css';

const Home = props => {

  const popupStyle = {
    borderRadius: 4,
    padding: '0.5em'
  }



  return(
    <Container id="Home-Container">
      <Grid stackable>
        <Grid.Row>
          <Grid.Column className="Logo-Action-Wrapper" width={10}>
              <Grid columns="equal" stackable >
                <Grid.Row>
                  <Grid.Column textAlign="center">
                    <Popup style={popupStyle} inverted position='top center' on="click" pinned trigger={<Image src={require('../Icon/polygonal-crab-inverted.png')} />}>
                      Icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
                    </Popup>
                  </Grid.Column>
                  <Grid.Column className="Home-Call-Action-Wrapper" textAlign="center">
                  <Popup 
                    inverted 
                    position='bottom center' 
                    content={"Click the icon for the artist's attribution."} 
                    style={popupStyle} 
                    trigger={
                      <p className="Home-Call-Action-1">
                        Join our community in a new and slacking proof way to work and let's get <span>SiriuS!</span>
                      </p>
                    } />
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