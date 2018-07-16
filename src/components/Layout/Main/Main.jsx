import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import LoanRequestsContainer from "../../../containers/LoanRequests";
import RequestLoanFormContainer from "../../../containers/RequestLoanForm";

class Main extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path="/" component={LoanRequestsContainer} />
                    <Route path="/create" component={RequestLoanFormContainer} />
                </Switch>
            </main>
        );
    }
}

export default Main;
