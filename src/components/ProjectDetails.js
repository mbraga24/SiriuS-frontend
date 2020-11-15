import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Icon, Divider, Button, List, Segment, Form, Modal, Grid } from 'semantic-ui-react';
import { newDocument } from '../api';
import { ADD_DOCUMENT } from '../store/type';
import { withRouter } from 'react-router-dom';
import html2canvas from 'html2canvas'; // => install html2canvas
import jsPDF from 'jspdf'; // => install jspdf
import DocumentList from './DocumentList';
import AddUserList from './AddUserList';
import Loading from './Loading';
import { downloadZip } from '../api';
import '../resources/Project.css';

const ProjectDetails = props => {

  const matchId = parseInt(props.match.params.id)
  const dispatch = useDispatch()

  // redux store
  const currentUser = useSelector(state => state.app.keyHolder)
  const projectActive = useSelector(state => state.project.projects)
  const projectArchive = useSelector(state => state.archiveProject.archive)

  // overall variables
  const [ file, setFile ] = useState(null)
  const [ fileName, setFileName ] = useState("")
  const [ statusCode, setStatusCode ] = useState("")
  const [ allProjects, setAllProjects ] = useState("")
  const [ archive, setArchive ] = useState(false)
  const [ disable, setDisable ] = useState(false)
  // loaders 
  const [ loader, setLoader ] = useState(false)
  const [ pageLoader, setPageLoader ] = useState(true)
  // upload and download file feature 
  const [ buttonStatus, setButtonStatus ] = useState(false)
  const [ open, setOpen ] = useState(false)
  const [ downloadLink, setDownloadLink ] = useState("")

  useEffect(() => {
    if (props.match.path.split("/").includes("archive")) {
      setAllProjects(projectArchive)
      setArchive(true)
      setDisable(true)
      setPageLoader(!projectArchive)
    } 
    if (props.match.path.split("/").includes("project")) {
      setAllProjects(projectActive)
      setArchive(false)
      setDisable(false)
      setPageLoader(!projectActive)
    }
  }, [ projectActive, projectArchive, props.match.path ])

  const currentProject = allProjects && allProjects.find(p => p.id === matchId)

  const archiveMessage = archivedDate => {
    return `All activities for this project were closed on ${archivedDate}`
  }

  const pxToMm = (px) => {
    return Math.floor(px/document.getElementById('myMm').offsetHeight);
  };

  const handleDownload = () => {
    setButtonStatus(true)
    setLoader(true)

    // create PDF of the project page with html2canvas and jsPDF
    const input = document.getElementById("Project-Details")
    html2canvas(input)
    .then((canvas) => {

      let imgData = canvas.toDataURL('image/jpeg', 1.0);
      //Get the original size of canvas/image
      let img_w = canvas.width;
      let img_h = canvas.height;
    
      //Convert to mm
      let doc_w = pxToMm(img_w);
      let doc_h = pxToMm(img_h)

      //Set doc size
      let doc = new jsPDF('l', 'mm', [doc_h, doc_w]);  // this works

      //set image height similar to doc size
      doc.addImage(imgData, 'JPG', 0, 0, doc_w, doc_h);
      let currentTime = new Date();
      doc.save(`${currentProject.name}-${currentTime}.pdf`);

    });

    // download zip file of a .json file with all the projects attributes
    downloadZip(currentProject.id)
    .then(data => {
      setLoader(false)
      setDownloadLink(data.url)
    })
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
  
    newDocument(formData)
    .then(r => {
      if (r.ok) {
        // set statusCode 
        setStatusCode(r.status)
        return r.json()
      }
    })
    .then(newDoc => {
      // set loading back to false
      setLoader(false)
      // wait 3 seconds and reset buttonStatus
      setTimeout(function(){ setButtonStatus(false) }, 3000)
      // update store 
      dispatch({ type: ADD_DOCUMENT, payload: newDoc })
      setFileName("")
    })
  };

  const onFormSubmit = e => {
    e.preventDefault(); 
    // set loading to true
    setLoader(true)
    // set buttonStatus to true to display upload success or failed
    setButtonStatus(true) 
    // upload file to database
    fileUpload(file, fileName, currentProject.id, currentUser.id);
  };

  return (
      pageLoader ? 
      <Loading loadingClass={true} /> 
      :
      <React.Fragment>
        <div id="myMm" style={{height: "1mm"}} />
        <div id="Project-Container">
          { 
            archive && currentProject &&
            <Segment inverted color='red' tertiary size="big" textAlign="center">
              <Icon name='warning' />
              {archiveMessage(currentProject.finish_date)}
            </Segment>
          }
          {
            currentProject !== undefined && 
              <React.Fragment>
                <Header as='h2' className="Project-Header-Align-Items">
                  <span>
                    <Icon name='clipboard list' size="large" className="Project-Icon-Color"/>
                    <Header.Content>
                      <span className="Project-Title">Project</span>
                    </Header.Content>
                  </span>
                  <span>
                    { 
                      disable ?
                      <React.Fragment>
                        {
                          !buttonStatus ? 
                          <Button className="Project-Download-Button-Style" onClick={handleDownload}><Icon name="download"/>Back Up Project</Button>
                          :
                          <Button className={`Project-Download-Button-Style ${loader && "loading"}`} onClick={() => setButtonStatus(false)}><Icon name="download"/><a href={downloadLink}>{ !loader && `${"Download Project"}`}</a></Button>
                        }                        
                      </React.Fragment>
                      : 
                      currentUser.admin &&
                        <Modal
                          onClose={() => setOpen(false)}
                          onOpen={() => setOpen(true)}
                          open={open}
                          trigger={
                              <Button className="Project-Button-Style Button-Change"><Icon name="add"/> Add Collaborator </Button>
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
                <div id="Project-Details">
                  <Grid doubling columns={2} className="Project-List">
                      <Grid.Column width={13}>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <div className="Project-Items-Style Items-Spacing">
                              <Icon name='clipboard list' size="large"/>
                              Title:
                              <p className="Project-Title Next-Line">{currentProject.name}</p>
                            </div>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <div className="Project-Items-Style Items-Spacing">
                              <Icon name='file alternate' size="large" />
                              Description:
                              <List.Content><span className="Project-Description-Text">{currentProject.description}</span></List.Content>
                            </div>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid>
                          <Grid.Row>
                            <Grid.Column width={4}>
                            <div className="Project-Items-Style Items-Spacing">
                              <Icon name='calendar alternate' size="large"/>
                              Start Date: {currentProject.start_date}
                            </div>
                            </Grid.Column>
                            <Grid.Column width={4}>
                            <div className="Project-Items-Style Items-Spacing">
                              <Icon name='calendar check' size="large"/>
                                Due Date: {currentProject.due_date}
                            </div>
                            </Grid.Column>
                            <Grid.Column width={4}>
                            <div className="Project-Items-Style Items-Spacing">
                              <Icon name="users" size="large"/>
                                Collaborators: {currentProject.users.length}
                            </div>
                            </Grid.Column>
                            <Grid.Column width={4}>
                            <div className="Project-Items-Style Items-Spacing">
                              <Icon name='linkify' size="large"/>
                              <a href='http://www.semantic-ui.com'>company-site.com</a>
                            </div>
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Grid.Column>

                      <Grid.Column width={3}>
                        <List divided verticalAlign='middle'>
                          <Header as='h5'>Collaborators</Header>
                          { 
                            currentProject.users.map(user => (
                              <List.Item className="Project-Items-Style User-Items">
                                <List.Content floated='left'>
                                  <Icon name="user"/>
                                </List.Content>
                                <List.Content>{user.first_name} {user.last_name}</List.Content>
                              </List.Item>
                            ))
                          }
                        </List>
                      </Grid.Column>
                  </Grid> 
                  <Grid>
                    <Grid.Row>
                    { 
                        !disable &&
                        <Grid.Column width={6}>
                          <div className="Project-Items-Style Items-Spacing Project-File-Upload-Wrapper">
                            <Form onSubmit={onFormSubmit}>
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
                                  { 
                                    loader && fileName ?
                                    <Button className="Project-Button-Style Button-Spacing" loading>
                                      Loading
                                    </Button> : 
                                      statusCode === 200 && buttonStatus ?
                                      (
                                        <Button className="Button-Spacing" color='green'>
                                          File Upload Success
                                        </Button>
                                      ) : 
                                      statusCode === 500 && buttonStatus ? 
                                      (
                                        <Button className="Button-Spacing" color='red'>
                                          File Upload Failed
                                        </Button>
                                      ) : 
                                    (
                                      <Button type="submit" className={`Project-Button-Style Button-Spacing ${!fileName && "disabled"}`}>
                                        Upload File
                                      </Button>      
                                    )
                                  }
                              </Form.Field>
                            </Form>
                          </div>
                        </Grid.Column>
                    }
                      <Grid.Column width={12} id="Grid-Document-List-Wrapper">
                        <div className="Project-Items-Style Items-Spacing">
                          <DocumentList />
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
              </React.Fragment>
          }
        </div>
      </React.Fragment>
  )
}

export default withRouter(ProjectDetails);
