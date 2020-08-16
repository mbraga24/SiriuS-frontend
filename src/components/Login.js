import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAdmin } from '../api';
import useFormFields from '../hooks/useFormFields';
import { Button, Form, Grid, Header, Message, Segment, Icon } from 'semantic-ui-react';

const LoginForm = () => {

  const keyHolder = useSelector(state => state.app.keyHolder)
  const dispatch = useDispatch()
  console.log("SET ADMIN STATE", keyHolder)

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  const handleSubmit = e => {
    e.preventDefault()    
    const loginAdmin = {
      email: fields.email,
      password: fields.password,
    }

    getAdmin(loginAdmin)
    .then(loggedInAdmin => {
      // console.log("SIGNEDIN:", loggedInAdmin)
      dispatch({ type: "SET ADMIN", payload: loggedInAdmin })
      localStorage.token = loggedInAdmin.id
      localStorage.credentials = "admin"
    })
  }

  return (
      <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Icon name='sign-in' />
          Log-in to your account
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input 
              fluid icon='user' 
              iconPosition='left' 
              placeholder='E-mail address' 
              name='email'
              onChange={handleFieldChange}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
              onChange={handleFieldChange}
            />

            <Button color='teal' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          <span>Don't have an account? </span>
          <Link to="/signup">
            Sign Up
          </Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default LoginForm;

// ========================> CONCEPTS <============================
// 1) custom hooks -> useFormFields
// ===============================================================