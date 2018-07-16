import React, { Component } from "react";
import { Table } from "react-bootstrap";

import FillButton from "../FillButton/FillButton";

import "./LoanRequests.css";

class LoanRequests extends Component {
    render() {
        const { handleFill, requests } = this.props;

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
                    {requests.map((request) => {
                        return (
                            <tr key={request.id}>
                                <td>{request.principal}</td>
                                <td>{request.principalTokenSymbol}</td>
                                <td>{request.interestRate}</td>
                                <td>{request.termLength}</td>
                                <td>{request.collateral}</td>
                                <td>{request.collateralTokenSymbol}</td>
                                <td>{request.expiration}</td>
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
