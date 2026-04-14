const nameValidator = (name, type) => {
  if (!name || name.length <= 0) return `${type} Name cannot be empty.`

  return ""
}

const emailValidator = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!email || email.length <= 0) return "Email cannot be empty."
  if (!re.test(email)) return "Ooops! We need a valid email address."

  return ""
}

const passwordValidator = (password) => {
  if (!password || password.length <= 0) return "Password cannot be empty."
  if (password.length < 8) return "Password must be minimum 8 characters."
  return ""
}
const repeatPasswordValidator = (password, repeatPassword) => {
  if (!repeatPassword || repeatPassword.length <= 0) return "Confirm password cannot be empty."
  if (password !== repeatPassword) return "Please make sure your passwords match."
  return ""
}

const stringValidator = (name, type) => {
  if (!name || name.length === 0) return `${type} cannot be empty.`
  if (/\s/.test(name)) return `${type} cannot contain spaces.`
  return ""
}

export default {
  nameValidator,
  emailValidator,
  passwordValidator,
  repeatPasswordValidator,
  stringValidator,
}
