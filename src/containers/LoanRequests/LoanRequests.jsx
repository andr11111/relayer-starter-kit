import React, { Component } from "react";

import LoanRequests from "../../components/LoanRequests/LoanRequests";

class LoanRequestsContainer extends Component {
    getRequests() {
        return [
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
    }

    render() {
        const requests = this.getRequests();

        return <LoanRequests requests={requests} />;
    }
}

export default LoanRequestsContainer;
