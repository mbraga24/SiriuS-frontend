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
  console.log("AUTO LOGIN ADMIN", adminId)
  return fetch(`http://localhost:3000/autologin/${adminId}`)
  .then(r => r.json())
}
