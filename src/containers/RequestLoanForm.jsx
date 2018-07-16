import React, { Component } from "react";

import RequestLoanForm from "../components/RequestLoanForm/RequestLoanForm";

class RequestLoanFormContainer extends Component {
    constructor(props) {
        super(props);

        this.createLoanRequest = this.createLoanRequest.bind(this);
    }

    createLoanRequest(data) {
        console.log(data);
    }

    render() {
        return <RequestLoanForm createLoanRequest={this.createLoanRequest} />;
    }
}

export default RequestLoanFormContainer;
