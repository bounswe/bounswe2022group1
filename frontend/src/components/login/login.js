import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClick = (e) => {
    fetch("http://3.89.218.253:8000/app/change-password/", {
      method: "PUT",
      body: JSON.stringify({
        email: this.state.email,
      }),
    })
      .then((response) => {
        console.log(response);
        response.json();
      })
      .then((response) => {
        console.log(response);
        alert(response);
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };
  handleChange(changeObject) {
    this.setState(changeObject);
  }

  handleSubmit(event) {
    console.log("username: " + this.state.username);
    console.log("password: " + this.state.password);
    fetch("http://3.89.218.253:8000/app/login/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign In</h3>
        <div className="username">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            onChange={(e) => this.handleChange({ username: e.target.value })}
          />
        </div>
        <div className="password">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.handleChange({ password: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot{" "}
          <a href="/" onClick={this.handleClick}>
            password?
          </a>
        </p>
      </form>
    );
  }
}
