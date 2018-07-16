import React, {Component} from "react";
import {Switch, Redirect, Route} from "react-router-dom";
import {Grid} from "react-bootstrap";

import LoanRequestsContainer from "../../../containers/LoanRequests";
import RequestLoanFormContainer from "../../../containers/RequestLoanForm";

import "./Main.css";

class Main extends Component {
    render() {
        return (
            <main className="Main">
                <Grid>
                    <Switch>
                        <Route path="/" exact={true} component={LoanRequestsContainer}/>
                        <Route path="/create" component={RequestLoanFormContainer}/>
                    </Switch>
                </Grid>
            </main>
        );
    }
}

export default Main;
