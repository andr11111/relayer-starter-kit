// External libraries
import React, { Component } from "react";

// Components
import LoanRequests from "../components/LoanRequests/LoanRequests";

// Helpers
import LoanRequestsLoader from "../helpers/LoanRequestsLoader";

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
     * Returns the id of the LoanRequest that should be highlighted.
     *
     * @returns {number||null}
     */
    parseQueryParams() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const rowToHighlight = params.get("highlightRow");

        if (rowToHighlight) {
            return parseInt(rowToHighlight, 10);
        } else {
            return null;
        }
    }

    render() {
        const highlightRow = this.parseQueryParams();

        return (
            <LoanRequestsLoader>
                {({ loanRequests, isLoading, loadMore }) => (
                    <LoanRequests 
                        highlightRow={highlightRow}
                        redirect={this.redirect}
                        isLoading={isLoading}
                        loanRequests={loanRequests}
                        handleLoadMore={loadMore}
                    />
                )}
            </LoanRequestsLoader>
        );
    }
}

export default LoanRequestsContainer;
