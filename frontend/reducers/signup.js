export function signupUsernameChange(state={username:''}, action){
  if(action.type == 'SIGNUP_USERNAME_CHANGE') console.log('executing reducer with action:', action)
  switch(action.type){
    case 'SIGNUP_USERNAME_CHANGE':
      return { username: action.username }
      break
  }
  return state
}

export function signupPasswordChange(state={password:''}, action){
  switch(action.type){
    case 'SIGNUP_PASSWORD_CHANGE':
      return { password: action.password }
      break
  }
  return state
}

