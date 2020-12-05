export const availableUsers = dataUsers => {
  console.log("availableUsers", dataUsers)
  return dataUsers.filter(user => user.available)
}

export const fullName = (firstName, lastName) => {
  return `${firstName} ${lastName}`
}
