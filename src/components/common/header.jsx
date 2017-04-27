import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import autoBind from 'react-autobind';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
    autoBind(this, 'handleClose', 'handleToggle');
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <AppBar
          title="Sample BMW"
          style={{ backgroundColor: '#048989', color: 'white' }}
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
        <img alt="" src="images/logo.png" />
        <ui>
          <li><a href="/#">Home</a></li>
          <li><a href="/#about">About</a></li>
        </ui>
      </div>
    );
  }
}
