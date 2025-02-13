import React, { Component } from 'react';
import Header from './Header'
import Footer from './Footer'
import Table from './Table'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert2'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: 'dashboard',
            tableHeaderData: ['Title', 'Employer', 'Avg Bid', 'My Bid', 'Status'],
            tableRowData: [],
            workInProgressProjectstableAction: 'myprojectsprogress',
            workInProgressProjectstableHeaderData: ['Title', 'Employer', 'Awarded Bid', 'Deadline', 'Status','Payment Status','Action'],
            workInProgressProjectstableRowData: []
        };
    } 
    componentWillMount() {

        let url = 'http://localhost:8080/isLoggedIn';
        axios.get(url,{withCredentials: true})
            .then(res => {
                debugger
                
                if (res.data.errorMsg === "") {
                    localStorage.setItem('id', res.data.data.id);
                    localStorage.setItem('name', res.data.data.name);
                    localStorage.setItem('email', res.data.data.email);
                    let getUserBidProjects = 'http://localhost:8080/getUserBidProjects';
                    let id = localStorage.getItem('id');
                    if (id) {
                        var apiPayload = {
                            id: id
                        };
                        axios.post(getUserBidProjects, apiPayload,{withCredentials: true})
                            .then(res => {
                                // eslint-disable-next-line
                                if (res.data.errorMsg != '') {
                                    this.setState({
                                        errorMessage: res.data.errorMsg
                                    });
                                    // eslint-disable-next-line
                                } else if (res.data.successMsg != '') {
                                    this.setState({
                                        tableRowData: res.data.data[0],
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
                <Header dashboard={'linkActive'}/>
                <div className="content-wrapper mt-1">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="/dashboard">Dashboard</a>
                        </li>
                        <li className="breadcrumb-item active">My Bids</li>
                    </ol>
                    <div className="row mt-1">
                        <div className="col-12">
                           
                            <div className="col-lg-12 container">
                                <div className="">
                                    <div>
                                        <Table action={this.state.action} tableHeaderData={this.state.tableHeaderData} averageBid={this.state.averageBid} tableRowData={this.state.tableRowData} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
<br/>
                   <div className="content-wrapper mt-1">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="/myprojects">Dashboard</a>
                        </li>
                        <li className="breadcrumb-item active">Delivery in progress</li>
                    </ol>
                    <div className="row mt-1">
                        <div className="col-12">
                            <p></p>
                            <div className="col-lg-11 container">
                                <div className="">
                                    <div>
                                        <Table 
                                         action={this.state.workInProgressProjectstableAction}
                                         tableHeaderData={this.state.workInProgressProjectstableHeaderData} 
                                         tableRowData={this.state.workInProgressProjectstableRowData} />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                    {<Footer />}                 
                </div>
            </div>


        );
    }
}
export default withRouter(Dashboard);