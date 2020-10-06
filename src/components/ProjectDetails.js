import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Icon, Container, Divider, Button, List, Segment, Form, Modal } from 'semantic-ui-react';
import { newDocument } from '../api';
import { ADD_DOCUMENT } from '../store/type';
import { withRouter } from 'react-router-dom';
import html2canvas from 'html2canvas'; // => install html2canvas
import jsPDF from 'jspdf'; // => install jspdf
import DocumentList from './DocumentList';
import AddUserList from './AddUserList';
import '../resources/Project.css';

const ProjectDetails = props => {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.app.keyHolder)
  const projectData = useSelector(state => state.project.projects)
  const matchId = parseInt(props.match.params.id)
  const currentProject = projectData.find(pro => pro.id === matchId)
  const isComplete = currentProject && currentProject.done ? true : false;
  const projects = isComplete ? {
    message: function(date) {
      return `All activities for this project were closed on ${date}`
    },
    disabled: currentProject.done ? true : false
  } : projectData

  const [ file, setFile ] = useState(null)
  const [ fileName, setFileName ] = useState("")
  const [ statusCode, setStatusCode ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const [ buttonStatus, setButtonStatus ] = useState(false)
  const [ open, setOpen ] = useState(false)
  const [ downloadLink, setDownloadLink ] = useState("")

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
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  };

  const fileUpload = (file, fileName, projectId, userId) => {
    const formData = new FormData();
    // FormData attributes 
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("projectId", projectId);
    formData.append("userId", userId);
    
    console.log("FORM DATA --->", formData)
    newDocument(formData)
    .then(r => {
      if (r.ok) {
        // set statusCode 
        setStatusCode(r.status)
        return r.json()
      }
    })
    .then(newDoc => {
      dispatch({ type: ADD_DOCUMENT, payload: newDoc })
      setFileName("")
    })
  };

  const resetButton = () => {
    setButtonStatus(false)
  }

  const handleDownload = () => {
    setButtonStatus(true)
    setLoading(true)

    setTimeout(function() { 
      setButtonStatus(true) 
      resetLoading()
    }, 1000)

    // create PDF of the project page with html2canvas and jsPDF
    const input = document.getElementById("Project-Details")
    html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      let pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 20, 20);
      pdf.save(`${currentProject.name}.pdf`);
    });

    // download zip file of a .json file with all the projects attributes
    fetch(`http://localhost:3000/download/${currentProject.id}`, {
      headers: { 
        'Content-Type': 'application/json'
      }
    })
    .then(response => response)
    .then(data => setDownloadLink(data.url))
  }

  const onFormSubmit = e => {
    e.preventDefault(); 
    // upload file to database
    fileUpload(file, fileName, currentProject.id, currentUser.id);
    // set loading to true
    setLoading(true)
    // wait 2 seconds to set buttonStatus to true and reset buttonStatus to false again
    setTimeout(function() { 
      setButtonStatus(true) 
      resetButtonStatus()
    }, 1000)
    // reset loading to false again
    resetLoading()
  };

  return (
      <>
        <div id="myMm" style={{height: "1mm"}} />
        <Container id="Project-Container">
          { (projects.message && currentProject) && 
            <Segment inverted color='red' tertiary size="big" textAlign="center">
              <Icon name='warning' />
              {projects.message(currentProject.finish_date)}
            </Segment>
          }
          {
            currentProject !== undefined && 
              <>
                <Header as='h2' className="Project-Header-Align-Items">
                  <span>
                    <Icon name='clipboard list' size="large" className="Project-Icon-Color"/>
                    <Header.Content>
                      <span className="Project-Title">Project</span>
                    </Header.Content>
                  </span>
                  <span>
                    { projects.disabled ?
                      <>
                        {
                          !buttonStatus ? 
                          <Button className="Project-Download-Button-Style" onClick={handleDownload}><Icon name="download"/>Back Up Project</Button>
                          :
                          <Button className={`Project-Download-Button-Style ${loading && "loading"}`} onClick={resetButton}><Icon name="download"/><a href={downloadLink}>{ !loading && `${"Download Project"}`}</a></Button>
                        }                        
                      </>
                      :
                      <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={
                            <Button className="Project-Button-Style"><Icon name="add"/> Add Collaborator </Button>
                          }>
                          <Modal.Header>
                            <span className="AddUsersTable-Title">Collaborators</span>
                          </Modal.Header>
                          <Modal.Content>
                            <Modal.Description>
                              <AddUserList userType={"currentProject"} setOpen={setOpen} currentProject={currentProject} button={false}/>
                            </Modal.Description>
                          </Modal.Content>
                      </Modal>
                    }
                  </span>
                </Header>
                <Divider/>
                <List divided className="Project-List" id="Project-Details">
                  <List.Item className="Project-Items Hidden">
                    <List.Icon name='clipboard list' size="large"/>
                    <List.Content>Title: <div className="Project-Title Next-Line">{currentProject.name}</div></List.Content>
                  </List.Item>
                  <List.Item className="Project-Items">
                    <List.Icon name='file alternate' size="large"/>
                    <List.Content>Description: <span className="Project-Description-Text">{currentProject.description}</span></List.Content>
                  </List.Item>
                  <List.Item className="Project-Items">
                    <List.Icon name='calendar alternate' size="large"/>
                    <List.Content>Start Date: {currentProject.start_date}</List.Content>
                  </List.Item>
                  <List.Item className="Project-Items">
                    <List.Icon name='calendar check' size="large"/>
                    <List.Content>Due Date: {currentProject.due_date}</List.Content>
                  </List.Item>
                  <List.Item className="Project-Items">
                    <List.Icon name="users" size="large"/>
                    <List.Content>Collaborators: {currentProject.users.length}</List.Content>
                  </List.Item>
                  <List.Item className="Project-Items">
                    <List.Icon name='linkify' size="large"/>
                    <List.Content>
                      <a href='http://www.semantic-ui.com'>company-site.com</a>
                    </List.Content>
                  </List.Item>
                </List>
                  { !projects.disabled &&
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
                            name="file"
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
                              <Button className={`Project-Button-Style Project-Spacing-Style ${loading && "loading"} ${!fileName && "disabled"}`} type="submit">
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
                  }
                <DocumentList message={"No documents are listed for this project"} icon={"pdf file outline"} />
              </>
          }
        </Container>
      </>
  )
}

export default withRouter(ProjectDetails);