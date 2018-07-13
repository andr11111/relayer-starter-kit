import React, { Component } from "react";

import "./LoanRequests.css";

class LoanRequests extends Component {
    render() {
        const requests = [
            {
                principal: 100,
                principalTokenSymbol: "WETH",
                interestRate: 5,
                termLength: 3,
                collateral: 250,
                collateralTokenSymbol: "REP",
                expiration: 10,
            },
            {
                principal: 500,
                principalTokenSymbol: "ZRX",
                interestRate: 12,
                termLength: 5,
                collateral: 1000,
                collateralTokenSymbol: "DAI",
                expiration: 1,
            },
        ];

        return (
            <table>
                <thead>
                    <th>Principal</th>
                    <th>Principal Token</th>
                    <th>Interest Rate</th>
                    <th>Term Length</th>
                    <th>Collateral</th>
                    <th>Collateral Token Symbol</th>
                    <th>Expiration</th>
                    <th />
                </thead>
                <tbody>
                    {requests.map((request) => {
                        return (
                            <tr>
                                <td>{request.principal}</td>
                                <td>{request.principalTokenSymbol}</td>
                                <td>{request.interestRate}</td>
                                <td>{request.termLength}</td>
                                <td>{request.collateral}</td>
                                <td>{request.collateralTokenSymbol}</td>
                                <td>{request.expiration}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

export default LoanRequests;
