import React from 'react';

import {
  NavLink,
  Link
} from "react-router-dom";

var $ = require("jquery");
var Cookies = require("js-cookie");

class Profile extends React.Component{
  constructor(props){
    super(props);
    this.setProfileObj = this.setProfileObj.bind(this);
    this.setProfileComp = this.setProfileComp.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.handleTrainingClick = this.handleTrainingClick.bind(this);
    this.handleArchiveClick = this.handleArchiveClick.bind(this);
    this.setTrainingComp = this.setTrainingComp.bind(this);
    this.setArchiveComp = this.setArchiveComp.bind(this);
    this.setUserId = this.setUserId.bind(this);
    this.initialInvokation = this.initialInvokation.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.setLogoutComp = this.setLogoutComp.bind(this);
    this.state = {
      profileObj: {},
      profileComp: "",
      trainingComp: "",
      archiveComp: "",
      mainComp: "",
      userId: "",
    }
  }

  componentWillMount(){
    // find out user for the request
    var session_token = Cookies.get("session_token");
    var setUserId = this.setUserId;
    $.ajax({
      url: "/api/auth_session/",
      type: "GET",
      data: {
        session_token: session_token,
      },
      success: function(data, status, xhr){
        if(data["status"] == 0){
          console.log("username: " + data["username"] + " userid: " + data["userid"] + " is logged in.");
          setUserId(data["userid"]);
        }else{
          console.log("Not a valid custom user");
        }
      },
      error: function(xhr, status, error){
        console.error(error);
      },

    });
  }

  setUserId(userId){
    this.setState({
      userId: userId,
    });
    this.initialInvokation();
  }

  initialInvokation(){
    this.handleTrainingClick(); // first click isn't working, I don't understand why
    this.handleArchiveClick(); // first click isn't working, I don't understand why
    this.handleProfileClick(); // first click works
  }


  handleProfileClick(){
    if(!this.state.profileComp){
      this.fetchProfileObj();
    }else{
      console.log("profileComp is already set");
      this.setState({
        mainComp: this.state.profileComp,
      });
    }

  }

  fetchProfileObj(){ // getting profile object from server with given custom user id
    var setProfileObj = this.setProfileObj;
    console.log("Going to fetch profileObj for id: " + this.state.userId);
    $.ajax({
      url: "/api/fetchers/custom_user",
      type: "GET",
      data: {
        //id: this.props["match"]["params"]["id"],
        id: this.state.userId,
      },
      success: function(data, status, xhr){
        setProfileObj(data["custom_user"]);
      },
      error: function(xhr, status, error){
        console.error(error);
      }
    });
  }

  setProfileObj(data){
    this.setState({
      profileObj: $.extend(this.state.profileObj, data),
    });
    this.setProfileComp();
  }

  setProfileComp(){
    this.setState({
      profileComp: this.createProfileCard(),
    });
    this.setState({
      mainComp: this.state.profileComp,
    });
  }

  createProfileCard(){
    const cardStyle = {
      cardStyle: {
        height: "700px",
      },
      imageStyle: {
        height: "30%",
        width: "70%",
        margin: "auto",
      },
    }
    return (
      <div className="card" style={cardStyle.cardStyle}>
        <img className="card-img-top" src={this.state.profileObj["avatar"]} style={cardStyle.imageStyle} />
        <div className="card-block">
          <div className="card-title">
            <ul className="list-inline">
              <li className="list-inline-item">
                <span>{this.state.profileObj["user"]["username"]}</span>
              </li>
              <li className="list-inline-item">
                <Link to="/profile/edit/" className="btn btn-warning">Edit Profile</Link>
              </li>
              <li className="list-inline-item">
                <Link to="/profile/logout/" className="btn btn-warning" onClick={this.handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
          <div className="card-text">
            <ul className="list-group">
              <li className="list-group-item">First Name: {this.state.profileObj["user"]["first_name"]}</li>
              <li className="list-group-item">Last Name: {this.state.profileObj["user"]["last_name"]}</li>
              <li className="list-group-item">Email: {this.state.profileObj["user"]["email"]}</li>
              <li className="list-group-item"> something</li>
            </ul>
          </div>
          <Link to="/" className="card-link btn btn-primary">Home</Link>
        </div>
      </div>
    );
  }

  handleTrainingClick(){
    this.setState({
      trainingComp: "This is training details section",
    });
    this.setTrainingComp();
  }

  setTrainingComp(){
    this.setState({
      mainComp: this.state.trainingComp,
    });
  }

  handleArchiveClick(){
    this.setState({
      archiveComp: "This is archive detials section",
    });
    this.setArchiveComp();
  }

  setArchiveComp(){
    this.setState({
      mainComp: this.state.archiveComp,
    });
  }

  handleLogout(){
    Cookies.remove("session_token");
    this.setState({
      profileObj: null,
      userId: null,
      mainComp: this.setLogoutComp(),
    });
  }

  setLogoutComp(){
    return (
        <Link to="/login/" className="btn btn-primary">Go Back</Link>
      );
  }

  render(){
    const profileStyle = {
      containerStyle: {
        padding: "10px",
      },
      navStyle: {
        backgroundColor: "#63fff7",
      },
      navItemStyle: {
        marginRight: "5px",
      }
    }
    return(
        <div className="container" style={profileStyle.containerStyle}>
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              <ul className="nav nav-pills nav-fill" style={profileStyle.navStyle}>
                <li style={profileStyle.navItemStyle} className="nav-item">
                  <button className="nav-link  btn-primary" to="/" onClick={this.handleProfileClick}>Profile</button>
                </li>
                <li style={profileStyle.navItemStyle} className="nav-item">
                  <button className="nav-link  btn-primary" to="/" onClick={this.handleTrainingClick}>Training</button>
                </li>
                <li style={profileStyle.navItemStyle} className="nav-item">
                  <button className="nav-link  btn-primary" to="/" onClick={this.handleArchiveClick}>Archive</button>
                </li>
              </ul>
              <div id="main-div">
                {this.state.mainComp}
              </div>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
    );
  }
}

export default Profile;
