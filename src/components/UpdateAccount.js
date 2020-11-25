import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Header, Icon, Divider, Button, Message, List } from 'semantic-ui-react';
import { UPDATE_USER  } from '../store/type';
import useFormFields from '../hooks/useFormFields';
import { updateAccount } from '../api';
// import createOnSubmit from '../helpers/submitCreateForm';
// import Loading from './Loading';
// import AddUserList from './AddUserList';
import '../resources/UpdateAccount.css';

const UpdateAccount = props => {

  const dispatch = useDispatch()
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ emailAlert, setEmailAlert ] = useState(false)
  const [ disableBtn, setDisableBtn ] = useState(true)
  const [ sameEmail, setSameEmail ] = useState(true)
  const [ header, setHeader ] = useState("")
  const [ errorMsg, setErrorMsg ] = useState([])
  const keyHolder = useSelector(state => state.app.keyHolder)
  const [ fields, handleFieldChange ] = useFormFields({
    firstName: null,
    lastName: null,
    jobTitle: null,
    company: null,
    email: null,
    confirmEmail: null
  })

  useEffect(() => {
    if (fields.email === fields.confirmEmail) { 
      if (fields.firstName || fields.lastName || fields.jobTitle || fields.company) {
        setDisableBtn(false)
      } else {
        setDisableBtn(true)
      }
      setEmailAlert(false) 
    }

    if (fields.email !== fields.confirmEmail) {
      setSameEmail(false)
      setEmailAlert(true)
      setDisableBtn(true)
    }

  }, [fields.firstName, fields.lastName, fields.jobTitle, fields.company,fields.email, fields.confirmEmail]) 

  const runAlert = (header, error) => {
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

  const handleSubmit = () => {
    console.log("SUBMIT")

    const updateUserAccount = {
      firstName: fields.firstName ? fields.firstName : keyHolder.first_name,
      lastName: fields.lastName ? fields.lastName : keyHolder.last_name,
      jobTitle: fields.jobTitle ? fields.jobTitle : keyHolder.job_title,
      company: fields.company ? fields.company : keyHolder.company,
      email: fields.email ? fields.email : keyHolder.email
    }

    console.log("updateUserAccount -->", updateUserAccount)

    updateAccount(keyHolder.id ,updateUserAccount)
    .then(data => {
      console.log(data)
      if (data.error) {
        console.log("AN ERROR OCCURRED ->", data)
        const { header, error } = data
        runAlert(header, error)
      } else {
        console.log("ALL SEEM TO BE FINE ->", data)
        // const { user } = data
        dispatch({ type: UPDATE_USER, payload: data })
      }
    })
  }

  console.log("FIELDS", fields)

  return (
    <div id="UpdateAccount-Container">
      <Form onSubmit={handleSubmit}>
        <Form.Group grouped>
          <Header as='h2' className="UpdateAccount-Header-Align-Items">
            <span>
              <Icon name='settings' size="large" className="UpdateAccount-Icon-Color"/>
              <Header.Content>
                <span className="UpdateAccount-Title">Update Account</span>
              </Header.Content>
            </span>
          </Header>
          <Divider />
        </Form.Group >
        <div className="UpdateAccount-FormWrapper">
          <Form.Group widths={2}>
            <Form.Input 
              fluid
              onChange={handleFieldChange}
              name="firstName"
              className="UpdateAccount-Form" 
              label='First name' 
              placeholder='First name'
              defaultValue={fields.firstName ? fields.firstName : keyHolder.first_name}
            />
            <Form.Input 
              fluid
              onChange={handleFieldChange}
              name="lastName"
              className="UpdateAccount-Form" 
              label='Last name' 
              placeholder='Last name'
              defaultValue={fields.firstLast ? fields.firstLast : keyHolder.last_name}
              
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input 
              name="jobTitle"
              fluid
              onChange={handleFieldChange}
              className="UpdateAccount-Form" 
              label='Job Title' 
              placeholder='Job Title' 
              defaultValue={fields.jobTitle ? fields.jobTitle : keyHolder.job_title}
            />
            <Form.Input 
              name="company"
              fluid
              onChange={handleFieldChange}
              className="UpdateAccount-Form" 
              label='Company Name' 
              placeholder='Company Name' 
              defaultValue={fields.company ? fields.company : keyHolder.company}
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input 
              name="email"
              fluid
              onChange={handleFieldChange}
              className="UpdateAccount-Form" 
              label='Email' 
              placeholder='Email'
              defaultValue={fields.email ? fields.email : keyHolder.email }
              error={ emailAlert && {
                content: 'You must enter the same email',
                pointing: 'above',
              }}
            />
            <Form.Input 
              name="confirmEmail"
              fluid
              onChange={handleFieldChange}
              className="UpdateAccount-Form" 
              label='Confirm Email' 
              placeholder='Email'
              defaultValue={sameEmail ? keyHolder.email : fields.confirmEmail }
              error={emailAlert && {
                content: 'Please confirm your email',
                pointing: 'above',
              }}
            />
          </Form.Group>
          <Form.Field className="Submit-Button-Wrapper">
            <Button type="submit" className={`${disableBtn && "disabled"} UpdateAccount-Button-Color`}>Save changes</Button>
          </Form.Field>
          <Form.Group widths='equal'>
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
        </div>
      </Form>
    </div>
  );
};

export default withRouter(UpdateAccount);