import React, { Component } from "react";

import LoanRequest from "../components/LoanRequest/LoanRequest";
import DharmaConsumer from "../contexts/Dharma/DharmaConsumer";

class LoanRequestContainer extends Component {
    render() {
        const { id } = this.props.match.id;

        return (
            <DharmaConsumer>{(dharma) => <LoanRequest id={id} dharma={dharma} />}</DharmaConsumer>
        );
    }
}

export default LoanRequestContainer;
