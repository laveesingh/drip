import { combineReducers } from 'redux'
import {
  signupUsernameChange, signupPasswordChange
} from './signup'

export default combineReducers({
  signupUsernameChange,
  signupPasswordChange
})
