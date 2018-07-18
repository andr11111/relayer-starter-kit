import React, {Component} from "react";

import DharmaConsumer from "../contexts/Dharma/DharmaConsumer";
import RequestLoanForm from "../components/RequestLoanForm/RequestLoanForm";

class RequestLoanFormContainer extends Component {
    render() {
        return (
            <DharmaConsumer>
                {(dharma) => {
                    return <RequestLoanForm dharma={dharma} />
                }}
            </DharmaConsumer>
        );
    }
}

export default RequestLoanFormContainer;
