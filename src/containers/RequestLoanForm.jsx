import React, { Component } from "react";

import { DharmaContext } from "..";
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
            <DharmaContext.Consumer>
                {(dharma) => (
                    <RequestLoanForm dharma={dharma} createLoanRequest={this.createLoanRequest} />
                )}
            </DharmaContext.Consumer>
        );
    }
}

export default RequestLoanFormContainer;
