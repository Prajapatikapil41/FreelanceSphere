import React, { Component } from 'react';
import Header from './Header'
import Footer from './Footer'
import Table from './Table'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert2'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: 'open',
            tableHeaderData: ['Title', 'Employer', 'Skill', 'Avg Bid', 'Budget Range', 'Budget Period', 'No. of Bids', 'Action'],
            tableRowData: []
        };
    }


    componentWillMount() {
        let url = 'http://localhost:8080/isLoggedIn';
        axios.get(url,{withCredentials: true})
            .then(res => {
                if (res.data.errorMsg === "") {
                    localStorage.setItem('id', res.data.data.id);
                    localStorage.setItem('name', res.data.data.name);
                    localStorage.setItem('email', res.data.data.email);
                    let getOpenProjects = 'http://localhost:8080/getOpenProjects';
                    debugger
                    let id = localStorage.getItem('id');
                    if (id) {
                        var apiPayload = {
                            id: id
                        };
                        axios.post(getOpenProjects, apiPayload,{withCredentials:true})
                            .then(res => {
                                debugger
                                // eslint-disable-next-line
                                if (res.data.errorMsg != '') { 
                                    this.setState({
                                        errorMessage: res.data.errorMsg
                                    });
                                    // eslint-disable-next-line
                                } else if (res.data.successMsg != '') {
                                    this.setState({
                                        tableRowData: res.data.data,
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
                    }            }
                else {
                    swal({
                        type: 'error',
                        title: 'Login',
                        text: 'Login Required',
                      })
                    this.props.history.push('/login')
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
        let projectId = localStorage.getItem('currentProjectId');
        let currentUserId = localStorage.getItem('id');
    
        if (!projectId) {
            console.error("No project ID found in localStorage!");
            return;
        }
        console.log("Current Project ID:", projectId);
    
        let getProjectAPI = 'http://localhost:8080/getProjectById';
        let apiPayload = { id: projectId, currentUserId: currentUserId };
    
        axios.post(getProjectAPI, apiPayload)
            .then(res => {
                console.log("Project Details Response:", res.data); // Debugging API response
    
                if (res.data.errorMsg) {
                    console.error("Error fetching project:", res.data.errorMsg);
                    this.setState({ errorMessage: res.data.errorMsg });
                } else if (res.data.successMsg) {
                    let projectData = res.data.data;
                    console.log("Project Data:", projectData);
    
                    this.setState({
                        title: projectData.title,
                        skill: projectData.skill,
                        description: projectData.description,
                        budget: projectData.range,
                        period: projectData.period,
                        average: projectData.average,
                    });
    
                    this.props.currentProject(projectData);
                } else {
                    console.error("Unknown error occurred.");
                    this.setState({ errorMessage: "Unknown error occurred" });
                }
            })
            .catch(err => console.error("API Call Error (getProjectById):", err));
    }
    
    render() {
        return (
            <div className='container'>
                <Header home={'linkActive'}/>
                <div className="content-wrapper mt-1">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/home">Home</a>
                            </li>
                            <li className="breadcrumb-item active">Open Projects</li>
                        </ol>
                        <div className="row mt-1">
                            <div className="col-15">
                                <p></p>
                                <div className="col-lg-11 container">
                                    <div className="">
                                        <div>
                                            <Table action={this.state.action} tableHeaderData={this.state.tableHeaderData} tableRowData={this.state.tableRowData} />

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
export default withRouter(Home);

