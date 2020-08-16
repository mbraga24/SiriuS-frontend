import React from 'react';
import { useSelector } from 'react-redux';

const Account = () => {

  const keyHolder = useSelector(state => state.app.keyHolder)  
  const { email } = keyHolder

  return (
    <>
      {/* <h1>Welcome, {first_name} {last_name} </h1> */}
      <h1>Welcome, {email} </h1>
    </>
  )
}

export default Account;