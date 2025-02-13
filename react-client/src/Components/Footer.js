import React, { Component } from 'react';

import { withRouter } from 'react-router-dom'

class Footer extends Component {



    render() {
        return (

            <div>

                <footer className="sticky-footer">
                    <div className="container mt-5">
                        <div className="text-center">
                            <small>Copyright © FreelancSphere 2025</small>
                        </div>
                    </div>
                </footer>       </div>

        );
    }
}
export default withRouter(Footer);