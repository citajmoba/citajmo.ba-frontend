import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
//import Home from "./components/home.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import BoardContributor from "./components/board-contributor.component";

const msg = require("./config/msg.config");

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showMContributorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log(user);
    if (user) {
      this.setState( (prevState) => ({
        currentUser: user,
        showContributorBoard: user.roles.includes("ROLE_CONTRIBUTOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      }));
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showContributorBoard, showAdminBoard } = this.state;
    return (
      <div>
      
        <header className="header-homepage">

          <ul className="ul-homepage">
            <li className="li-homepage">
              <Link to={"/home"} className="nav-item">
                {msg.MSG_HOME}
              </Link>
            </li>

            {showContributorBoard && (
              <li className="li-homepage">
                <Link to={"/contributor"} className="nav-item">
                  {msg.MSG_CONTRIBUTOR_BOARD}
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="li-homepage">
                <Link to={"/admin"} className="nav-item">
                  {msg.MSG_ADMIN_BOARD}
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="li-homepage">
                <Link to={"/user"} className="nav-item">
                  {msg.MSG_USER}
                </Link>
              </li>
            )}
          </ul>

          {currentUser ? (
            <ul className="ul-homepage">
              <li className="li-homepage">
                <Link to={"/profile"} className="nav-item">
                  {currentUser.username}
                </Link>
              </li>
              <li className="li-homepage">
                <a href="/" className="nav-item" onClick={this.logOut}>
                  {msg.MSG_LOGOUT}
                </a>
              </li>
            </ul>
          ) : (
            <ul className="ul-homepage">
              <li className="li-homepage">
                <Link to={"/login"} className="nav-item">
                  {msg.MSG_LOGIN}
                </Link>
              </li>

              <li className="li-homepage">
                <Link to={"/register"} className="nav-item">
                  {msg.MSG_SIGNUP}
                </Link>
              </li>
            </ul>
          )}
        </header>
        <div className="body-homepage">
        <div className="container-md mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/contributor" component={BoardContributor} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
