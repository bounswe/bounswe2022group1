import React, { Component } from "react";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { email: " "};
    this.errors = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(changeObject) {
    this.setState(changeObject);
  }

  handleSubmit(e) {
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
        //alert(response);
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  }

  validate (values) {
    this.errors = {};
    if(!this.state.email){
      this.errors.email = "Email is required.";
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Forgot Password</h3>
        <div className="email">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.handleChange({ email: e.target.value })}
          />
        </div>

        {this.setErrors=this.validate(this.state)}

        <p>{ this.errors.email }</p>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Forgot Password
          </button>
        </div>
      </form>
    );
  }
}
