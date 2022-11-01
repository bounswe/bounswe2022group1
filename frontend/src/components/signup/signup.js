import React, { Component } from "react";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", email: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(changeObject) {
    this.setState(changeObject);
  }

  handleSubmit(event) {
    console.log("username: " + this.state.username);
    console.log("password: " + this.state.password);
    fetch("http://3.89.218.253:8000/app/register/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          alert("Failed with status code " + response.status);
        }
      })
      .then((response) => {
        console.log(response);
        alert(" Success " + response.token);
      })
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
  }

  handleChange(changeObject) {
    this.setState(changeObject);
  }

  validate (values) {
    this.errors = {};
    if(!this.state.username){
      this.errors.username = "Username is required.";
    }
    if(!this.state.password){
      this.errors.password = "Password is required.";
    }
    if(!this.state.email){
      this.errors.email = "Email is required.";
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Username</label>
          <input type="text" 
          className="form-control" 
          placeholder="Username" 
          onChange={(e) => this.handleChange({ username: e.target.value })}
          />
        </div>

        {this.setErrors=this.validate(this.state)}

        <p>{ this.errors.username }</p>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.handleChange({ email: e.target.value })}
          />
        </div>
        <p>{ this.errors.email }</p>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.handleChange({ password: e.target.value })}
          />
        </div>
        <p>{ this.errors.password }</p>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    );
  }
}
