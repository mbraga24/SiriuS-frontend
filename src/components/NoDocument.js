import React from 'react';
import { withRouter } from 'react-router-dom';
import { Header, Icon, Container } from 'semantic-ui-react'

const NoDocument = props => {

  const store = props.match.url.split("/")[1]

  return (
    <Container textAlign='center' style={{padding: "50px"}}>
      <Header icon>
        <Icon name='pdf file outline' />
        No documents are listed for this {`${store}`}
      </Header>
    </Container>
  )
}

export default withRouter(NoDocument);