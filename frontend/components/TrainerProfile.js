import React from 'react';


class TrainerProfile extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return(
        <div className="container">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link active" href="#">Active</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
        </div>

    );
  }
}

export default TrainerProfile;
