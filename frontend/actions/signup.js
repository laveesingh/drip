
export function signupUsernameChange(username){
  console.log('dispatching username change action with username:', username)
  return {
    type: 'SIGNUP_USERNAME_CHANGE',
    username: username
  }
}

export function signupPasswordChange(password){
  return {
    type: 'SIGNUP_PASSWORD_CHANGE',
    password: password
  }
}

