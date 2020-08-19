// login Admin
export const getAdmin = (data) => {
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
export const createAdmin = (data) => {
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
export const isLoggedIn = (adminId) => {
  return fetch(`http://localhost:3000/autologin/${adminId}`)
  .then(r => r.json())
}

// get all users
export const getUsers = () => {
  // console.log("FETCH USERS")
  return fetch(`http://localhost:3000/users/`)
  .then(r => r.json())
}

// export const updateUser = (data) => {
//   console.log("UPDATE USER", data)
//   return fetch(`http://localhost:3000/users/${data.id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     body: JSON.stringify(data)
//   })
//   .then(r => r.json())
// }

// get all projects
export const getProjects = () => {
  return fetch(`http://localhost:3000/projects/`)
  .then(r => r.json())
}

// create new project
export const createProject = (data) => {
  console.log("CREATE PROJECT", data)
  return fetch(`http://localhost:3000/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(r => r.json())
}