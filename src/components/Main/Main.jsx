import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import LoanRequestsContainer from "../../containers/LoanRequests";

import RequestLoanForm from "../RequestLoanForm/RequestLoanForm";

class Main extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path="/" component={LoanRequestsContainer} />
                    <Route path="/create" component={RequestLoanForm} />
                </Switch>
            </main>
        );
    }
}

export default Main;
