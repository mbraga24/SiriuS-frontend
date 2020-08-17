export const getAdmin = (data) => {
  console.log("LOGIN ADMIN", data)
  return fetch(`http://localhost:3000/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(r => r.json())
}

export const createAdmin = (data) => {
  console.log("CREATE ADMIN", data)
  return fetch(`http://localhost:3000/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(r => r.json())
}

export const isLoggedIn = (adminId) => {
  return fetch(`http://localhost:3000/autologin/${adminId}`)
  .then(r => r.json())
}

export const getProjects = () => {
  return fetch(`http://localhost:3000/projects/`)
  .then(r => r.json())
}

export const getUsers = () => {
  console.log("FETCH USERS")
  return fetch(`http://localhost:3000/users/`)
  .then(r => r.json())
}