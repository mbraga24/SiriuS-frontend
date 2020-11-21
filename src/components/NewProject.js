import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import { Form, Header, Icon, Divider, Button, Popup, Message, List } from 'semantic-ui-react';
import { RELAUNCH_TITLE, RELAUNCH_DESCRIPTION, RELAUNCH_DATERANGE, RELAUNCH_USERS_ID  } from '../store/type';
import useFormFields from '../hooks/useFormFields';
import submitForm from '../Helpers/onSubmit';
import Loading from './Loading';
import AddUserList from './AddUserList';
import '../resources/NewProject.css';

const NewProject = ( { alternativeActions = true, dateFieldLabel = "Set a start and due date", titleFieldLabel = "Title", descriptionFieldLabel = "Description", ...props } ) => {
  const [ fields, handleFieldChange ] = useFormFields({
    title: alternativeActions ? "" : props.fillOutTitle,
    description: alternativeActions ? "" : props.fillOutDescription
  })

  const dispatch = useDispatch()
  const [dateRange, setDateRange] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const addUsersId = useSelector(state => state.activeProject.addUsersId)
  const loadUsers = useSelector(state => state.load.loadUsers) 
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ header, setHeader ] = useState("")
  const [ errorMsg, setErrorMsg ] = useState([])

  const runAlert = (header, error) => {
    console.log("HEADER", header)
    console.log("ERROR", error)
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

  const handleDateRangeChange = (name, value) => {
    if (props.match.path.split("/").includes("archive")) {
      setDateRange(value)
      dispatch({ type: RELAUNCH_DATERANGE, payload: value })
    } else {
      setDateRange(value)
    }
  }

  useEffect(() => {
    if (props.match.path.split("/").includes("archive")) {
      dispatch({ type: RELAUNCH_TITLE, payload: fields.title })
      dispatch({ type: RELAUNCH_DESCRIPTION, payload: fields.description })
      dispatch({ type: RELAUNCH_USERS_ID, payload: addUsersId })
    } else {
      setTitle(fields.title)
      setDescription(fields.description)
    }
  }, [fields.title, title, fields.description, description, addUsersId, dispatch, props.match.path])

  const handleSubmit = (e) => {
    // ====================================================================================================
    // pass a function to the submitForm function to run when there is an error on creating a new project
    // ====================================================================================================
    submitForm(e, { title, description, dateRange, addUsersId, relaunchProject: false, loaderStatus: null, runAlert})
    // props.history.push('/projects')
  }

  return (
    <div id="NewProject-Container">
      <Form onSubmit={handleSubmit}>
        {
          alternativeActions && 
          <Form.Group grouped>
            <Header as='h2' className="NewProject-Header-Align-Items">
              <span>
                <Icon name='puzzle' size="large" className="NewProject-Icon-Color"/>
                <Header.Content>
                  <span className="NewProject-Title">Create Project</span>
                </Header.Content>
              </span>
                <span>
                  <Popup 
                    inverted 
                    position='left center'
                    content='Find an old project in your local machine and recreate it. Feature coming soon.' 
                    trigger={<Button type="button"><Icon name="desktop"/>Search my computer</Button>} 
                  />
                </span>
            </Header>
            <Divider />
          </Form.Group>
        }
        <Form.Group grouped>   
          <label>{dateFieldLabel}</label>
          <DatesRangeInput
            name="datesRange"
            placeholder="From - To"
            dateFormat="MM-DD-YYYY"
            value={dateRange}
            iconPosition="left"
            animation="false"
            className="NewProject-Form-Data"
            onChange={(a, {name, value}) => handleDateRangeChange(name, value)}
          />
          <label>{titleFieldLabel}</label>
          <Form.Input 
            name="title" 
            placeholder='"The Joe Doe Company"'
            defaultValue={fields.title}
            className="NewProject-Form" 
            onChange={handleFieldChange}
          />
          <label>{descriptionFieldLabel}</label>
          <Form.TextArea  
            name="description" 
            placeholder='"Give a detailed description of the project and share all information that will be useful for your collaborators."' 
            defaultValue={fields.description}
            className="NewProject-Form" style={{height: "200px"}} 
            onChange={handleFieldChange}
          />
        </Form.Group>
        {
          alternativeActions &&
          <React.Fragment>
            <Form.Group grouped>
              <Form.Field className="NewProject-User-Choice-Wrapper">
                <Header as='h2' className="NewProject-Header">
                  <span>
                    <Icon name='users' size="large" className="NewProject-Icon-Color"/>
                    <Header.Content>
                      <span className="NewProject-Title">Collaborators</span>
                    </Header.Content>
                  </span>
                </Header>
              </Form.Field>
            </Form.Group>
            <Form.Group grouped>
            {
              loadUsers ?
              <Loading loadingClass={false} />
              : 
                <AddUserList userType={"newProject"} button={false}/>
            }
            </Form.Group>
            <Form.Group floated="right" grouped>
            <Form.Field className="Submit-Button-Wrapper">
              <Button type="submit" className="NewProject-Button-Color">Create Project</Button>
            </Form.Field>
            <Form.Field>
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
            </Form.Field>
          </Form.Group>
          </React.Fragment>
        }
      </Form>
    </div>
  );
};

export default withRouter(NewProject);