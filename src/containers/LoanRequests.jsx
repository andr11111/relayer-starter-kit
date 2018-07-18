import React, { Component } from "react";

import LoanRequests from "../components/LoanRequests/LoanRequests";
import DharmaConsumer from "../contexts/Dharma/DharmaConsumer";

class LoanRequestsContainer extends Component {
    handleFill(loanRequestId) {
        console.log(loanRequestId);
    }

    render() {
        return (
            <DharmaConsumer>
                {(dharma) => <LoanRequests handleFill={this.handleFill} dharma={dharma} />}
            </DharmaConsumer>
        );
    }
}

export default LoanRequestsContainer;
