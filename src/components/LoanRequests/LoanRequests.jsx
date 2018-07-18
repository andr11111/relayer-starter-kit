import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Dharma from "@dharmaprotocol/dharma.js";

import Api from "../../services/api";
import FillButton from "../FillButton/FillButton";

import "./LoanRequests.css";

class LoanRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requests: [],
        };
    }

    componentDidMount() {
        const api = new Api();

        const { dharma } = this.props;

        const { LoanRequest } = Dharma.Types;

        api.get("loanRequests")
            .then((data) => {
                const promises = data.map((datum) => {
                    return LoanRequest.load(dharma, datum);
                });

                Promise.all(promises).then((loanRequests) => {
                    const requests = loanRequests.map((request) => request.getTerms());
                    this.setState({ requests });
                });
            })
            .catch((error) => console.error(error));
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
                                <td>{request.expiresAt}</td>
                                <td>
                                    <FillButton
                                        loanRequestId={request.id}
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
