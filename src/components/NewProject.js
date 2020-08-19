import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import { Container, Form } from 'semantic-ui-react';
import useFormFields from '../hooks/useFormFields';
import AddUsersTable from './AddUsersTable';
// import { getUsers } from '../api';

const NewProject = () => {

  const [fields, handleFieldChange] = useFormFields({
    title: "",
    description: ""
  })
  const [dateRange, setDateRange] = useState("")
  const keyHolder = useSelector(state => state.app.keyHolder)

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
      admin: keyHolder.id
    }
    console.log(newProject)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input fluid name="title" placeholder='Project Title' onChange={handleFieldChange}/>
        </Form.Group>
        <Form.TextArea placeholder='Project Description' onChange={handleFieldChange}/>
        <DatesRangeInput
          name="datesRange"
          placeholder="From - To"
          value={dateRange}
          iconPosition="left"
          onChange={(a, {name, value}) => handleDateRangeChange(name, value)}
        />
        <Form.Field widths='equal'>
          <AddUsersTable/>
        </Form.Field>
        <Form.Button type="submit">Submit</Form.Button>
      </Form>
    </Container>
  );
};

export default NewProject;