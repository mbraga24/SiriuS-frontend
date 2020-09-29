import React from 'react';
import { withRouter } from 'react-router-dom';
import { Header, Icon, Container } from 'semantic-ui-react'

const MissingAsset = props => {

  return (
    <Container textAlign='center' style={{padding: "50px"}}>
      <Header icon size="small">
        <Icon name={props.icon} />
        {`${props.message}`}
      </Header>
    </Container>
  )
}

export default withRouter(MissingAsset);