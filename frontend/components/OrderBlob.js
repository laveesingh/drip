import React from 'react';

var $ = require("jquery");

class OrderBlob extends React.Component{
  constructor(props){
    super(props);
    this.setVehicleState = this.setVehicleState.bind(this);
    this.setTrainingCenterState = this.setTrainingCenterState.bind(this);
    this.fetchTrainingCenter = this.fetchTrainingCenter.bind(this);
    this.createInfoCard = this.createInfoCard.bind(this);
    this.setInfoCard = this.setInfoCard.bind(this);
    this.setVehicleState = this.setVehicleState.bind(this);
    this.state = {
      vehicle: {},
      training_center: "",
      infoCard: "",
      renderInitiated: false,
    };
  }

  componentWillMount(){
    var setVehicleState = this.setVehicleState;
    $.ajax({
      url: "/api/fetchers/vehicle",
      type: "GET",
      data: {
        "id": this.props["match"]["params"]["id"],
      },
      success: function(data, status, xhr){
        setVehicleState(data);
      },
      error: function(xhr, status, error){
        console.error(error);
      }
    });
  }

  setVehicleState(data){
    this.state.vehicle = $.extend(this.state.vehicle, data["vehicle"]);  // make sure it's not causing mutability problem in rendering
    this.fetchTrainingCenter();
  }

  fetchTrainingCenter(){
    var setTrainingCenterState = this.setTrainingCenterState;
    $.ajax({
      url: "/api/fetchers/training_center",
      type: "GET",
      data: {
        "id": this.state.vehicle["center"],
      },
      success: function(data, status, xhr){
        setTrainingCenterState(data);
      },
      error: function(xhr, status, error){
        console.error(error);
      }
    });
  }

  setTrainingCenterState(data){
    this.setState({
      training_center: data["training_center"],
    });
    this.setInfoCard();
  }


  setInfoCard(){
    this.setState({ 
      infoCard: this.createInfoCard(),
    });
  }
  


  createInfoCard(){
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
        <img className="img-raised card-img-top" src={this.state.vehicle["image"]} style={cardStyle.img} />
        <div className="card-block">
          <h4 className="card-title"> {this.state.vehicle["name"]} </h4>
          <p className="card-text">
            price: {this.state.vehicle["price"]} <br />
            users: {this.state.vehicle["users_learning"]}
          </p>
          <button className="btn btn-primary"> Train For This </button>
        </div>
      </div>
    );
  }

  render(){

    return (
        <div className="container">
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              {this.state.infoCard}
            </div>
            <div className="col-sm-2"></div>
          </div>
        </div>
    );
  }
}

export default OrderBlob;
