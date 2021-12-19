import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService  from "../services/auth.service";
const msg = require('../config/msg.config');

const required = value => {
    if(!value) {
        return (
            <div className = "alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          {msg.MSG_PASSWORD_FORMAT_ERROR}
        </div>
      );
    }
  };

const isEqual = (value, props, components) => {
    const bothUsed = components.password[0].isUsed && components.confirm[0].isUsed;
    const bothChanged = components.password[0].isChanged && components.confirm[0].isChanged;
    
    if (bothChanged && bothUsed && components.password[0].value !== components.confirm[0].value) {
      return <div className="alert alert-danger" role="alert">{msg.MSG_PASSWORD_NO_MATCH}</div>;
    }
  };

export default class PwdChange extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.state = {
            userId : JSON.parse(localStorage.getItem("user")).id,
            password: "",
            newPassword: "",
            loading: false,
            message: "",
            completed: false
        };
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeNewPassword(e) {
        this.setState({
            newPassword: e.target.value
        })
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });
        //runs all validation functions in the form
        this.form.validateAll();

        //if all validations passed then change Pwd
        if (this.checkBtn.context._errors.length === 0) {
            AuthService.changePwd(this.state.userId, this.state.password, this.state.newPassword)
            .then( (response) => {
                this.setState({ completed: true})
            },
            // this is a reject handler for Authservice.changePwd
            error => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
      
                this.setState({
                  loading: false,
                  message: resMessage
                });
              }
            );
            //this executes if the validations fail
            } else {
                this.setState({
                    loading: false
                });
            }
        }

    render() {
        return ( 
            this.state.completed === false ? (
                <div className="col-md-12">
                    <h4>{msg.MSG_PASSWORD_CHANGE}</h4>
                    <div className="card card-container">
                        <img
                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                            alt="profile-img"
                            className="profile-img-card"
                        />

                        <Form 
                            onSubmit={this.handleLogin}
                            ref={c => {this.form = c;}}
                        >

                            <div className="form-group">
                                <label htmlFor="oldPassword">{msg.MSG_PASSWORD}</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="oldPassword"
                                    onChange={this.onChangePassword}
                                    validations={[required, vpassword]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">{msg.MSG_PASSWORD_NEW}</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    onChange={this.onChangeNewPassword}
                                    name="password"
                                    validations={[required, vpassword]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirm">{msg.MSG_PASSWORD_CONFIRM}</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="confirm"
                                    validations={[required, vpassword, isEqual]}
                                />
                            </div>

                            <div className="form-group">
                                <button
                                    className="btn btn-primary btn-block"
                                    disabled={this.state.loading}
                                >
                                    {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>{msg.MSG_ENTER}</span>
                                </button>
                            </div>

                            {this.state.message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                                </div>
                                )}
                                <CheckButton
                                    style={{ display: "none" }}
                                    ref={c => {
                                        this.checkBtn = c;
                                    }}
                                />

                        </Form>
                    </div> 
                </div>
            ) :
            (<h4>{msg.MSG_PASSWORD_CHANGE_SUCCESS}</h4>)
        );
    }
}
