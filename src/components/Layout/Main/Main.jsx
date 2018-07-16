import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Col, Grid, Row } from "react-bootstrap";

import LoanRequestsContainer from "../../../containers/LoanRequests";
import RequestLoanFormContainer from "../../../containers/RequestLoanForm";

import "./Main.css";

class Main extends Component {
    render() {
        return (
            <main className="Main">
                <Grid>
                    <Row>
                        <Switch>
                            <Route exact path="/" component={LoanRequestsContainer} />
                            <Route path="/create" component={RequestLoanFormContainer} />
                        </Switch>
                    </Row>
                </Grid>
            </main>
        );
    }
}

export default Main;
