import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, Icon, Container, Divider, Button, List, Segment, Form } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import '../resources/Project.css';

// TEMPORARY IMPORTS AND VARIABLES
// ================================================================================
import axios from "axios";
const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);
mock.onPost("/file/upload/enpoint").reply(200);
// ================================================================================

const ShowProject = props => {

  // useSelector takes in a callback that has access to the redux state as an argument
  // source: https://stackoverflow.com/questions/61580674/redux-useselector-with-conditional-statement
  const projects = useSelector(state => {
    if (props.match.path === "/project/:id") {
      return {
        data: state.project.projects
      }
    } else {
      return {
        data: state.completeProject.complete,
        message: `All activities for this project were closed on <INSERT SOME DATE HERE>`
      }
    }
  })
  
  const [ file, setFile ] = useState(null)
  const [ fileName, setFileName ] = useState("")
  const [ statusCode, setStatusCode ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const [ buttonStatus, setButtonStatus ] = useState(false)
  const matchId = parseInt(props.match.params.id)
  const thisProject = projects.data.find(pro => pro.id === matchId)

  // wait 2 seconds and reset loading
  const resetLoading = () => {
    setTimeout(function(){ setLoading(false) }, 1000)
  }

  // wait 3 seconds and reset buttonStatus
  const resetButtonStatus = () => {
    setTimeout(function(){ setButtonStatus(false) }, 1500)
  }

  // set file and set fileName
  const fileChange = e => {
    console.log("File chosen --->:", e.target.files[0])
    console.log("File name  --->:" ,e.target.files[0].name)
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  };

  const fileUpload = async file => {
    // mimic fetch
    const formData = new FormData();
    formData.append("fileUpload ---> file", file);
    try {
      axios.post("/file/upload/enpoint").then(response => {
        console.log("RESPONSE:", response);
        console.log("RESPONSE STATUS:", response.status);
        setStatusCode(response.status)
      });
    } catch (error) {
      console.error(Error(`Error uploading file ${error.message}`));
    }
  };

  const onFormSubmit = e => {
    e.preventDefault(); // Stop form submit
    // upload file to database
    fileUpload(file);
    // set loading to true
    setLoading(true)
    // wait 2 seconds to set buttonStatus to true and reset buttonStatus to false again
    setTimeout(function(){ 
      setButtonStatus(true) 
      resetButtonStatus()
    }, 1000)
    // reset loading to false again
    resetLoading()
  };

  return (
    <Container id="Project-Container">
      { projects.message && 
        <Segment inverted color='red' tertiary size="big" textAlign="center">
          <Icon name='warning' />
          {projects.message}
        </Segment>
      }
      { 
        thisProject && 
          <>
            <Header as='h2' className="Project-Header-Align-Items">
              <span>
                <Icon name='clipboard list' size="large" className="Project-Icon-Color"/>
                <Header.Content>
                  <span className="Project-Title">Project: {thisProject.name}</span>
                </Header.Content>
              </span>
              <span>
                <Link to="/">
                  <Button className="Project-Button-Style" disabled>
                    <Icon name='add' /> 
                    Add Collaborator
                  </Button>
                </Link>
              </span>
            </Header>
            <Divider/>
            <List divided className="Project-List">
              <List.Item className="Project-Items">
                <List.Icon name='file alternate' size="large"/>
                <List.Content>Description: <span className="Project-Description-Text">{thisProject.description}</span></List.Content>
              </List.Item>
              <List.Item className="Project-Items">
                <List.Icon name='calendar alternate' size="large"/>
                <List.Content>Start Date: {thisProject.start_date}</List.Content>
              </List.Item>
              <List.Item className="Project-Items">
                <List.Icon name='calendar check' size="large"/>
                <List.Content>Due Date: {thisProject.due_date}</List.Content>
              </List.Item>
              <List.Item className="Project-Items">
                <List.Icon name="users" size="large"/>
                <List.Content>Collaborators: {thisProject.users.length}</List.Content>
              </List.Item>
              <List.Item className="Project-Items">
                <List.Icon name='linkify' size="large"/>
                <List.Content>
                  <a href='http://www.semantic-ui.com'>company-site.com</a>
                </List.Content>
              </List.Item>
            </List>
            <List.Item className="Project-Items">
              <Form onSubmit={onFormSubmit} className="Project-Document-Form">
                <Form.Field>
                  <label>File input & upload </label>
                  <Button as="label" htmlFor="file" type="button" animated="fade" className="Project-Button-Style">
                    <Button.Content visible>
                      <Icon name="file" />
                    </Button.Content>
                    <Button.Content hidden>Share New Document</Button.Content>
                  </Button>
                  <input
                    type="file"
                    id="file"
                    hidden
                    onChange={fileChange}
                  />
                  <Form.Input
                    fluid
                    label="File Chosen: "
                    placeholder="Use the above bar to browse your file system"
                    readOnly
                    value={fileName}
                  />
                    { !buttonStatus && // if buttonStatus is false display original button and hide it otherwise
                      <Button className={`Project-Button-Style Project-Spacing-Style ${loading && "loading"}`} type="submit">
                        { !loading ? `${"Upload File"}` : `${"Loading"}` }
                      </Button>
                    }
                    {
                      statusCode && statusCode === 200 && buttonStatus ?
                        (
                          <Button className="Project-Spacing-Style" color='green'>
                            File Upload Success
                          </Button>
                        )
                      : statusCode && statusCode === 500 && buttonStatus ?
                        (
                          <Button className="Project-Spacing-Style" color='red'>
                            File Upload Failed
                          </Button>
                        ) : null
                    }
                </Form.Field>
              </Form>
            </List.Item>
          </>
      }
    </Container>
  )
}
export default withRouter(ShowProject);