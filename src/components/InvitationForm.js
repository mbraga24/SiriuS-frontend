import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'semantic-ui-react';
import useFormFields from '../hooks/useFormFields'
import '../resources/InvitationForm.css';

const InvitationForm = props => {
  
  const keyHolder = useSelector(state => state.app.keyHolder)
  const [ radioCheck, setRadioCheck ] = useState(null)
  const [ checkbox, setCheckbox ] = useState(false)
  const [ disableField, setDisableField ] = useState(false)
  const [ fields, handleFieldChange ] = useFormFields({
    email: "",
    firstName: "",
    lastName: "",
    companyName: "",
    customInvitation: "",
  })

  const companyFielLabel = `If user does not work at ${keyHolder.company} and is not self-employed please provide the name of the company: `

  const handleChange = (e, { value }) => {
    value === "yes" || value === "self" ? setDisableField(true) : setDisableField(false)
    setRadioCheck(value)
  }

  const handleInvitation = () => {
    console.log("send invitation")

    // const data = {
    //   email: fields.email,
    //   first_name: fields.firstName,
    //   last_name: fields.lastName,
    //   company: disableField ? radioCheck : fields.companyName,
    //   custom_invitation: fields.customInvitation,
    // }
    
    // fetch(`http://localhost:3000/send-invitation/`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then(r => r.json())
    // .then(invitation => {
    //   console.log(invitation)
    // })

    props.setSecondOpen(true)
  }

  // /send-invitation

  console.log("CHECKBOX -->", checkbox)
  console.log("RADIOCHECK -->", radioCheck)

  return (
    <Form onSubmit={handleInvitation}>
      <Form.Group widths='3'>
        <Form.Input fluid name="email" label='Email' placeholder='Email' onChange={handleFieldChange} />
      </Form.Group>
      <Form.Group widths='4'>
        <Form.Input fluid name="firstName" label='First name' placeholder='First name' onChange={handleFieldChange} />
        <Form.Input fluid name="lastName" label='Last name' placeholder='Last name' onChange={handleFieldChange} />
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
          name="companyName"
          label={companyFielLabel} 
          placeholder='Company Name'
          className={disableField ? "disabled" : null} 
          onChange={handleFieldChange} />
      </Form.Group>
      <Form.TextArea name="customInvitation" label='Write a custom invitation ' placeholder='Come join us!' onChange={handleFieldChange} />
      <Form.Checkbox onClick={() => setCheckbox(!checkbox)} label='Alert me when this user finishes signing up' />
      <Form.Group className="Invitation-Form-Submit-Btn-Wrapper">
        <Form.Button>Send Invitation</Form.Button>
      </Form.Group>
    </Form>
  )
}

export default InvitationForm;