import React, {Component} from "react";

import LoanRequests from "../components/LoanRequests/LoanRequests";

import Api from "../services/api";
import DharmaConsumer from "../contexts/Dharma/DharmaConsumer";

class LoanRequestsContainer extends Component {
    constructor(props) {
        super(props);

        this.handleFill = this.handleFill.bind(this);

        this.state = {
            requests: [],
        };
    }

    componentDidMount() {
        const api = new Api();

        api.get("loanRequests").then((requests) => {
            this.setState({requests});
        }).catch((error) => console.error(error));
    }

    handleFill(loanRequestId) {
        console.log(loanRequestId);
    }

    render() {
        const {requests} = this.state;

        return (
            <DharmaConsumer>
                {(dharma) => (
                    <LoanRequests requests={requests} handleFill={this.handleFill} dharma={dharma}/>
                )}
            </DharmaConsumer>
        );
    }
}

export default LoanRequestsContainer;
