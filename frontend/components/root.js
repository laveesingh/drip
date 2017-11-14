import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import {
  createBrowserHistory
} from 'history';

import Home from 'components/Home';
import Login from 'components/Login';
import Signup from 'components/Signup';
import Navbar from 'components/navbar';
import OrderBlob from 'components/OrderBlob';
import Profile from 'components/Profile';
import TrainerProfile from 'components/TrainerProfile';
import ProfileEdit from 'components/ProfileEdit';

const history = createBrowserHistory();

class Root extends Component{
  render(){
    return(
        <Router history={history}>
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
            {/* id param above is vehicle id for order */}
            <Route path='/profile/edit/' component={ProfileEdit} />  
          </div>
        </Router>
    );
  }
}

export default Root;
