import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Button, Modal, Form } from 'semantic-ui-react';
import NewProject from './NewProject';
import AddUserList from './AddUserList';
import submitForm from '../Helpers/onSubmit';
import '../resources/RelaunchModals.css';

const RelaunchModals = props => {

  const [firstOpen, setFirstOpen] = useState(false)
  const [secondOpen, setSecondOpen] = useState(false)
  const [thirdOpen, setThirdOpen] = useState(false)
  const [relaunchProject] = useState(true)
  const [archivedProject] = useState(props.archivedProject)
  const [archivedProjectId] = useState(props.archivedProject.id)
  const title = useSelector(state => state.project.relaunchTitle)
  const description = useSelector(state => state.project.relaunchDescription)
  const dateRange = useSelector(state => state.project.relaunchDateRange)
  const addUsersId = useSelector(state => state.activeProject.addUsersId)

  const styleBtn = {
    backgroundColor: "#534292",
    color: "#ffffff"
  }
  
  const styleDeleteBtn = {
    backgroundColor: "#ac4444",
    color: "#ffffff"
  }

  const styleIcon = {
    color: "#79589f"
  }

  const closeModals = () => {
    setFirstOpen(false)
    setSecondOpen(false)
    setThirdOpen(false)
  }

  const closeAndSubmit = e => {
    submitForm(e, { title, description, dateRange, addUsersId, relaunchProject, archivedProjectId})
    closeModals()
    props.history.push("/projects")
  }

  console.log("TITLE", title)
  console.log("DESC", description)
  console.log("DATE", dateRange)
  console.log("USERSID", addUsersId)

  return (
    <>
       <Button className="Project-Button-Color" onClick={() => setFirstOpen(true)}><Icon name="redo"/>Relaunch Project</Button>

      <Modal
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
              name={archivedProject.name}
              description={archivedProject.description}
              dateField={"Set a new start and due date"} 
              titleField={"Confirm or update Title"} 
              descriptionField={"Confirm or update Description"} 
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button 
            onClick={() => setSecondOpen(true)} 
            style={styleBtn}
          >
            Collaborators<Icon name='right chevron' />
          </Button>
        </Modal.Actions>

        <Modal
          centered={true}
          onClose={() => setSecondOpen(false)}
          onOpen={() => setSecondOpen(true)}
          open={secondOpen}
        >
          <Modal.Header>
            <Icon name='user plus' size="big" style={styleIcon}/>
            Assign New Collaborators
          </Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <AddUserList userType={"newProject"} button={true} alternativeActions={false} />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button 
              onClick={() => setSecondOpen(false)} 
              style={styleBtn}
            >
              <Icon name='chevron left' /> Go back
            </Button> 
            <Button 
              onClick={closeModals} 
              style={styleDeleteBtn}
            >
              Cancel <Icon name='remove' /> 
            </Button> 
            <Button 
              onClick={() => setThirdOpen(true)} 
              style={styleBtn}
            >
              Confirm Project <Icon name='right chevron' />
            </Button> 
          </Modal.Actions>
        </Modal>
      
        <Modal
          as={Form}
          onSubmit={(e) => closeAndSubmit(e)}
          centered={true}
          onClose={() => setThirdOpen(false)}
          open={thirdOpen}
          size='tiny'
        >
          <Modal.Header>
            <Icon name='clipboard check' size="big" style={styleIcon}/>
            Project Created
          </Modal.Header>
          <Modal.Actions>
            <Button
              type="submit"
              content='All set!'
              style={styleBtn}
            />
          </Modal.Actions>
        </Modal>
      </Modal>
    </>
  )
}

export default withRouter(RelaunchModals);