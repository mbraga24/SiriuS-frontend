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
          <Grid.Column className="Logo-Action-Wrapper" width={8}>
            <Grid columns="equal" stackable >
              <Grid.Row>
                <Grid.Column className="Image-Wrapper">
                  <Popup style={popupStyle} inverted position='top center' on="click" pinned trigger={<Image src={require('../Icon/polygonal-crab-inverted.png')}/>}>
                    Icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
                  </Popup>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Popup 
                    inverted 
                    position='bottom center' 
                    content={"Click the icon for the artist's attribution."} 
                    style={popupStyle} 
                    trigger={
                      <p className="Call-Action">
                        Create your new team, set goals, keep track of your progress, share your ideas, archive your work and more.
                      </p>
                    } />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={8}>    
            <Signup />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center" width={16}>    
            <p className="Call-Action Bottom">
              Join our community in a new way to work and collaborate. Let's get <span>SiriuS!</span>
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default withRouter(Home);