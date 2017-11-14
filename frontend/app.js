import React from 'react'
import {
  BrowserRouter,
  hashHistory,
  Link,
  Route,
  Switch
} from 'react-router-dom'

import Home from './components/Home';
import Login from './components/Login';
//import Signup from './components/Signup';
import Signup from './components/signup';

import Navbar from './components/header';
import OrderBlob from './components/OrderBlob';
import Profile from './components/Profile';
import TrainerProfile from './components/TrainerProfile';
import ProfileEdit from './components/ProfileEdit';


class App extends React.Component{
  render(){
    return(
        <BrowserRouter history={hashHistory}>
          <div>
            <Navbar />
            <Route exact path='/' component={Home} />
            <Route path='/login/' component={Login}  />
            <Route path='/signup/' component={Signup} />
            <Route path='/profile/' component={Profile} />
            <Route path='/trainer/login/' component={Login} />
            <Route path='/trainer/signup/' component={Signup} />
            <Route path='/trainer/profile/:id' component={TrainerProfile} />
            <Route path='/order/:id' component={OrderBlob} />  
            <Route path='/profile/edit/' component={ProfileEdit} />  
          </div>
        </BrowserRouter>
    );
  }
}

export default App
