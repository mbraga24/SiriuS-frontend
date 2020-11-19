import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import { Form, Header, Icon, Divider, Button, Popup } from 'semantic-ui-react';
import { createProject } from '../api';
import { ADD_PROJECT, REMOVE_USER_FROM_TEMP_PROJECT, UPDATE_USER } from '../store/type';
import useFormFields from '../hooks/useFormFields';
import Loading from './Loading';
import AddUserList from './AddUserList';
import '../resources/NewProject.css';

const NewProject = ( { alternativeActions = true, dateField = "Set a start and due date", titleField = "Title", descriptionField = "Description", ...props } ) => {
  const [ fields, handleFieldChange ] = useFormFields({
    title: "",
    description: ""
  })

  const [dateRange, setDateRange] = useState("")
  const dispatch = useDispatch()
  const addUsersId = useSelector(state => state.activeProject.addUsersId)
  const loadUsers = useSelector(state => state.load.loadUsers) 


  const handleDateRangeChange = (name, value) => {
    setDateRange(value.split("-").join("/"))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const dateArray = dateRange.match(/.{1,12}/g)
    const startDate = dateArray[0].split(" ")[0]
    const dueDate = dateArray[1].split(" ")[1]

    const newProject = {
      name: fields.title,
      description: fields.description,
      startDate: startDate,
      dueDate: dueDate,
      assigned: [...addUsersId]
    }
    console.log("NEWPROJECT --->", newProject)
    createProject(newProject)
    .then(data => {
      if (data.error) {
        console.log("ERROR -->", data)
      } else {
        // update each user in the redux store
        for (let user of data.users) {
          dispatch({ type: UPDATE_USER, payload: user })  
        }
        // add new project to redux store
        dispatch({ type: ADD_PROJECT, payload: data.project })
        // remove users from temporary array in the redux store 
        dispatch({ type: REMOVE_USER_FROM_TEMP_PROJECT, payload: [] })
        props.history.push('/projects')
      }
    })
    
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
          </React.Fragment>
        }
        <Divider />
        <Form.Field className="Button-Form-Action">
          <Button floated="right" type="submit" className="Button-Color">Create Project</Button>
        </Form.Field>
      </Form>
    </div>
  );
};

export default withRouter(NewProject);