import React, { Component } from "react";

import LoanRequests from "../components/LoanRequests/LoanRequests";

class LoanRequestsContainer extends Component {
    constructor(props) {
        super(props);

        this.handleFill = this.handleFill.bind(this);

        this.state = {
            requests: [],
        };
    }

    componentDidMount() {
        const requests = this.getRequests();

        this.setState({ requests });
    }

    getRequests() {
        return [
            {
                id: 1,
                principal: 100,
                principalTokenSymbol: "WETH",
                interestRate: 5,
                termLength: 3,
                collateral: 250,
                collateralTokenSymbol: "REP",
                expiration: 10,
            },
            {
                id: 2,
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

    handleFill(loanRequestId) {
        console.log(loanRequestId);
    }

    render() {
        const { requests } = this.state;

        return <LoanRequests requests={requests} handleFill={this.handleFill} />;
    }
}

export default LoanRequestsContainer;
