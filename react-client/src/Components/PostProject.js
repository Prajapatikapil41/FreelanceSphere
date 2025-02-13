import React, { Component } from 'react';
import Header from './Header'
import Footer from './Footer'
import ProjectForm from './ProjectForm'
import { withRouter } from 'react-router-dom'

class PostProject extends Component {
    render() {
        return (
            <div className='container'>
                <Header /> 
                <div className="content-wrapper mt-1">
                    <div className="container-fluid " >
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="index.html">Project</a>    </li>
                            <li className="breadcrumb-item active">Complete Details to post project</li>
                        </ol>
                        <div className="row mt-1 d-flex card card-body mb-2">
                            <div className="col-12">
                               
                                <div className="col-lg-10">
                                    <div className="panel panel-default">
                                       

                                        <div>
                                        <ProjectForm />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer />                </div>
            </div>

        );
    }
}
export default withRouter(PostProject);