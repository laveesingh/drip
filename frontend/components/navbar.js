import React from 'react';
import {
  Link
} from 'react-router-dom';

class Navbar extends React.Component{
  
  render(){
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">Drivingo</Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-success" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-success" to="/main/about/">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-success" to="/main/pricing/">Pricing</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <Link className="nav-link btn btn-outline-success" to="/login/">Login</Link> 
              {/* This link needs to be adaptive to logged users */}
            </li>
          {/*
            <li className="nav-item dropdown">
              <Link className="nav-link btn btn-outline-success" to="/signup">Signup</Link> 
               This link needs to be adaptive to logged users 
            </li>
          */}
            <li className="nav-item">
              <Link to="/trainer/login/" className="nav-link btn btn-outline-success">
                Trainer Section
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;
