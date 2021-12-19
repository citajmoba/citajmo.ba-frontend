import React, { Component } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AuthService from "../services/auth.service";
import PwdChange from "./pwd-change.component.js";
const msg = require("../config/msg.config");

export default class Profile extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        currentUser: AuthService.getCurrentUser(),
        menuSelection: "profile"
      };
      this.onToggleButtonChange = this.onToggleButtonChange.bind(this);
      this.displayMenuItem = this.displayMenuItem.bind(this);
    }

    onToggleButtonChange = (event, newValue) => {
      if (newValue !== null) {
        this.setState({menuSelection: newValue});
      };
    }
  
    displayMenuItem (){
      const { currentUser } = this.state;
      let Output; // save the rendered JSX to return
  
      // eslint-disable-next-line default-case
      switch ( this.state.menuSelection ) {
  
        // render Type1 with props
        case "profile":
          Output = (
          <div className="container">
            <header className="jumbotron">
              <h3>
                {msg.MSG_USER}: <strong>{currentUser.username}</strong>
              </h3>
            </header>
            <p>
              <strong>Token:</strong>{" "}
              {currentUser.accessToken.substring(0, 20)} ...{" "}
              {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
            <p>
              <strong>Id:</strong>{" "}
              {currentUser.id}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
          </div>);
          break;

        case "personalInfo":  
          Output = (
            <div>
              {msg.MSG_WORK_IN_PROGRESS}
            </div>          
          );
          break;
  
        case "pwdChange":
          Output = (
            <div>
              <PwdChange />
            </div>          
          );
          break;
      };
  
      return Output; 

    }
  
    render() {
  
      return (
        <div className="contributor-menu">
          <ToggleButtonGroup
            color="primary"
            size="large"
            value={this.state.menuSelection}
            exclusive
            onChange={this.onToggleButtonChange}
          >
            <ToggleButton value="profile">{msg.MSG_PROFILE}</ToggleButton>
            <ToggleButton value="personalInfo">{msg.MSG_PERSONAL_INFO}</ToggleButton>
            <ToggleButton value="pwdChange">{msg.MSG_PASSWORD_CHANGE}</ToggleButton>
          </ToggleButtonGroup>

          <this.displayMenuItem />
         </div>
      );
    }
  }