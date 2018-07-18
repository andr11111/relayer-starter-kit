import React, { Component } from "react";

import LoanRequests from "../components/LoanRequests/LoanRequests";
import DharmaConsumer from "../contexts/Dharma/DharmaConsumer";

class LoanRequestsContainer extends Component {
    render() {
        return (
            <DharmaConsumer>
                {(dharma) => <LoanRequests dharma={dharma} />}
            </DharmaConsumer>
        );
    }
}

export default LoanRequestsContainer;
