import Dharma from "@dharmaprotocol/dharma.js";
import * as moment from "moment";
import React, { Component } from "react";
import { Table } from "react-bootstrap";

import Api from "../../services/api";
import FillButton from "../FillButton/FillButton";

import "./LoanRequests.css";

class LoanRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requests: [],
        };

        this.updateLoanRequestState = this.updateLoanRequestState.bind(this);
        this.parseLoanRequests = this.parseLoanRequests.bind(this);
    }

    componentDidMount() {
        const api = new Api();

        api.get("loanRequests")
            .then(this.parseLoanRequests)
            .then(this.updateLoanRequestState)
            .catch((error) => console.error(error));
    }

    parseLoanRequests(loanRequestData) {
        const { dharma } = this.props;

        const { LoanRequest } = Dharma.Types;

        return Promise.all(
            loanRequestData.map((datum) => LoanRequest.load(dharma, datum))
        );
    }

    updateLoanRequestState(loanRequests) {
        const requests = loanRequests.map((request) => request.getTerms());
        this.setState({ requests });
    }

    timeFromNow(unixTimestamp) {
        return moment.unix(unixTimestamp).fromNow();
    }

    isExpired(unixTimestamp) {
        return moment.unix(unixTimestamp).isBefore()
    }

    render() {
        const { handleFill } = this.props;

        const { requests } = this.state;

        return (
            <Table striped bordered condensed hover responsive>
                <thead>
                    <tr>
                        <th>Principal</th>
                        <th>Principal Token</th>
                        <th>Interest Rate</th>
                        <th>Term Length</th>
                        <th>Collateral</th>
                        <th>Collateral Token Symbol</th>
                        <th>Expiration</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request, i) => {
                        return (
                            <tr key={i}>
                                <td>{request.principalAmount}</td>
                                <td>{request.principalTokenSymbol}</td>
                                <td>{request.interestRate}</td>
                                <td>
                                    {request.termDuration} {request.termUnit}
                                </td>
                                <td>{request.collateralAmount}</td>
                                <td>{request.collateralTokenSymbol}</td>
                                <td>{this.timeFromNow(request.expiresAt)}</td>
                                <td>
                                    <FillButton
                                        loanRequestId={request.id}
                                        disabled={this.isExpired(request.expiresAt)}
                                        handleFill={handleFill}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}

export default LoanRequests;
