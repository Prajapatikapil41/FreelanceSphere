import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Footer from './Footer';
import '../assets/css/home1.css';
import '../assets/css/home2.css';
import { Link } from 'react-router-dom';
import logo from '../images/logo22.png';


class Index extends Component {


    render() {
        return (
            <div id="page-top">

    {/* <!-- Navigation --> */}
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
    <div className="container-fluid">
            <a className="navbar-brand fs-1 fw-bold" href="/">
              FreelanceSphere
            </a>
            <div className="ms-auto">
            <Link to="/signUp" className="btn btn-warning me-2 fw-semibold">
                Sign Up
              </Link>
              
              <Link to="/login" className="btn btn-outline-success me-3">
                Log In
              </Link>
            </div>
          </div>
    </nav>

    <header className="masthead">
      <div className="intro-body">
        <div className="container">
          <div className="row">
            <div className="mx-auto mr-5">
              <h1 className="main-heading" >Hire expert freelancers<br/>for any job, online</h1>
              <p className="intro-text">Millions of small businesses use Freelancer to turn their ideas into reality.</p>
              <a href="#about" className="btn btn-circle js-scroll-trigger">
                <i className="fa fa-angle-double-down animated"></i>
              </a>
            </div>
          </div>
        </div>
      </div><br/><br/><br/><br/><br/><br/><br/><br/>
      
    </header>
 

  </div>


        );
    }
}
export default withRouter(Index);