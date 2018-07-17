import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";
import {Grid} from "react-bootstrap";

import LoanRequestsContainer from "../../../containers/LoanRequests";
import RequestLoanFormContainer from "../../../containers/RequestLoanForm";

import DharmaConsumer from "../../../contexts/Dharma/DharmaConsumer";

import "./Main.css";

class Main extends Component {
    render() {
        return (
            <main className="Main">
                <Grid>
                    <DharmaConsumer>
                        {(dharma) => (
                            <Switch>
                                <Route path="/" exact={true} render={(props) => {
                                    return <LoanRequestsContainer {...props} dharma={dharma}/>
                                }}/>
                                <Route path="/create" render={(props) => {
                                    return <RequestLoanFormContainer {...props} dharma={dharma}/>
                                }}/>
                            </Switch>
                        )}
                    </DharmaConsumer>
                </Grid>
            </main>
        );
    }
}

export default Main;
