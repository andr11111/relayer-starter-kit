import Dharma from "@dharmaprotocol/dharma.js";
import * as moment from "moment";
import React, { Component } from "react";
import { Table } from "react-bootstrap";

import Api from "../../services/api";

import "./LoanRequests.css";

class LoanRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loanRequests: [],
        };

        this.parseLoanRequests = this.parseLoanRequests.bind(this);
        this.parseLoanRequest = this.parseLoanRequest.bind(this);
    }

    componentDidMount() {
        const api = new Api();

        api.get("loanRequests")
            .then(this.parseLoanRequests)
            .then((loanRequests) => this.setState({ loanRequests }))
            .catch((error) => console.error(error));
    }

    parseLoanRequests(loanRequestData) {
        return Promise.all(loanRequestData.map(this.parseLoanRequest));
    }

    parseLoanRequest(datum) {
        const { dharma } = this.props;

        const { LoanRequest } = Dharma.Types;

        return new Promise((resolve) => {
            LoanRequest.load(dharma, datum).then((loanRequest) => {
                resolve({
                    ...loanRequest.getTerms(),
                    id: datum.id,
                });
            });
        });
    }

    timeFromNow(unixTimestamp) {
        return moment.unix(unixTimestamp).fromNow();
    }

    render() {
        const { loanRequests } = this.state;

        return (
            <Table bordered condensed hover responsive>
                <thead>
                    <tr>
                        <th>Principal</th>
                        <th>Principal Token</th>
                        <th>Interest Rate</th>
                        <th>Term Length</th>
                        <th>Collateral</th>
                        <th>Collateral Token Symbol</th>
                        <th>Expiration</th>
                    </tr>
                </thead>
                <tbody>
                    {loanRequests.map((request) => {
                        return (
                            <tr key={request.id}>
                                <td>{request.principalAmount}</td>
                                <td>{request.principalTokenSymbol}</td>
                                <td>{request.interestRate}</td>
                                <td>
                                    {request.termDuration} {request.termUnit}
                                </td>
                                <td>{request.collateralAmount}</td>
                                <td>{request.collateralTokenSymbol}</td>
                                <td>{this.timeFromNow(request.expiresAt)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}

export default LoanRequests;
