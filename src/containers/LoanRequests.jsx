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
        const shouldHighlightRow = params.get("shouldHighlightRow");
        return shouldHighlightRow === "true";
    }

    render() {
        const shouldHighlightRow = this.parseQueryParams();

        return (
            <DharmaConsumer>
                {(dharma) => (
                    <LoanRequests
                        dharma={dharma}
                        redirect={this.redirect}
                        shouldHighlightRow={shouldHighlightRow}
                    />
                )}
            </DharmaConsumer>
        );
    }
}

export default LoanRequestsContainer;
