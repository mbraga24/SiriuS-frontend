// login Admin
export const loginUser = data => {
  return fetch(`http://localhost:3000/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(r => r.json())
}

// create new admin
export const createUser = data => {
  return fetch(`http://localhost:3000/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(r => r.json())
}

// admin autologin 
export const isLoggedIn = adminId => {
  return fetch(`http://localhost:3000/autologin/${adminId}`)
  .then(r => r.json())
}

// get all users
export const getUsers = () => {
  return fetch(`http://localhost:3000/users/`)
  .then(r => r.json())
}

// delete user
export const deleteUser = userId => {
  return fetch(`http://localhost:3000//users/${userId}`, {
    method: "DELETE"
  })
  .then(r => r.json())
}

// get all projects
export const getProjects = () => {
  return fetch(`http://localhost:3000/projects/`)
  .then(r => r.json())
}

// create new project
export const createProject = data => {
  return fetch(`http://localhost:3000/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(r => r.json())
}

// complete project
export const completeProject = projectId => {
  return fetch(`http://localhost:3000//project/complete/${projectId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(r => r.json())
}

// clear all complete projects
export const clearProjectList = () => {
  return fetch(`http://localhost:3000/projects/clear`, {
    method: "DELETE"
  })
  .then(r => r.json())
}