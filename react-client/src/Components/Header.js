import React, { Component } from 'react';
import '../assets/css/header.css'
import '../assets/css/dropdown.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import swal from 'sweetalert2'

class Header extends Component {

  logout(e) {
    e.preventDefault();
    localStorage.clear();
    let url = 'http://localhost:8080/logout';
    localStorage.clear();
    debugger
    axios.post(url, { withCredentials: true })
      .then(res => {
        debugger
        // eslint-disable-next-line
        if (res.status == 200) {
          this.props.history.push('/');
          swal({
            type: 'success',
            title: 'Logout',
            text: 'Successfully Logged Out',
          })
        }

      })
      .catch(err => {
        console.error(err);
      });

  }

  render() {
    return (
      <div>
        <header>
          <nav className="nav dark-nav fixed-top">
            <div className="container">
              <div className="nav-heading">
                <Link className="navbar-brand fs-2 fw-bold text-primary" to="/home">
                  FreelanceSphere
                </Link>

              </div>
              <div className="menu" id="open-navbar1">
                <ul className="list">
                  <li><Link to='/home'><a className={this.props.home}>Home</a></Link ></li>
                  <li ><Link to='/dashboard'><a className={this.props.dashboard}>Dashboard</a></Link></li>
                  <li ><Link to='/myprojects'><a className={this.props.myprojects}>My Projects</a></Link></li>
                  <li>    <Link to="/postproject">  <button type="button" className="btn btn-warning btn-lg">Post Project</button></Link>
                  </li>
                  <li className="dropdown mr-2">
                    <a data-toggle="dropdown" className="dropdown-toggle"> <b className="caret">Welcome,{localStorage.getItem('name')}</b></a>
                    <h3> </h3>
                    <div className="dropdown">

                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to="/profile">Profile</Link>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#" onClick={this.logout.bind(this)}>Logout</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <br /><br /><br />
      </div>
    );
  }

}


export default withRouter(Header);
