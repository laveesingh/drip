import React from 'react';


export default class HomeForm extends React.Component{
  render(){
    return(
        <div>
            <input type="text" placeholder="some value in here" />
            <input type="submit" value="submit" />
        </div>
    );
  }
}
