import React from "react";
import {
  Link,
} from 'react-router-dom';

var $ = require("jquery");
var Cookies = require("js-cookie");

class Login extends React.Component{

  // constructor
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.redirectToProfile = this.redirectToProfile.bind(this);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange(event){}
  handleSubmit(event){
    event.preventDefault();
    var csrf = Cookies.get("csrftoken");
    $.ajaxSetup({
      beforeSend: function(xhr, settings){
        xhr.setRequestHeader("X-CSRFToken", csrf);
      },
    });
    var redirectToProfile = this.redirectToProfile;
    $.ajax({
      url: "/api/login/",
      type: "POST",
      data: {
        username: this.state.username,
        password: this.state.password,
      },
      success: function(data, status, xhr){
        if(data["status"] == 0){
          Cookies.set("session_token", data["session_token"]);
          const userId = data["user_id"];
          redirectToProfile(userId);
        }
        console.log(data["message"]);
      },
      error: function(xhr, status, error){
        console.error(error);
      }
    });
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

  redirectToProfile(userId){
    var path = "/profile/" + userId;
    this.props.history.push(path);
  }

  // final render
  render(){
    //var location_object = this.props.location;
    //console.log("current location: " + location_object.pathname );
    return(
        <div className="container">
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              <form method="POST" onSubmit={this.handleSubmit} onChange={this.handleChange} >
                <label htmlFor="username">Username</label><br />
                <input type="text" className="form-control" id="username" onChange={this.handleUsernameChange}
                  name="username" placeholder="Enter your username" />
                <p>Username is{this.state.usernameIsAvailable ? "" : " not"} available</p>
                <label htmlFor="password">Password</label><br />
                <input type="password" className="form-control" id="password" onChange={this.handlePasswordChange}
                  name="password" placeholder="Enter your password" />
                <input type="submit" value="Submit" className="btn btn-primary" />
              </form>
              <p>
                Not already registered?
                {/* based on user type trainer/trainee redirect to correct signup url */}
                {/* <Link to={ ((this.props.location.pathname == "/login/") ? "/signup/" : "/trainer/signup/") } className="btn btn-primary">Signup</Link> */}
              </p>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
    );
  }
}

export default Login;
