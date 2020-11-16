import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import { Form, Header, Icon, Divider } from 'semantic-ui-react';
import { createProject } from '../api';
import { ADD_PROJECT, ADD_ACTIVE_PROJECT, REMOVE_USER_FROM_TEMP_PROJECT, UPDATE_USER } from '../store/type';
import useFormFields from '../hooks/useFormFields';
import AddUserList from './AddUserList';
import Loading from './Loading';
import '../resources/NewProject.css';

const NewProject = (props) => {
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

    createProject(newProject)
    .then(data => {
      // update each user in the redux store
      for (let user of data.users) {
        dispatch({ type: UPDATE_USER, payload: user })  
      }
      // add new project to redux store
      dispatch({ type: ADD_PROJECT, payload: data.project })
      // remove users from temporary array in the redux store 
      dispatch({ type: REMOVE_USER_FROM_TEMP_PROJECT, payload: [] })
      props.history.push('/projects')
    })
  }

  return (
    <div id="NewProject-Container">
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
        <Form.Input fluid name="title" placeholder='Project Title' className="NewProject-Form" onChange={handleFieldChange}/>
        <Form.TextArea  name="description" placeholder='Project Description' className="NewProject-Form" style={{height: "200px"}} onChange={handleFieldChange}/>
        <Form.Field className="NewProject-User-Choice-Wrapper">
          <Header as='h2' className="NewProject-Header">
            <span>
              <Icon name='users' size="large" className="NewProject-Icon-Color"/>
              <Header.Content>
                <span className="NewProject-Title">Collaborators</span>
              </Header.Content>
            </span>
          </Header>
          {
            loadUsers ?
            <Loading loadingClass={false} />
            :
            <AddUserList userType={"newProject"} button={true}/>
          }
        </Form.Field>
      </Form>
    </div>
  );
};

export default withRouter(NewProject);