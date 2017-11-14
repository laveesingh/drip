import React from 'react'
import { Link } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import List, { ListItem } from 'material-ui/List'
import '../style/header.css'


export default class Navbar extends React.Component{
  render(){
    return(
      <AppBar position='static'>
        <Toolbar>
          <IconButton color='contrast' aria-label='Menu'>
            <MenuIcon />
          </IconButton>
          <Typography type='title' color='inherit'>
            Drivingo
          </Typography>
          <List id='nav-list'>
            <ListItem button>
              <Link to='/signup'>Signup</Link>
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
    )
  }
}
