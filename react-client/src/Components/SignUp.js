import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import { Link } from 'react-router-dom';
import '../assets/css/custom.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import swal from 'sweetalert2'

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      formErrors: { name: '', email: '', password: '' },
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  componentWillMount() {
    let url = 'http://localhost:3001/isLoggedIn';
    axios.get(url, { withCredentials: true })
      .then(res => {

        if (res.data.responseCode === 0) {
          localStorage.setItem('id', res.data.id);
          localStorage.setItem('name', res.data.name);
          localStorage.setItem('email', res.data.email);
          this.props.history.push('/home')
        }
        else {
          this.props.history.push('/signup')
        }
      })
      .catch(err => {
        console.error(err);
      });

  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let nameValid = this.state.nameValid;

    switch (fieldName) {
      case 'name':
        nameValid = value.length > 0;;
        fieldValidationErrors.name = nameValid ? '' : ' is required';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }
  handleSubmit() {
    let signUpAPI = 'http://localhost:8080/signup';
    //alert("abc");
    let name = this.state.name.trim();
    let email = this.state.email.trim();
    let password = this.state.password;
    if (!name || !email || !password) {
      return;
    }
    var apiPayload = { name: name, email: email, password: password };
    axios.post(signUpAPI, apiPayload, { withCredentials: true })
      .then(res => {
        // eslint-disable-next-line
        if (res.data.errorMsg != '') {
          swal({
            type: 'error',
            title: 'Sign Up',
            text: res.data.errorMsg,
          })
        } else {
          debugger
          localStorage.setItem('id', res.data.data.id);
          localStorage.setItem('name', res.data.data.name);
          localStorage.setItem('email', res.data.data.email);
          this.props.history.push('/home');
          swal({
            type: 'success',
            title: 'Sign Up',
            text: "Signup Success",
          })

        }
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="card-body p-5">
                <form method="POST" className="form-signup">
                  <div className="text-center mb-4">
                    <Link className="navbar-brand fs-2 fw-bold text-primary" to="/">
                      FreelanceSphere
                    </Link>
                    <h2 className="h3 mb-3 font-weight-normal">Please Sign Up</h2>
                  </div>
                  <div className="mb-3">
                    <div className="">
                      <FormErrors formErrors={this.state.formErrors} />
                    </div>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="floatingName"
                      placeholder="Name"
                      required=""
                      value={this.state.name}
                      onChange={this.handleUserInput}
                    />
                    <label htmlFor="floatingName">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="floatingEmail"
                      placeholder="Email address"
                      required=""
                      value={this.state.email}
                      onChange={this.handleUserInput}
                    />
                    <label htmlFor="floatingEmail">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      required=""
                      value={this.state.password}
                      onChange={this.handleUserInput}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-lg text-uppercase fw-bold"
                      type="button"
                      disabled={!this.state.formValid}
                      onClick={this.handleSubmit.bind(this)}
                    >
                      Create Account
                    </button>
                  </div>
                  <div className="text-center mt-4">
                    <span className="text-muted">
                      Already a FreelanceSphere.com member?
                      <Link to="/login" className="text-decoration-none ms-1">Log In</Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(SignUp);