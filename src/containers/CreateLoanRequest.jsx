// External libraries
import React, { Component } from "react";

// Components
import CreateLoanRequest from "../components/CreateLoanRequest/CreateLoanRequest";

// Contexts
import DharmaConsumer from "../contexts/Dharma/DharmaConsumer";

// Helpers
import withLoanRequestCreator from '../helpers/withLoanRequestCreator';

const CreateLoanRequestEnhanced = withLoanRequestCreator(CreateLoanRequest);

class CreateLoanRequestContainer extends Component {
    constructor(props) {
        super(props);

        this.onCompletion = this.onCompletion.bind(this);
    }

    /**
     * When the loan request is created, we redirect the user back to the table that includes
     * all of the loan requests, and highlight the newly created request.
     */
    onCompletion(id) {
        this.props.history.push(`/?highlightRow=${id}`);
    }

    render() {
        return (
            <DharmaConsumer>
                {(dharmaProps) => {
                    return <CreateLoanRequestEnhanced 
                        onCompletion={this.onCompletion} 
                        tokens={dharmaProps.supportedTokens} />;
                }}
            </DharmaConsumer>            
        );
    }
}

export default CreateLoanRequestContainer;
