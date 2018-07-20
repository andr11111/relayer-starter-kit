import React, { Component } from "react";

import LoanRequests from "../components/LoanRequests/LoanRequests";
import DharmaConsumer from "../contexts/Dharma/DharmaConsumer";

class LoanRequestsContainer extends Component {
    constructor(props) {
        super(props);

        this.redirect = this.redirect.bind(this);
        this.parseQueryParams = this.parseQueryParams.bind(this);
    }

    redirect(location) {
        this.props.history.push(location);
    }

    parseQueryParams() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const highlightRow = params.get("highlightRow");
        return highlightRow === "true";
    }

    render() {
        const highlightRow = this.parseQueryParams();

        return (
            <DharmaConsumer>
                {(dharma) => (
                    <LoanRequests
                        dharma={dharma}
                        redirect={this.redirect}
                        highlightRow={highlightRow}
                    />
                )}
            </DharmaConsumer>
        );
    }
}

export default LoanRequestsContainer;
