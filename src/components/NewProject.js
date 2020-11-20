import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import { Form, Header, Icon, Divider, Button, Popup } from 'semantic-ui-react';
import { RELAUNCH_TITLE, RELAUNCH_DESCRIPTION, RELAUNCH_DATERANGE, RELAUNCH_USERS_ID  } from '../store/type';
import useFormFields from '../hooks/useFormFields';
import submitForm from '../Helpers/onSubmit';
import Loading from './Loading';
import AddUserList from './AddUserList';
import '../resources/NewProject.css';

const NewProject = ( { alternativeActions = true, dateField = "Set a start and due date", titleField = "Title", descriptionField = "Description", ...props } ) => {
  const [ fields, handleFieldChange ] = useFormFields({
    title: "",
    description: ""
  })

  const dispatch = useDispatch()
  const [dateRange, setDateRange] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [propsHistory] = useState(props.history)
  const addUsersId = useSelector(state => state.activeProject.addUsersId)
  const loadUsers = useSelector(state => state.load.loadUsers) 

  const handleDateRangeChange = (name, value) => {
    if (props.match.path.split("/").includes("archive")) {
      setDateRange(value.split("-").join("/"))
      dispatch({ type: RELAUNCH_DATERANGE, payload: value.split("-").join("/") })
    } else {
      setDateRange(value.split("-").join("/"))
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
    submitForm(e, { title, description, dateRange, addUsersId, relaunchProject: false, archivedProjectId: null, propsHistory })
    props.history.push('/projects')
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
          <label>{dateField}</label>
          <DatesRangeInput
            name="datesRange"
            placeholder="From - To"
            dateFormat="MM-DD-YYYY"
            value={dateRange}
            iconPosition="left"
            animation={false}
            className="NewProject-Form-Data"
            onChange={(a, {name, value}) => handleDateRangeChange(name, value)}
          />
          <label>{titleField}</label>
          <Form.Input 
            fluid 
            name="title" 
            placeholder='"The Joe Doe Company"'
            defaultValue={ alternativeActions ? null : props.name }
            className="NewProject-Form" 
            onChange={handleFieldChange}
          />
          <label>{descriptionField}</label>
          <Form.TextArea  
            name="description" 
            placeholder='"Give a detailed description of the project and share all information that will be useful for your collaborators."' 
            defaultValue={ alternativeActions ? null : props.description }
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
              : <AddUserList userType={"newProject"} button={false}/>
            }
            </Form.Group>
            <Form.Field className="Button-Form-Action">
              <Button floated="right" type="submit" className="Button-Color">Create Project</Button>
            </Form.Field>
          </React.Fragment>
        }
      </Form>
    </div>
  );
};

export default withRouter(NewProject);