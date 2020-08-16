import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAdmin } from '../api';
import useFormFields from "../hooks/useFormFields";
import { Button, Form, Grid, Header, Message, Segment, Icon, Input } from 'semantic-ui-react';

const Signup = (props) => {

  const dispatch = useDispatch()

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    jobTitle: "",
    password: ""
  })

  const handleSubmit = e => {
    e.preventDefault()

    const adminInfo = {
      email: fields.email,
      first_name: fields.firstName,
      last_name: fields.lastName,
      company: fields.company,
      job_title: fields.jobTitle,
      password: fields.password
    }

    createAdmin(adminInfo)
    .then(newAdmin => {
      // update state
      dispatch({ type: "SET KEY HOLDER", payload: newAdmin })

      // update localStorage
      localStorage.token = newAdmin.admin.id
      localStorage.credentials = "admin"

      console.log("SIGNED UP:", newAdmin)
      // send new user to their account
      props.history.push(`/admins/${newAdmin.admin.id}`)
    })
  }

  return (
    <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Icon name='signup' />
           Sign Up
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Group widths='equal'>
              <Form.Field
                placeholder='First name'
                control={Input}
                name='firstName'
                onChange={handleFieldChange}
              />
              <Form.Field
                placeholder='Last name'
                control={Input}
                name='lastName'
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Input 
              fluid icon='user' 
              iconPosition='left' 
              placeholder='E-mail address' 
              name='email'
              onChange={handleFieldChange}
            />
            <Form.Input
              fluid
              icon='hand point right'
              iconPosition='left'
              placeholder='Company Name'
              type='company'
              name='company'
              onChange={handleFieldChange}
            />
            <Form.Input
              fluid
              icon='address card'
              iconPosition='left'
              placeholder='Job Title'
              type='jobTitle'
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

            <Button color='teal' fluid size='large'>
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Message>
          <span>Already have an account? </span>
          <Link to="/login">
            Sign In
          </Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export default withRouter(Signup);