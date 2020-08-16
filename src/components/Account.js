import React from 'react';
import { Header, Icon, Container } from 'semantic-ui-react'
import { useSelector } from 'react-redux';

const Account = () => {

  const keyHolder = useSelector(state => state.app.keyHolder)  
  const { email, first_name, last_name } = keyHolder

  return (
    <>
    <Container>
      <Header as='h2'>
        <Icon name='address card' />
        <Header.Content>
          Account Settings
          <Header.Subheader>Manage your preferences</Header.Subheader>
        </Header.Content>
      </Header>
      
    </Container>
    </>
  )
}

export default Account;