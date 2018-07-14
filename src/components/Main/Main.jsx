import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import LoanRequestsContainer from "../../containers/LoanRequests";

import CreateLoanRequestForm from "../CreateLoanRequestForm/CreateLoanRequestForm";

class Main extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path="/" component={LoanRequestsContainer} />
                    <Route path="/create" component={CreateLoanRequestForm} />
                </Switch>
            </main>
        );
    }
}

export default Main;
