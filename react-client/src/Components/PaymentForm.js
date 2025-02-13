import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class PaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectTitle: "",
            freelancerName: "",
            projectAmount: "",
            razorPayOrderId: "",
            projectId: this.props.projectId || "", // Added projectId to state
        };
    }
        componentDidMount() {
        console.log("Project ID received in PaymentForm:", this.state.projectId);
    }


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const {  projectTitle, freelancerName, projectAmount,projectId } = this.state;

        try {
            console.log("Creating Razorpay Order...");
            const response = await axios.post("http://localhost:8080/createOrder", {
                projectTitle,
                freelancerName,
                projectAmount,
                projectId,
            });

            console.log("Order Created:", response.data);

            if (response.data.razorPayOrderId) {
                this.setState({ 
                    razorPayOrderId: response.data.razorPayOrderId,
                    projectId: response.data.projectId // Ensure projectId is stored
                }, this.openRazorpay);
            } else {
                console.error("Failed to get Razorpay Order ID");
            }
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    openRazorpay = () => {
        const { razorPayOrderId, projectAmount, projectId } = this.state; // Get projectId from state

        if (!window.Razorpay) {
            console.error("Razorpay SDK not loaded");
            return;
        }

        const options = {
            key: "rzp_test_UfiugLyJYaQP1t",
            amount: projectAmount * 100,
            currency: "INR",
            order_id: razorPayOrderId,
            name: "manish pratap singh pauli",
            description: "Payment for project",
            handler: async (response) => {
                console.log("Payment Success:", response);
                alert("Payment Successful!");
            
                try {
                    const paymentData = {
                        payload: {
                            payment: {
                                entity: {
                                    order_id: response.razorpay_order_id,
                                    payment_id: response.razorpay_payment_id,
                                    signature: response.razorpay_signature
                                }
                            }
                        }
                    };
            
                    console.log("Sending payment update:", paymentData);
                    
                    const paymentResponse = await axios.post("http://localhost:8080/paymentSuccess", paymentData);
                    console.log("Backend Payment Status Update Response:", paymentResponse.data);
                } catch (error) {
                    console.error("Error updating payment status:", error);
                }
            }
            ,
            prefill: {
                name: "John Doe",
                email: "johndoe@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="p-4 bg-white border rounded shadow">
                    <div className="mb-3">
                        <label htmlFor="projectTitle" className="form-label">Project Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="projectTitle"
                            name="projectTitle"
                            value={this.state.projectTitle}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="freelancerName" className="form-label">Freelancer Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="freelancerName"
                            name="freelancerName"
                            value={this.state.freelancerName}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="projectAmount" className="form-label">Project Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            id="projectAmount"
                            name="projectAmount"
                            value={this.state.projectAmount}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">Proceed to Pay</button>
                        <Link to="/myprojects">
                            <button type="button" className="btn btn-outline-primary">Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default PaymentForm;
