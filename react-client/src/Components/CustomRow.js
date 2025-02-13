import React, { Component } from "react";
import swal from "sweetalert2";
import axios from "axios";
import { withRouter } from "react-router-dom";

class CustomRow extends Component {
    handleProjectClick = (e) => {
        e.preventDefault();
        localStorage.setItem("currentProjectId", e.target.id);

        if (this.props.action === "dashboard" || this.props.action === "open") {
            localStorage.setItem("bidNowFlag", true);
            localStorage.setItem("hireFlag", false);
        } else if (this.props.action === "myprojectsopen") {
            localStorage.setItem("bidNowFlag", false);
            localStorage.setItem("hireFlag", true);
        } else if (this.props.action === "myprojectsprogress") {
            localStorage.setItem("bidNowFlag", false);
            localStorage.setItem("hireFlag", false);
        }

        window.location.href = "http://localhost:3000/projectitem";
    };

   
    handelMarkingClick = (e) => {
        e.preventDefault();
        const projectId = e.target.id;
        let markingAPI = "http://localhost:8080/markProjectAsCompleted";
        let apiPayload = { projectId: projectId };
        axios
            .post(markingAPI, apiPayload)
            .then((res) => {
                if (res.data.errorMsg !== "") {
                    this.setState({ errorMessage: res.data.errorMsg });
                } else if (res.data.successMsg !== "") {
                    swal.fire({
                        icon: "success",
                        title: "Mission Accomplished! 🎯",
                        text: "Your project has been marked as completed successfully.",
                        showConfirmButton: true,
                        confirmButtonText: "Awesome! 🚀"
                    });
                } else {
                    this.setState({ errorMessage: "Unknown error occurred" });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }


    handelPaymentClick = (e) => {
        e.preventDefault();
        const projectId = e.target.id;
        this.props.history.push(`/payment/${projectId}`); // Navigate to PaymentForm with projectId
    };
    

    handleProfileClick = (e) => {
        let getprofileAPI = "http://localhost:8080/getprofile";
        e.preventDefault();

        let id = e.target.id;
        let apiPayload = { id: id };

        axios
            .post(getprofileAPI, apiPayload)
            .then((res) => {
                if (res.data.errorMsg !== "") {
                    this.setState({ errorMessage: res.data.errorMsg });
                } else if (res.data.successMsg !== "") {
                    swal({
                        imageUrl: res.data.data.profile_id ? require(`../images/${id}.png`) : "",
                        imageHeight: 200,
                        showCloseButton: true,
                        title: res.data.data.name,
                        text: res.data.data.about,
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: res.data.data.email,
                        footer: res.data.data.phone ? "Contact : " + res.data.data.phone : "",
                    });
                } else {
                    this.setState({ errorMessage: "Unknown error occurred" });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    render() {
        let row;
        if (this.props.action === "dashboard") {
            row = (
                <tr align="center">
                    <td>
                        <a href="#" id={this.props.rowData.id} onClick={this.handleProjectClick}>
                            {this.props.rowData.projectTitle}
                        </a>
                    </td>
                    <td>
                        <a href="#" id={this.props.rowData.employerId} onClick={this.handleProfileClick}>
                            {this.props.rowData.employerName}
                        </a>
                    </td>
                    <td>₹{this.props.rowData.averageBid}</td>
                    <td>₹ {this.props.rowData.bidAmount}</td>
                    <td>{this.props.rowData.bidStatus}</td>
                </tr>
            );
        } else if (this.props.action === "open") {
            row = (
                <tr align="center">
                    <td>
                        <a href="#" id={this.props.rowData.projectId} onClick={this.handleProjectClick}>
                            {this.props.rowData.projectTitle}
                        </a>
                    </td>
                    <td>
                        <a href="#" id={this.props.rowData.employerId} onClick={this.handleProfileClick}>
                            {this.props.rowData.employerName}
                        </a>
                    </td>
                    <td>{this.props.rowData.projectSkill}</td>
                    <td>₹ {this.props.rowData.averageBid}</td>
                    <td>₹ {this.props.rowData.projectBudget}</td>
                    <td>{this.props.rowData.projectPeriod} Days</td>
                    <td>{this.props.rowData.bidCount}</td>
                    <td>
                        <button
                            className="buttonAction"
                            style={{ backgroundColor: "green", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px", cursor: "pointer" }}
                            type="button"
                            id={this.props.rowData.projectId}
                            onClick={this.handleProjectClick}
                        >
                            Bid Now
                        </button>
                    </td>
                </tr>
            );
        } else if (this.props.action === "myprojectsopen") {
            row = (
                <tr align="center">
                    <td>
                        <a href="#" id={this.props.rowData.projectId} onClick={this.handleProjectClick}>
                            {this.props.rowData.projectTitle}
                        </a>
                    </td>
                    <td>{this.props.rowData.bidCount}</td>
                    <td>₹ {this.props.rowData.averageBid}</td>
                    <td>₹ {this.props.rowData.projectBudget}</td>
                    <td>Open</td>
                </tr>
            );
        }
        // here
        else if (this.props.action === 'myprojectsprogress') {
            return (
                <tr align='center'>
                    <td><a href='' id={this.props.rowData.projectId} onClick={this.handleProjectClick} >{this.props.rowData.projectTitle}</a></td>
                    <td><a href='' id={this.props.rowData.employerId} onClick={this.handleProfileClick} >{this.props.rowData.employerName}</a></td>
                    <td>₹ {this.props.rowData.bidAmount}</td>
                    <td>{this.props.rowData.endDate}</td>
                    <td>{this.props.rowData.projectStatus}</td>
                    <td>{this.props.rowData.paymentStatus}</td>
                    <td>
                        <button
                            className="buttonAction"
                            style={{ backgroundColor: "green", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px", cursor: "pointer" }}
                            type="button"
                            id={this.props.rowData.projectId}
                            onClick={this.handelMarkingClick}
                        >
                            Mark as Completed
                        </button>
                    </td>
                </tr>
                
            )

        }else {
            row = (
                <tr align="center">
                    <td>
                        <a href="#" id={this.props.rowData.projectId} onClick={this.handleProjectClick}>
                            {this.props.rowData.projectTitle}
                        </a>
                    </td>
                    <td>
                        <a href="#" id={this.props.rowData.freelancerId} onClick={this.handleProfileClick}>
                            {this.props.rowData.freelancerName}
                        </a>
                    </td>
                    <td>₹ {this.props.rowData.bidAmount}</td>
                    <td>{this.props.rowData.endDate}</td>
                    <td>{this.props.rowData.projectStatus}</td>
                    <td>{this.props.rowData.paymentStatus}</td>
                    <td>
                        <button
                            className="buttonAction"
                            style={{ backgroundColor: "green", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px", cursor: "pointer" }}
                            type="button"
                            id={this.props.rowData.projectId}
                            onClick={this.handelPaymentClick}
                        >
                            Proceed to pay
                        </button>
                    </td>
                </tr>
            );
        }

        return row; // ✅ Removes <tbody> from CustomRow.js
    }
}

export default withRouter(CustomRow);