import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import { Container, Form, Header, Icon, Divider } from 'semantic-ui-react';
import useFormFields from '../hooks/useFormFields';
import AddUsersTable from './AddUsersTable';
import { createProject } from '../api';
import { ADD_PROJECT, ADD_ACTIVE_PROJECT, REMOVE_USER_FROM_TEMP_PROJECT, UPDATE_USER } from '../store/type';
import "../resources/NewProject.css";

const NewProject = (props) => {
  const [fields, handleFieldChange] = useFormFields({
    title: "",
    description: ""
  })
  const [dateRange, setDateRange] = useState("")
  const addUsersId = useSelector(state => state.activeProject.addUsersId)
  const dispatch = useDispatch()

  const handleDateRangeChange = (name, value) => {
    setDateRange(value)
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

    createProject(newProject)
    .then(data => {
      // update each user in the redux store
      for (let user of data.users) {
        dispatch({ type: UPDATE_USER, payload: user })  
      }
      // add new project to redux store
      dispatch({ type: ADD_PROJECT, payload: data.project })
      // add new active project to redux store
      dispatch({ type: ADD_ACTIVE_PROJECT, payload: data.project })
      // remove users from temporary array in the redux store 
      dispatch({ type: REMOVE_USER_FROM_TEMP_PROJECT, payload: [] })
      props.history.push('/projects')
    })
  }

  return (
    <Container id="NewProject-Container">
      <Form onSubmit={handleSubmit}>
        <Header as='h2' className="NewProject-Header-Align-Items">
          <span>
            <Icon name='puzzle' size="large" className="NewProject-Icon-Color"/>
            <Header.Content>
              <span className="NewProject-Title">Create Project</span>
            </Header.Content>
          </span>
        </Header>
        <Divider className="NewProject-Divider" />
        <Form.Group widths='equal'>
          <Form.Input fluid name="title" placeholder='Project Title' onChange={handleFieldChange}/>
        </Form.Group>
        <Form.TextArea name="description" placeholder='Project Description' onChange={handleFieldChange}/>
        <DatesRangeInput
          name="datesRange"
          placeholder="From - To"
          value={dateRange}
          iconPosition="left"
          onChange={(a, {name, value}) => handleDateRangeChange(name, value)}
        />
        <Form.Field widths='equal'>
          <Header as='h2' className="NewProject-Header">
            <span>
              <Icon name='users' size="large" className="NewProject-Icon-Color"/>
              <Header.Content>
                <span className="NewProject-Title">Collaborators</span>
              </Header.Content>
            </span>
          </Header>
          <AddUsersTable userType={"newProject"} button={true}/>
        </Form.Field>
        {/* <Button type="submit" className="NewProject-Submit-Button-Color">Create</Button> */}
      </Form>
    </Container>
  );
};

export default withRouter(NewProject);