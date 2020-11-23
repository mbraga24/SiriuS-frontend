import React, { useState } from "react";
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../api';
import useFormFields from "../hooks/useFormFields";
import '../resources/Signup.css';
import { SET_KEY_HOLDER, ADD_USER, LOAD_KEYHOLDER, REMOVE_INVITATION } from '../store/type';
import { Button, Form, Grid, Header, Message, Segment, Icon, Input, List } from 'semantic-ui-react';

const Signup = props => {

  const dispatch = useDispatch()
  const [ emptyPassword, setEmptyPassword ] = useState(false)
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ header, setHeader ] = useState("")
  const [ errorMsg, setErrorMsg ] = useState([])
  const searchToken = props.location.search
  const doesTokenExist = searchToken.match(/invite_token/g) ? true : false

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    password: "",
    company: ""
  })

  const runAlert = (header, error) => {
    setHeader(header)
    setErrorMsg(error)
    setAlertStatus(true)
    resetAlert()
    emptyPassword && setEmptyPassword(!emptyPassword)
  }

  const resetAlert = () => {
    setTimeout(() => {
      setAlertStatus(false)
    }, 5000)
  }

  const displayAlert = errors => {
    return errors.map(e => (
      <List.Item key={e.id}>{e}</List.Item>
    ))
  }

  const handleSubmit = e => {
    e.preventDefault()
  
    const userInfo = {
      user: {
        email: fields.email,
        first_name: fields.firstName,
        last_name: fields.lastName,
        job_title: fields.jobTitle,
        password: fields.password,
        company: fields.company,
        invite_token: doesTokenExist ? searchToken.split("=")[1] : null
      }
    }

    createUser(userInfo)
    .then(data => {
      if (data.error) {
        const { error, header } = data
        console.log("AN ERROR OCCURRED", data)
        runAlert(header, error)
      } else {
        console.log("EVERYTHING SEEM FINE", data)
        const { user, invite } = data
        // update state
        dispatch({ type: SET_KEY_HOLDER, payload: user })
        dispatch({ type: ADD_USER, payload: user })
        dispatch({ type: REMOVE_INVITATION, payload: invite })
        dispatch({ type: LOAD_KEYHOLDER, payload: false })

        // update localStorage
        localStorage.token = user.id
        localStorage.credentials = user.admin

        // change body background color
        const body = document.querySelector('body')
        body.classList.remove("bg-color-home")

        props.history.push(`/users/${user.id}`)
      }
    })
  }

  return (
    <Grid textAlign='center' id="Signup-Grid" verticalAlign='middle'>
      <Grid.Column className="Signup-Column">
        <Header as='h2' className="Signup-Header" textAlign='center'>
          <Icon name='signup' />
          Sign Up
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment>
            <Form.Field
              fluid 
              placeholder='First Name'
              control={Input}
              name='firstName'
              onChange={handleFieldChange}
            />
            <Form.Field
              fluid 
              placeholder='Last Name'
              control={Input}
              name='lastName'
              onChange={handleFieldChange}
            />
            <Form.Input 
              fluid 
              icon='user' 
              iconPosition='left' 
              placeholder='E-mail address' 
              name='email'
              onChange={handleFieldChange}
            />
            {
              !doesTokenExist && 
              <Form.Input 
                fluid 
                icon='hand point right' 
                iconPosition='left' 
                placeholder='Company' 
                name='company'
                onChange={handleFieldChange}
              />
            }
            <Form.Input
              fluid
              icon='address card'
              iconPosition='left'
              placeholder='Job Title'
              name='jobTitle'
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
            <Button className="Signup-Button-Color" fluid size='large'>
              Sign Up
            </Button>
          </Segment>
        </Form>
        { alertStatus &&
          <Message warning attached='bottom'>
            { 
              alertStatus && 
              <React.Fragment>
                <Header as='h5' dividing>
                  {header}
                </Header>
                <List bulleted style={{ textAlign: "left" }}>
                  { displayAlert(errorMsg) }
                </List>
              </React.Fragment>
            }
          </Message>
        }
        <Message className="Signup-Message">
          <span>Already have an account? </span>
          <Link to="/login">
            Sign-In
          </Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default withRouter(Signup);