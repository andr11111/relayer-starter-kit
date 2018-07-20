import React, { Component } from "react";

import DharmaConsumer from "../contexts/Dharma/DharmaConsumer";
import RequestLoanForm from "../components/RequestLoanForm/RequestLoanForm";

class RequestLoanFormContainer extends Component {
    constructor(props) {
        super(props);

        this.onCompletion = this.onCompletion.bind(this);
    }

    onCompletion() {
        this.props.history.push("/?highlightRow=true");
    }

    render() {
        return (
            <DharmaConsumer>
                {(dharma) => {
                    return <RequestLoanForm dharma={dharma} onCompletion={this.onCompletion} />;
                }}
            </DharmaConsumer>
        );
    }
}

export default RequestLoanFormContainer;
