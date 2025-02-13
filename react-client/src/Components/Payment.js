import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2';
import PaymentForm from './PaymentForm';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }

    componentDidMount() {
        let url = 'http://localhost:8080/isLoggedIn';
        axios.get(url, { withCredentials: true })
            .then(res => {
                if (res.data.errorMsg === "") {
                    localStorage.setItem('id', res.data.data.id);
                    localStorage.setItem('name', res.data.data.name);
                    localStorage.setItem('email', res.data.data.email);
                    this.setState({ isAuthenticated: true });
                } else {
                    this.props.history.push('/login');
                    swal.fire({
                        icon: 'error',
                        title: 'Login',
                        text: 'Login Required',
                    });
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        // Extract projectId from URL
        const { projectId } = this.props.match.params;

        return (
            <div className="container">
                <Header />
                <div className="content-wrapper mt-1">
                    <div className="container-fluid">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/">Payment</a>
                            </li>
                            <li className="breadcrumb-item active">Proceed to Payment</li>
                        </ol>
                        <div className="row mt-1 ml-3">
                            <div className="col-12">
                                <div className="col-lg-10">
                                    <div className="panel panel-default">
                                        <div>
                                            {/* Pass projectId to PaymentForm */}
                                            <PaymentForm projectId={projectId} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(Profile);
