import React, { Component } from "react";

import LoanRequests from "../components/LoanRequests/LoanRequests";
import DharmaConsumer from "../contexts/Dharma/DharmaConsumer";

class LoanRequestsContainer extends Component {
    constructor(props) {
        super(props);

        this.redirect = this.redirect.bind(this);
    }

    redirect(location) {
        this.props.history.push(location);
    }

    render() {
        return (
            <DharmaConsumer>
                {(dharma) => <LoanRequests dharma={dharma} redirect={this.redirect} />}
            </DharmaConsumer>
        );
    }
}

export default LoanRequestsContainer;
