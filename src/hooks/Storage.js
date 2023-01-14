export const setUserKey = (data) => {

  localStorage.setItem("user", data)
  return true
}

export const getUserKey = () => {

  return (
    localStorage.getItem("user")
  )

}

export const eraseUserKey = () => {

  return (
    localStorage.setItem("user", "")
  )

}

export const setItem = (key, value) => {

  return (
    localStorage.setItem(key, value)
  )

}

export const getItem = (key) => {

  return (
    localStorage.getItem(key)
  )

}

export const Storage = {
  setUserKey: setUserKey,
  getUserKey: getUserKey,
  eraseUserKey: eraseUserKey,
  setItem: setItem,
  getItem: getItem
}