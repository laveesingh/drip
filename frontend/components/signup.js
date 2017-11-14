import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import '../style/signup.css'
import { $SERVER } from '../utils/config'


import {
  signupUsernameChange,
  signupPasswordChange
} from '../actions/signup'


class Signup extends React.Component{

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(username, password){
    axios.post($SERVER+'/signup/', {
      username: username,
      password: password
    }).then(function(response){
      console.log('response from server:', response.data)
    })
    console.log('sending request with username:', username, 'password:', password)
  }

  render(){
    return (
      <Grid container id='page'>
        <Grid item lg={3}></Grid>
        <Grid item lg={6} id='form-area'>
          <Grid container>
            <Grid item lg={12}>
              <Typography component='h2' type='headline'>
                Signup
              </Typography>
              <TextField id='username' label='Username' value={this.props.username} onChange={this.props.handleUsernameChange} margin='normal' autoFocus fullWidth className='form-fields' />
            </Grid>
            <Grid item lg={12}>
              <TextField id='password' label='Password' value={this.props.password} onChange={this.props.handlePasswordChange} margin='normal' fullWidth className='form-fields' />
            </Grid>
            <Grid item lg={12}>
              <Button raised onClick={ (event) => this.handleSubmit(this.props.username, this.props.password) } color='primary' id='submit-btn '>Submit</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={3}></Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.signupUsernameChange.username,
    password: state.signupPasswordChange.password
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleUsernameChange: (event) => dispatch(signupUsernameChange(event.target.value)),
    handlePasswordChange: (event) => dispatch(signupPasswordChange(event.target.value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
