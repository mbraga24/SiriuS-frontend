import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'semantic-ui-react'

const InvitationForm = () => {
  
  const keyHolder = useSelector(state => state.app.keyHolder)
  const [ radioCheck, setRadioCheck ] = useState(null)
  const [ disableField, setDisableField ] = useState(false)
  const companyFielLabel = `If user does not work at ${keyHolder.company} and is not self-employed please provide the name of the company: `

  const handleChange = (e, { value }) => {
    // console.log(typeof value)
    value === "yes" || value === "self" ? setDisableField(true) : setDisableField(false)
    setRadioCheck(value)
  }

  const handleInvitation = () => {
    console.log("send invitation")
  }

  // /send-invitation

  return (
    <Form onSubmit={handleInvitation}>
      <Form.Group widths='3'>
        <Form.Input fluid label='Email' placeholder='Email' />
      </Form.Group>
      <Form.Group widths='4'>
        <Form.Input fluid label='First name' placeholder='First name' />
        <Form.Input fluid label='Last name' placeholder='Last name' />
      </Form.Group>
      <Form.Group inline>
        <label>Collaborator also works at {keyHolder.company}</label>
        <Form.Radio
          label='Yes'
          value='yes'
          checked={radioCheck === 'yes'}
          onChange={handleChange}
        />
        <Form.Radio
          label='No'
          value='no'
          checked={radioCheck === 'no'}
          onChange={handleChange}
        />
        <Form.Radio
          label='Self-employed'
          value='self'
          checked={radioCheck === 'self'}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group widths='1'>
        <Form.Input 
          label={companyFielLabel} 
          placeholder='Company Name'
          className={disableField ? "disabled" : null} />
      </Form.Group>
      <Form.TextArea label='Write a custom invitation ' placeholder='Come join us!' />
      <Form.Checkbox label='Alert me when this user finishes signing up' />
      {/* <Form.Button>Submit</Form.Button> */}
      {/* Hello, Time to get SiriuS! You have an invitation to be a collaborator */}
    </Form>
  )
}

export default InvitationForm;