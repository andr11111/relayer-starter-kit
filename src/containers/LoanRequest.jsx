// External libraries
import React, { Component } from "react";

// Components
import LoanRequest from "../components/LoanRequest/LoanRequest";

// Contexts
import DharmaConsumer from "../contexts/Dharma/DharmaConsumer";

class LoanRequestContainer extends Component {
    render() {
        const { id } = this.props.match.params;

        return (
            <DharmaConsumer>
                { (dharmaProps) => {
                    return <LoanRequest id={ id } dharma={ dharmaProps.dharma }/>
                } }
            </DharmaConsumer>
        );
    }
}

export default LoanRequestContainer;
