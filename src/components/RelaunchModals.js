import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Button, Modal, Form } from 'semantic-ui-react';
import NewProject from './NewProject';
import AddUserList from './AddUserList';
import submitForm from '../Helpers/onSubmit';
import { deleteFromArchive } from '../api';
import { REMOVE_FROM_ARCHIVE } from '../store/type';
import '../resources/RelaunchModals.css';

const RelaunchModals = props => {

  const dispatch = useDispatch()
  const [firstOpen, setFirstOpen] = useState(false)
  const [secondOpen, setSecondOpen] = useState(false)
  const [thirdOpen, setThirdOpen] = useState(false)
  const [loadRelaunch, setLoadRelaunch] = useState(false)
  const [created, setCreated] = useState(false)
  const [archivedProject] = useState(props.archivedProject)
  const title = useSelector(state => state.project.relaunchTitle)
  const description = useSelector(state => state.project.relaunchDescription)
  const dateRange = useSelector(state => state.project.relaunchDateRange)
  const addUsersId = useSelector(state => state.activeProject.addUsersId)

  const styleBtn = {
    backgroundColor: "#534292",
    color: "#ffffff"
  }

  const styleIcon = {
    color: "#79589f"
  }
  
  const styleDeleteBtn = {
    backgroundColor: "#ac4444",
    color: "#ffffff"
  }


  const loaderStatus = status => {
    setLoadRelaunch(status)
    setCreated(true)
  }

  const closeModals = () => {
    setFirstOpen(false)
    setSecondOpen(false)
    setThirdOpen(false)
  }

  const deleteArchiveCloseModals = () => {
    deleteFromArchive(archivedProject.id)
    .then(data => {
      const { archiveId } = data
      dispatch({ type: REMOVE_FROM_ARCHIVE, payload: archiveId })
      props.history.push("/projects")
    })
  }

  const handleSubmit = e => {
    setLoadRelaunch(true)
    submitForm(e, { title, description, dateRange, addUsersId, relaunchProject: true, loaderStatus})
  }

  return (
    <>
       <Button className="Project-Button-Color" onClick={() => setFirstOpen(true)}><Icon name="redo"/>Relaunch Project</Button>

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
            Assign New Collaborators
          </Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <AddUserList userType={"newProject"} button={true} alternativeActions={false} />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
              {
              loadRelaunch ?
                <Button loading primary>
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
                    <Icon name='check circle' /> Project Created
                  </Button> 
                  :
                  <>
                    <Button 
                      type="button"
                      onClick={() => setSecondOpen(false)} 
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
                      style={styleBtn}
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
            <p>The project was deleted from your archive and it's been reactivated.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              type="button"
              onClick={deleteArchiveCloseModals}
              content='Go to projects'
              style={styleBtn}
            />
          </Modal.Actions>
        </Modal>
      </Modal>
    </>
  )
}

export default withRouter(RelaunchModals);