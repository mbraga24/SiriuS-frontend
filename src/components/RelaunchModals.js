import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Button, Modal, Form, List, Message, Header } from 'semantic-ui-react';
import NewProject from './NewProject';
import AddUserList from './AddUserList';
import createOnSubmit from '../helpers/submitCreateForm';
import updateOnSubmit from '../helpers/submitUpdateForm';
import { deleteFromArchive } from '../api';
import { REMOVE_FROM_ARCHIVE, PROJECT_UPDATE_EXISTING_USERS, REMOVE_USER_FROM_TEMP_PROJECT } from '../store/type';
import '../resources/RelaunchModals.css';

const RelaunchModals = props => {

  const dispatch = useDispatch()
  const [ firstOpen, setFirstOpen ] = useState(false)
  const [ secondOpen, setSecondOpen ] = useState(false)
  const [ thirdOpen, setThirdOpen ] = useState(false)
  const [ loadRelaunch, setLoadRelaunch ] = useState(false)
  const [ created, setCreated ] = useState(false)
  const [ projectDetails, setProjectDetails ] = useState(props.projectDetails)
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ header, setHeader ] = useState("")
  const [ errorMsg, setErrorMsg ] = useState([])
  const { users } = projectDetails

  const newTitle = useSelector(state => state.project.relaunchTitle)
  const newDescription = useSelector(state => state.project.relaunchDescription)
  const newDateRange = useSelector(state => state.project.relaunchDateRange)
  const newAddedUsersId = useSelector(state => state.activeProject.addUsersId)

  const runAlert = (header, error) => {
    setHeader(header)
    setErrorMsg(error)
    setAlertStatus(true)
    resetAlert()
  }

  const resetAlert = () => {
    setTimeout(() => {
      setAlertStatus(false)
    }, 5000)
  }

  const displayAlert = errors => {
    return errors.map(e => (
      <List.Item key={e}>{e}</List.Item>
    ))
  }

  const styleBtn = {
    backgroundColor: "#534292",
    color: "#ffffff"
  }

  const styleBtnLoad = {
    backgroundColor: "#534292",
    width: "165px",
    color: "#ffffff"
  }

  const styleIcon = {
    color: "#79589f"
  }
  
  const styleDeleteBtn = {
    backgroundColor: "#ac4444",
    color: "#ffffff"
  }

  const resetProjectDetails = updatedProject => {
    setProjectDetails(updatedProject)
  }

  const openFirstModal = () => {
    setFirstOpen(true)
    !props.relaunch && dispatch({ type: PROJECT_UPDATE_EXISTING_USERS, payload: users })
  }

  const goBackToFirstModal = () => {
    setSecondOpen(false)
    !props.relaunch && dispatch({ type: REMOVE_USER_FROM_TEMP_PROJECT, payload: [] })
  }

  const projectStatus = status => {
    setLoadRelaunch(false)
    setCreated(status)
  }

  const closeModals = () => {
    setFirstOpen(false)
    setSecondOpen(false)
    setThirdOpen(false)
    setCreated(false)
    !props.relaunch && dispatch({ type: REMOVE_USER_FROM_TEMP_PROJECT, payload: [] })
  }

  const deleteArchive = () => {
    deleteFromArchive(projectDetails.id)
    .then(data => {
      const { archiveId } = data
      dispatch({ type: REMOVE_FROM_ARCHIVE, payload: archiveId })
      props.history.push("/projects")
    })
  }

  const pushUser = () => {
    props.history.push('/projects')
  }

  const handleSubmit = e => {
    setLoadRelaunch(true)
    props.relaunch ? createOnSubmit(e, { newTitle, newDescription, newDateRange, newAddedUsersId, relaunchProject: true, projectStatus, runAlert, pushUser})
    : updateOnSubmit(e, { projectId: projectDetails.id, newTitle, newDescription, newDateRange, newAddedUsersId, projectStatus, runAlert, resetProjectDetails })
  }

  return (
    <>
      <Button className="Project-Button-Color" onClick={openFirstModal}><Icon name={props.icon}/>{props.btnContent}</Button>

      <Modal
        closeOnDimmerClick={false}
        centered={true}
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
      >
        <Modal.Header>
          <Icon name='edit' size="big" style={styleIcon}/>
          Confirm or Update Project Details
        </Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <NewProject 
              alternativeActions={false} 
              allowUpdate={true}
              fillOutTitle={projectDetails.name}
              fillOutDescription={projectDetails.description}
              dateFieldLabel={"Set a new start and due date"} 
              titleFieldLabel={"Confirm or update Title"} 
              descriptionFieldLabel={"Confirm or update Description"} 
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button 
            onClick={closeModals} 
            style={styleDeleteBtn}
          >
            <Icon name='remove' /> Cancel
          </Button>
          <Button 
            type="button"
            onClick={() => setSecondOpen(true)} 
            style={styleBtn}
          >
            Collaborators <Icon name='right chevron' />
          </Button>
        </Modal.Actions>

        <Modal
          closeOnDimmerClick={false}
          as={Form}
          onSubmit={(e) => handleSubmit(e)}
          centered={true}
          onClose={() => setSecondOpen(false)}
          onOpen={() => setSecondOpen(true)}
          open={secondOpen}
        >
          <Modal.Header>
            <Icon name='user plus' size="big" style={styleIcon}/>
            Assign Collaborators
          </Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <>  
                {
                  props.match.path.split("/").includes("project") ?
                  <AddUserList userType={"updateProject"} button={true} alternativeActions={false} onlyAvailableUsers={false} /> :
                  <AddUserList userType={"newProject"} button={true} alternativeActions={false} onlyAvailableUsers={true} /> 
                }
              </>
              {
              alertStatus &&
              <Message style={{display: "block"}} warning attached='bottom'>
                { 
                  alertStatus && 
                  <React.Fragment>
                    <Header as='h5' dividing>
                      <Icon name="dont"/>
                      {header}
                    </Header>
                    <List bulleted style={{ textAlign: "left" }}>
                      { displayAlert(errorMsg) }
                    </List>
                  </React.Fragment>
                }
              </Message>
              }
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
              {
              loadRelaunch ?
                <Button loading style={styleBtnLoad}>
                  Loading
                </Button>
                :
                <>
                {
                  created ?
                  <Button 
                    type="button"
                    onClick={() => setThirdOpen(true)} 
                    style={styleBtn}
                  >
                    <Icon name='check circle' /> {props.relaunch ? "Project Created" : "Project Updated" }
                  </Button> 
                  :
                  <>
                    <Button 
                      type="button"
                      onClick={goBackToFirstModal} 
                      style={styleBtn}
                    >
                      <Icon name='chevron left' /> Go back
                    </Button> 
                    <Button 
                      type="button"
                      onClick={closeModals} 
                      style={styleDeleteBtn}
                    >
                      <Icon name='remove' /> Cancel 
                    </Button>
                    <Button 
                      type="submit"
                      style={styleBtnLoad}
                    >
                      {props.relaunch ? "Confirm Project" : "Update Project" } <Icon name='right chevron' />
                    </Button> 
                  </>
                }
                </>
              }
          </Modal.Actions>
        </Modal>
      
        <Modal
          closeOnDimmerClick={false}
          centered={true}
          onClose={() => setThirdOpen(false)}
          open={thirdOpen}
          size='tiny'
        >
          <Modal.Header>
            <Icon name='clipboard check' size="big" style={styleIcon}/>
            All set!
          </Modal.Header>
          <Modal.Content>
            {
              props.relaunch ?
              <p>Your old project was deleted from your archive.</p>
              :
              <p>Your project was updated successfully!</p>
            }
          </Modal.Content>
          <Modal.Actions>
            <Button
              type="button"
              onClick={props.relaunch ? deleteArchive : closeModals}
              content="Close"
              style={styleBtn}
            />
          </Modal.Actions>
        </Modal>
      </Modal>
    </>
  )
}

export default withRouter(RelaunchModals);