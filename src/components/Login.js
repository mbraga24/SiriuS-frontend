import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getAdmin } from '../api';
import useFormFields from '../hooks/useFormFields';
import { Button, Form, Grid, Header, Message, Segment, Icon } from 'semantic-ui-react';
import '../resources/Login.css'
import '../resources/index.css'

const Login = (props) => {

  // const keyHolder = useSelector(state => state.app.keyHolder)
  const dispatch = useDispatch()

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  const handleSubmit = e => {
    e.preventDefault()    
    
    // create object to send in the fetch body
    const loginAdmin = {
      email: fields.email,
      password: fields.password,
    }

    // fetch admin
    getAdmin(loginAdmin)
    .then(loggedInAdmin => {
      // update state
      dispatch({ type: "SET KEY HOLDER", payload: loggedInAdmin })

      // update localStorage
      localStorage.token = loggedInAdmin.id
      localStorage.credentials = "admin"

      // send loggedin user to their account
      props.history.push(`/admins/${loggedInAdmin.id}`)

      // change body background color
      const body = document.querySelector('body')
      body.classList.remove("bg-color-signed-in")
    })
  }

  return (
    <Grid textAlign='center' verticalAlign='middle' id="Login-Grid">
      <Grid.Column className="Login-Column">
        <Header as='h2' className="Login-Header" textAlign='center'>
          <Icon name='sign-in' />
          Log-In to your account
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
            <Button className="Login-Button-Color" fluid size='large'>
              Log-In
            </Button>
          </Segment>
        </Form>
        <Message className="Login-Message">
          <span>Don't have an account? </span>
          <Link to="/signup">
            Sign Up
          </Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default withRouter(Login);

// ========================> CONCEPTS <============================
// 1) custom hooks -> useFormFields
// ===============================================================