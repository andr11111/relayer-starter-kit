import React, { Component } from "react";

import DharmaConsumer from "../contexts/Dharma/DharmaConsumer";
import RequestLoanForm from "../components/RequestLoanForm/RequestLoanForm";
import Api from "../services/api";

class RequestLoanFormContainer extends Component {
    constructor(props) {
        super(props);

        this.createLoanRequest = this.createLoanRequest.bind(this);
    }

    createLoanRequest(data) {
        const api = new Api();

        api.create("loanRequests", data);
    }

    render() {
        return (
            <DharmaConsumer>
                {(dharma) => (
                    <RequestLoanForm dharma={dharma} createLoanRequest={this.createLoanRequest} />
                )}
            </DharmaConsumer>
        );
    }
}

export default RequestLoanFormContainer;
