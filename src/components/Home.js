import React, { useState } from "react";
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useFormFields from "../hooks/useFormFields";
import { createUser } from '../api';
import { Container, Button, Form, Grid, Header, Message, Segment, Icon, Input, List, Image } from 'semantic-ui-react';
import { SET_KEY_HOLDER, ADD_USER, LOAD_KEYHOLDER, REMOVE_INVITATION } from '../store/type';
import '../resources/Home.css';
import '../resources/Signup.css';

const Home = props => {

  const dispatch = useDispatch()
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ emptyPassword, setEmptyPassword ] = useState(false)
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
    
    // if (fields.password === "") {
    //   setEmptyPassword(!emptyPassword)
    //   fields.password = "0"
    // }

    const userInfo = {
      user: {
        email: fields.email,
        first_name: fields.firstName,
        last_name: fields.lastName,
        job_title: fields.jobTitle,
        password: fields.password,
        invite_token: doesTokenExist ? searchToken.split("=")[1] : null
      }
    }

    createUser(userInfo)
    .then(data => {
      if (data.error) {
        const { error, header } = data
        console.log("AN ERROR OCCURRED", data)
        // !emptyPassword && error.push("Password can't be blank")
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
        body.classList.remove("bg-color-signed-in")

        props.history.push(`/users/${user.id}`)
      }
    })
  }


  return(
    <Container id="Home-Container">
      <Grid doubling stackable>
        <Grid.Row>
          <Grid.Column className="Logo-Action-Wrapper" width={10}>
              <Grid columns="equal" stackable >
                <Grid.Row>
                  <Grid.Column textAlign="center">
                    <Image src={require('../Icon/polygonal-crab-inverted.png')} size='medium' rounded />
                  </Grid.Column>
                  <Grid.Column style={{margin: "auto 0"}} textAlign="center">
                    <p className="Home-Call-Action-1">
                      Join our community in a new and slacking proof way to work and let's get <span>SiriuS!</span>
                    </p>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign="left">
                    <p className="Home-Call-Action-2">
                      Create your new team, set goals, keep track of your progress, share your ideas, store closed projects and more. 
                    </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
          </Grid.Column>
          <Grid.Column width={6}>    
            <Grid textAlign='center'id="Signup-Grid" verticalAlign='middle'>
              <Grid.Column className="Signup-Column">
                <Header as='h2' className="Signup-Header" textAlign='center'>
                  <Icon name='signup' />
                  Sign Up
                </Header>
                <Form size='large' onSubmit={handleSubmit}>
                  <Segment>
                    <Form.Input 
                      fluid 
                      placeholder='First Name'
                      control={Input}
                      name='firstName'
                      onChange={handleFieldChange}
                    />
                    <Form.Input 
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
                    <Form.Input 
                      fluid 
                      icon='hand point right' 
                      iconPosition='left' 
                      placeholder='Company' 
                      name='company'
                      onChange={handleFieldChange}
                    />
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default withRouter(Home);