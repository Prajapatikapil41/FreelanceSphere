import React, { Component } from 'react';
import Header from './Header'
import Footer from './Footer'
import Table from './Table'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert2'

class MyProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openProjectsAction: 'myprojectsopen',
            progressProjectsAction: '',
            openProjectstableHeaderData: ['TITLE', 'BIDS', 'AVG BID', 'BUDGET', 'STATUS'],
            workInProgressProjectstableHeaderData: ['TITLE', 'FREELANCER', 'AWARDED BID', 'DEADLINE', 'STATUS', 'PAYMENT STATUS', 'ACTION'],
            openProjectstableRowData: [],
            workInProgressProjectstableRowData: [{ title: '' }]
        };
    }
    componentWillMount() {
        let url = 'http://localhost:8080/isLoggedIn';
        axios.get(url, { withCredentials: true })
            .then(res => {
                debugger
                if (res.data.errorMsg === "") {
                    localStorage.setItem('id', res.data.data.id);
                    localStorage.setItem('name', res.data.data.name);
                    localStorage.setItem('email', res.data.data.email);
                    let getUserProjects = 'http://localhost:8080/getUserProjects';
                    let id = localStorage.getItem('id');
                    if (id) {
                        var apiPayload = {
                            id: id
                        };
                        axios.post(getUserProjects, apiPayload, { withCredentials: true })
                            .then(res => {
                                debugger;
                                // eslint-disable-next-line
                                if (res.data.errorMsg != '') {
                                    this.setState({
                                        errorMessage: res.data.errorMsg
                                    });
                                    // eslint-disable-next-line
                                } else if (res.data.successMsg != '') {
                                    this.setState({
                                        openProjectstableRowData: res.data.data[0],
                                        workInProgressProjectstableRowData: res.data.data[1],
                                    });
                                } else {
                                    this.setState({
                                        errorMessage: 'Unknown error occurred'
                                    });
                                }
                            })
                            .catch(err => {
                                console.error(err);
                            });
                    }
                }
                else {
                    this.props.history.push('/login')
                    swal({
                        type: 'error',
                        title: 'Login',
                        text: 'Login Required',
                    })

                }
            })
            .catch(err => {
                console.error(err);
            });
    }
    onBackButtonEvent(e) {
        e.preventDefault();
        this.props.history.push('/home');
    }

    componentDidMount() {
        window.onpopstate = this.onBackButtonEvent.bind(this);
    }

    render() {
        return (
            <div className='container'>
                <Header myprojects={'linkActive'} />
                <div className="content-wrapper mt-1">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="/myprojects">My Projects</a>
                        </li>
                        <li className="breadcrumb-item active">Open</li>
                    </ol>
                    <div className="row mt-1">
                        <div className="col-15">
                            <p></p>
                            <div className="col-lg-11 container">
                                <div className="">
                                    <div>
                                        <Table action={this.state.openProjectsAction} tableHeaderData={this.state.openProjectstableHeaderData} tableRowData={this.state.openProjectstableRowData} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />
                </div>

                <div className="content-wrapper mt-1">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="/myprojects">My Projects</a>
                        </li>
                        <li className="breadcrumb-item active">Work in Progress</li>
                    </ol>
                    <div className="row mt-1">
                        <div className="col-15">
                            <p></p>
                            <div className="col-11 container">
                                <div className="">
                                    <div>
                                        <Table action={this.state.progressProjectsAction} tableHeaderData={this.state.workInProgressProjectstableHeaderData} tableRowData={this.state.workInProgressProjectstableRowData} />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                {<Footer />} 
            </div>


        );
    }
}
export default withRouter(MyProjects);