import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Button, Modal, Form, List, Message, Header } from 'semantic-ui-react';
import NewProject from './NewProject';
import AddUserList from './AddUserList';
import createOnSubmit from '../helpers/submitCreateForm';
import updateOnSubmit from '../helpers/submitUpdateForm';
import { deleteFromArchive } from '../api';
import { styleIcon, styleBtn, styleBtnLoad, styleDeleteBtn, styleMessageDisplay } from '../helpers/RelaunchModalsStyles';
import { REMOVE_FROM_ARCHIVE, REMOVE_USER_FROM_TEMP_PROJECT } from '../store/type';
import '../resources/RelaunchModals.css';

const RelaunchModals = props => {

  const dispatch = useDispatch()
  const [ firstOpen, setFirstOpen ] = useState(false)
  const [ secondOpen, setSecondOpen ] = useState(false)
  const [ thirdOpen, setThirdOpen ] = useState(false)
  const [ loadRelaunch, setLoadRelaunch ] = useState(false)
  const [ createdStatus, setCreatedStatus ] = useState(false)
  const [ projectDetails, setProjectDetails ] = useState(props.projectDetails)
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ header, setHeader ] = useState("")
  const [ errorMsg, setErrorMsg ] = useState([])

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

  const resetProjectDetails = updatedProject => {
    setProjectDetails(updatedProject)
  }

  const openFirstModal = () => {
    setFirstOpen(true)
  }

  const goBackToFirstModal = () => {
    setSecondOpen(false)
  }

  const projectStatus = status => {
    setLoadRelaunch(false)
    setCreatedStatus(status)
  }

  const closeModals = () => {
    setFirstOpen(false)
    setSecondOpen(false)
    setThirdOpen(false)
    setCreatedStatus(false)
    props.actionRequired === "relaunch" && dispatch({ type: REMOVE_USER_FROM_TEMP_PROJECT, payload: [] })
  }

  const deleteArchive = () => {
    deleteFromArchive(projectDetails.id)
    .then(data => {
      const { archiveId } = data
      dispatch({ type: REMOVE_FROM_ARCHIVE, payload: archiveId })
      dispatch({ type: REMOVE_USER_FROM_TEMP_PROJECT, payload: [] })
      props.history.push("/projects")
    })
  }

  const pushUser = () => {
    props.history.push('/projects')
  }

  const handleSubmit = e => {
    if (props.actionRequired === "relaunch") {
      createOnSubmit(e, { title: newTitle, description: newDescription, dateRange: newDateRange, addUsersId: newAddedUsersId, relaunchProject: true, projectStatus, runAlert, pushUser})
      setThirdOpen(true)
    } else {
      updateOnSubmit(e, { projectId: projectDetails.id, newTitle, newDescription, newDateRange, projectStatus, runAlert, resetProjectDetails })
      setFirstOpen(false)
    }
  }

  return (
    <>
      <Button className="Project-Button-Color" onClick={openFirstModal}><Icon name={props.icon}/>{props.btnContent}</Button>

      <Modal
        onSubmit={props.actionRequired === "update" && handleSubmit}
        as={props.actionRequired === "update" ? Form : null}
        closeOnDimmerClick={false}
        centered={true}
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
      >
        <Modal.Header>
          <Icon name='edit' size="big" style={styleIcon}/>
          Update Project Details
        </Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <NewProject 
              defaultActions={false} 
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
          { 
            props.actionRequired === "update" ?
            <Button 
              type="submit"
              style={styleBtnLoad}
            > 
              Update Project <Icon name='right chevron' />
            </Button> :
            <Button 
              type="button"
              onClick={() => setSecondOpen(true)} 
              style={styleBtn}
            >
              Collaborators <Icon name='right chevron' />
            </Button>
          
          }
        </Modal.Actions>

        <Modal
          onSubmit={props.actionRequired === "relaunch" && handleSubmit}
          closeOnDimmerClick={false}
          as={props.actionRequired === "relaunch" ? Form : null}
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
              <AddUserList userType={props.actionRequired !== "relaunch" ? "newProject" : "relaunchProject"} button={true} defaultActions={false} /> 
              {
              alertStatus &&
              <Message style={styleMessageDisplay} warning attached='bottom'>
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
                  createdStatus ?
                  <Button 
                    type="button"
                    style={styleBtn}
                  >
                    <Icon name='check circle' /> Project Created
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
                      Confirm Project <Icon name='right chevron' />
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
            <p>Your old project was deleted from your archive.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              type="button"
              onClick={deleteArchive}
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