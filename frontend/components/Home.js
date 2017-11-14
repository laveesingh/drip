import React from "react";
import {Link} from "react-router-dom";

import {fetchVehicleList} from "./utils/vcards"

var $ = require("jquery");
var Cookies = require("js-cookie");

class Home extends React.Component{

  // constructor
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCityList = this.setCityList.bind(this);
    this.handleListClick = this.handleListClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.state = {
      city_list: "",
      selectedCity: "",
      selectedVehicle: "",
    };
  }

  
  // event handlers
  handleSubmit(event){
    alert("Form submitted");
    event.preventDefault();
  }

  handleChange(event){
    this.setState({value: event.target.value});
    var setCityList = this.setCityList;
    var session_token = Cookies.get("session_token");
    $.ajax({
      url: "/api/locations/",
      type: "GET",
      data: {
        "qstring": $("#location").val(),
        "session_token": session_token,
      },
      success: function(data, status, xhr){
        setCityList(data);
      },
      error: function(xhr, status, error){
        console.error(error);
      }
    });
  }

  handleListClick(event){
    var selectedCity = event.target.dataset.id;
    $("#location").val(selectedCity); // bad practice in react but it"ll do for now
    var vehicleList = fetchVehicleList(selectedCity);
    this.setState({
      city_list: "",
      selectedCity: selectedCity,
      vehicleCards: vehicleList.map((vehicle) => this.vcard(vehicle["image"], vehicle["name"], vehicle["price"], vehicle["users_learning"], vehicle["id"])),
    });
    console.log("state vehiclecards is " + this.state.vehicleCards);
  }

  handleCardClick(event){
    console.log("target: " + event.target)
    console.log("props: " + event.target.props);
    console.log(" dataset: " + event.target.dataset.vehicle);
  }


  // utility functions
  setCityList(data){
    var city_list = data["city_list"].map((city) => 
        <li onClick={this.handleListClick} key={city} data-id={city} className="city-list-item list-group-item list-group-item-success">{city}</li>
    );
    this.setState({ city_list: city_list });
  }

  vcard(img_url, vehicle_name, price, users, vehicle_id){
    const cardStyle = {
      card: {
        marginTop: "10px",
        marginBottom: "20px",
        padding: "10px",
        boxShadow: "5px 5px 5px 5px #4292f4",
      },
      img: {
        borderRadius: "10px",
        boxShadow: "5px 5px 5px 5px #4292f4",
        width: "80%",
        height: "40%",
        margin: "auto",
      }
    }
    return (
      <div className="card" style={cardStyle.card}>
        <img className="card-img-top" src={img_url} style={cardStyle.img} />
        <div className="card-block">
          <h4 className="card-title"> {vehicle_name} </h4>
          <p className="card-text"> 
            price: {price} <br />
            users: {users}
          </p>
          <Link to={"/order/"+vehicle_id} className="btn btn-primary" data-vehicle={vehicle_id} onClick={this.handleCardClick}>Details</Link>
        </div>
      </div>
    );
  }


  // final render
  render(){


    return(
        <div className="container">
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              <form method="POST" onSubmit={this.handleSubmit} onChange={this.handleChange} >
                <label type="text" htmlFor="location">Your Location</label><br />
                <input type="text" className="form-control" id="location" 
                  name="location" placeholder="enter your location" />
                <div>
                  <ul className="list-group">{this.state.city_list}</ul>
                </div>
                <input type="submit" value="List Trainers" className="btn btn-primary" />
              </form>
            </div>
            <div className="col-sm-3"></div>
          </div>
          
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              {this.state.vehicleCards}
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
    );
  }
}

export default Home;
