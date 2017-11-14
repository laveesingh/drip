import React from "react";
import {Link} from "react-router-dom";

var $ = require("jquery");

var retVehicleList;
export function fetchVehicleList(city){
    $.ajax({
      url: "/api/vehicles/",
      type: "GET",
      async: false, // with async call, variable returns undefined without waiting for the value
      data: {
        "location": city,
      },
      success: function(data, status, xhr){
        retVehicleList = data["vehicles"];
      },
      error: function(data, status, error){
        console.error(error);
      },
    });
    return retVehicleList;
}

