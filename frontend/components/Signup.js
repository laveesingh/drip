import React from 'react';
import {Link} from 'react-router-dom';

var $ = require("jquery");
var Cookies = require('js-cookie');

class Signup extends React.Component{

  // constructor
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordConfChange = this.handlePasswordConfChange.bind(this);
    this.state = {
      username: '',
      password: '',
      passwordConf: '',
      email: '',
      usernameIsAvailable: false,
      emailIsOkay: false,
      passwordIsOkay: false,
      passwordConfIsOkay: false,
    };
  }

  handleChange(event){}
  handleSubmit(event){
    var csrf = Cookies.get('csrftoken');
    $.ajaxSetup({
      beforeSend: function(xhr, settings){
        xhr.setRequestHeader("X-CSRFToken", csrf);
      },
    });
    $.ajax({
      url: "/api/signup/",
      type: "POST",
      data: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      },
      success: function(data, status, xhr){
        console.log(data['message']);
      },
      error: function(xhr, status, error){
        console.error(error);
      }
    });
    event.preventDefault();
  }
  handleUsernameChange(event){
    this.setState({
      username: event.target.value,
    });
  }
  handlePasswordChange(event){
    this.setState({
      password: event.target.value,
    });
  }
  handleEmailChange(event){
    this.setState({
      email: event.target.value,
    });
  }
  handlePasswordConfChange(event){
    this.setState({
      passwordConf: event.target.value,
    });
  }

  // final render
  render(){
    return(
        <div className="container">
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              <form method='POST' onSubmit={this.handleSubmit} onChange={this.handleChange} >
                <label htmlFor="username">Username</label><br />
                <input type="text" className="form-control" id="username" onChange={this.handleUsernameChange}
                  name="username" placeholder="Enter your username" />
                  {/*<p>Username is{this.state.usernameIsAvailable ? "" : " not"} available</p>*/}
                <label htmlFor="password">Password</label><br />
                <input type="password" className="form-control" id="password" onChange={this.handlePasswordChange}
                  name="password" placeholder="Enter your password" />
                <label htmlFor="passwordConf">Confirm Password</label><br />
                <input type="password" className="form-control" id="passwordConf" onChange={this.handlePasswordConfChange}
                  name="passwordConf" placeholder="Enter your password again" />
                <label htmlFor="email">Email</label><br />
                <input type="email" className="form-control" id="email" onChange={this.handleEmailChange}
                  name="email" placeholder="Enter your email" />
                <input type="submit" value="Submit" className="btn btn-primary" />
              </form>
              <p>
                Already have an account?
                <Link to="/login/" className="btn btn-primary">Login</Link>
              </p>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
    );
  }
}

export default Signup;
