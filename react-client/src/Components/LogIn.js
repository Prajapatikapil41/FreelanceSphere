//UserDetailsForm.js
import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import { Link } from 'react-router-dom';
import '../assets/css/custom.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import Footer from './Footer'

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            user: {},
            email: '',
            password: '',
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
    }


    componentWillMount(){
        let url = 'http://localhost:8080/isLoggedIn';
        axios.get(url,{withCredentials:true})
            .then(res => {
                if (res.data.errorMsg === "") {
                    localStorage.setItem('id', res.data.id);
                    localStorage.setItem('name', res.data.name);
                    localStorage.setItem('email', res.data.email);
                    this.props.history.push('/home')
                }
                else {
                    this.props.history.push('/login')
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

        switch (fieldName) {
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
        let loginUpAPI = 'http://localhost:8080/login';
        let email = this.state.email.trim();
        let password = this.state.password;
        if (!email || !password) {
            return;
        }
        var apiPayload = { email: email, password: password };
        axios.post(loginUpAPI, apiPayload,{withCredentials:true})
            .then(res => {
                // eslint-disable-next-line
                if (res.data.errorMsg != '') {
                    this.setState({
                        errorMessage: res.data.errorMsg
                    });
                } else {
                    this.setState({
                        errorMessage: ''
                    });
                    localStorage.setItem('id', res.data.data.id);
                    localStorage.setItem('name', res.data.data.name);
                    localStorage.setItem('email', res.data.data.email);
                    this.props.history.push('/home');
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    renderRows() {
        // eslint-disable-next-line
        if (this.state.errorMessage != '') {
            return (
                <p class="text-danger" >{this.state.errorMessage}</p>
            );
        }
    }
    render() {

        return (
            <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card shadow-lg border-0 rounded-lg">
                  <div className="card-body p-5">
                    <form className="form-signin" method="POST">
                      <div className="text-center mb-4">
                        <Link className="navbar-brand fs-2 fw-bold text-primary" to="/">
                          FreelanceSphere
                        </Link>
                        <h1 className="h3 mb-3 font-weight-normal">Please Sign In</h1>
                      </div>
                      
                      <div className="mb-3">
                        <div className="">
                          <FormErrors formErrors={this.state.formErrors} />
                          {this.renderRows()}
                        </div>
                      </div>
          
                      <div className="form-floating mb-3">
                        <input 
                          type="email" 
                          name="email" 
                          className="form-control" 
                          id="floatingEmail"
                          placeholder="Email address" 
                          required="" 
                          autoFocus=""
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
          
                      <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="rememberMe" />
                        <label className="form-check-label" htmlFor="rememberMe">
                          Remember me
                        </label>
                      </div>
          
                      <div className="d-grid gap-2 mb-3">
                        <button 
                          className="btn btn-primary btn-lg" 
                          type="button"
                          disabled={!this.state.formValid}
                          onClick={this.handleSubmit.bind(this)}
                        >
                          Log in
                        </button>
                      </div>
          
                      <div className="text-center mb-3">
                        <a href="" id="forgot-password-btn" className="text-decoration-none">Forgot Password?</a>
                      </div>
          
                      <div className="text-center">
                        <span className="text-muted">
                         New To FreelanceSphere?
                          <Link to="/signup" className="text-decoration-none ms-2">Sign Up</Link>
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

export default withRouter(SignIn);