import React from 'react';

export class TextInput extends React.Component{
  render(){
    return (
        <div>
          <label htmlFor='locations'>locations</label>
          <input type="text" name='locations' id='locations' />
        </div>
    );
  }
}

