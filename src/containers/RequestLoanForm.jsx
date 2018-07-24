import React, { Component } from "react";

import DharmaConsumer from "../contexts/Dharma/DharmaConsumer";
import RequestLoanForm from "../components/RequestLoanForm/RequestLoanForm";

class RequestLoanFormContainer extends Component {
    constructor(props) {
        super(props);

        this.onCompletion = this.onCompletion.bind(this);
    }

    /**
     * When the loan request is created, we redirect the user back to the table that includes
     * all of the loan requests, and highlight the first row (which contains the newly added
     * loan request.)
     */
    onCompletion() {
        this.props.history.push("/?shouldHighlightRow=true");
    }

    render() {
        return (
            <DharmaConsumer>
                { (dharmaProps) => {
                    return <RequestLoanForm
                        dharma={ dharmaProps.dharma }
                        tokens={ dharmaProps.supportedTokens }
                        onCompletion={ this.onCompletion }
                    />;
                } }
            </DharmaConsumer>
        );
    }
}

export default RequestLoanFormContainer;
