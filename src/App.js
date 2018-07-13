import React, { Component } from "react";

import LoanRequests from "./components/LoanRequests/LoanRequests";

import "./App.css";

class App extends Component {
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

        return (
            <div className="App">
                <LoanRequests requests={requests} />
            </div>
        );
    }
}

export default App;
