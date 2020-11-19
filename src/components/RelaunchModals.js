import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Button, Modal } from 'semantic-ui-react';
import NewProject from './NewProject';
import AddUserList from './AddUserList';
import useFormFields from '../hooks/useFormFields';
import { createProject, deleteFromArchive } from '../api';
import { REMOVE_FROM_ARCHIVE, REMOVE_USER_FROM_TEMP_PROJECT } from '../store/type';
import '../resources/RelaunchModals.css';

const RelaunchModals = props => {

  // onClick={props.handleRelaunch}
  const [firstOpen, setFirstOpen] = useState(false)
  const [secondOpen, setSecondOpen] = useState(false)
  const [thirdOpen, setThirdOpen] = useState(false)
  // const [ fields, handleFieldChange ] = useFormFields({
  //   name: "",
  //   description: "",
  //   startDate: "",
  //   dueDate: ""
  // })

  const styleBtn = {
    backgroundColor: "#534292",
    color: "#ffffff"
  }

  const styleIcon = {
    color: "#79589f"
  }

  const handleRelaunch = () => {
    console.log("RESTART PROJECT")
    console.log(props.archProject)

    setThirdOpen(true)

    // const newProject = {
    //   name: props.archProject.name,
    //   description: props.archProject.description,
    //   // startDate: ,
    //   // dueDate: 
    // }

    // console.log("NEW PROJECT -->", newProject)

    // createProject(newProject)
    // .then(data => {
    //   // update each user in the redux store
    //   console.log("PROJECT REACTIVATED", data);
    //   for (let user of data.users) {
    //     dispatch({ type: UPDATE_USER, payload: user })  
    //   }
    //   // add new project to redux store
    //   dispatch({ type: ADD_PROJECT, payload: data.project })
    //   // remove users from temporary array in the redux store 
    //   dispatch({ type: REMOVE_USER_FROM_TEMP_PROJECT, payload: [] })
    //   props.history.push('/projects')
    // })

    // deleteFromArchive(props.archProject.id)
    // .then(data => {
    //   console.log("DELETE ARCHIVED", data)
    //   const { archiveId } = data
    //   dispatch({ type: REMOVE_FROM_ARCHIVE, payload: archiveId })
    // }).then(async () => {
    //   setFirstOpen(false)
    //   setSecondOpen(false)
    //   setThirdOpen(false)
    // })

  }

  const closeModals = () => {
    setFirstOpen(false)
    setSecondOpen(false)
    setThirdOpen(false)
    props.history.push("/projects")
  }

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
            onClick={() => setSecondOpen(true)} 
            style={styleBtn}
          >
            Next <Icon name='right chevron' />
          </Button>
        </Modal.Actions>

        <Modal
          centered={true}
          onClose={() => setSecondOpen(false)}
          onOpen={() => setSecondOpen(true)}
          open={secondOpen}
        >
          <Modal.Header>
            <Icon name='edit' size="big" style={styleIcon}/>
            Confirm or Update Project Details
          </Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                <NewProject 
                  alternativeActions={false} 
                  name={props.archProject.name}
                  description={props.archProject.description}
                  handleRelaunch={handleRelaunch}
                  dateField={"Set a new start and due date"} 
                  titleField={"Confirm or update Title"} 
                  descriptionField={"Confirm or update Description"} 
                />
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button 
                type="Submit"
                // onClick={() => setThirdOpen(true)} 
                style={styleBtn}
              >
                Create <Icon name='right chevron' />
              </Button> 
            </Modal.Actions>
        </Modal>
      
        <Modal
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
              content='All set!'
              onClick={() => closeModals()}
              style={styleBtn}
            />
          </Modal.Actions>
        </Modal>
      </Modal>
    </>
  )
}

export default withRouter(RelaunchModals);