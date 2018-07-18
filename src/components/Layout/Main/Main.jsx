import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Grid } from "react-bootstrap";

import LoanRequestsContainer from "../../../containers/LoanRequests";
import RequestLoanFormContainer from "../../../containers/RequestLoanForm";
import TokensContainer from "../../../containers/Tokens";

import "./Main.css";

class Main extends Component {
    render() {
        return (
            <main className="Main">
                <Grid>
                    <Switch>
                        <Route path="/" exact={true} component={LoanRequestsContainer} />
                        <Route path="/create" component={RequestLoanFormContainer} />
                        <Route path="/tokens" component={TokensContainer} />
                    </Switch>
                </Grid>
            </main>
        );
    }
}

export default Main;
