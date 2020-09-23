// login Admin
export const loginUser = data => {
  // console.log("LOGIN ADMIN", data)
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
  // console.log("CREATE ADMIN", data)
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
  // console.log("FETCH USERS")
  return fetch(`http://localhost:3000/users/`)
  .then(r => r.json())
}

// get all projects
export const getProjects = () => {
  return fetch(`http://localhost:3000/projects/`)
  .then(r => r.json())
}

// create new project
export const createProject = data => {
  // console.log("CREATE PROJECT", data)
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
    // body: JSON.stringify({  })
  })
  .then(r => r.json())
}

// clear all complete projects
export const clearProjectList = () => {
  return fetch(`http://localhost:3000//projects/clear`, {
    method: "DELETE"
  })
}