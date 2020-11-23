import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { loginUser } from '../api';
import useFormFields from '../hooks/useFormFields';
import { Button, Form, Grid, Header, Message, Segment, Icon } from 'semantic-ui-react';
import { SET_KEY_HOLDER, API_SUCCESS } from '../store/type';
import '../resources/Login.css';

const Login = (props) => {

  const dispatch = useDispatch()
  const [ alertMessage, setAlertMessage ] = useState("")
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ fields, handleFieldChange ] = useFormFields({
    email: "",
    password: ""
  });

  const resetAlert = () => {
    setTimeout(() => {
      setAlertStatus(false)
    }, 5000)
  }

  const handleMessages = (data) => {
    setAlertMessage(data.header)
    setAlertStatus(true)
    resetAlert()
  }

  const changeAppColors = user => {
    const body = document.querySelector('body')
    body.classList.remove("bg-color-home")
  }

  const handleSubmit = e => {
    e.preventDefault()  
    // create object to send in the fetch body
    const userLogin = {
      email: fields.email,
      password: fields.password,
    }
    // fetch user
    loginUser(userLogin)
    .then(data => {
      if (data.type === "error") {
        handleMessages(data)
      } else {
        console.log("LOGGED IN USER -->", data)
        const { user } = data
        const requestId = "keyHolder";  
        // update state
        dispatch({ requestId, type: API_SUCCESS });
        dispatch({ type: SET_KEY_HOLDER, payload: user })
        // update localStorage
        localStorage.token = user.id
        localStorage.admin = user.admin
        // send loggedin user to their account
        props.history.push(`/users/${user.id}`)
        changeAppColors(user)
      }
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
          <Segment>
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
        { alertStatus &&
          <Message warning attached='bottom'>
            {alertMessage}
            <Icon name='warning' />
          </Message>
        }
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