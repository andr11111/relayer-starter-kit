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

    /**
     * Returns true if the table that displays the loan requests should highlight the first
     * row for a small amount of time. This is useful for alerting the user about a newly-added
     * row.
     *
     * @returns {boolean}
     */
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
                {(dharmaProps) => (
                    <LoanRequests
                        dharma={dharmaProps.dharma}
                        redirect={this.redirect}
                        shouldHighlightRow={shouldHighlightRow}
                    />
                )}
            </DharmaConsumer>
        );
    }
}

export default LoanRequestsContainer;
