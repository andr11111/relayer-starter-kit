// External libraries
import React, { Component } from "react";

// Components
import LoanRequest from "../components/LoanRequest/LoanRequest";

// Helpers
import LoanRequestLoader from "../helpers/LoanRequestLoader";

class LoanRequestContainer extends Component {
    render() {
      const { id } = this.props.match.params;
      return (
        <LoanRequestLoader id={id}>
            {({ loanRequest, hasSufficientAllowance, transactions, error, runFill, runAuthorize }, { dharma }) => (
                <LoanRequest 
                    loanRequest={loanRequest}
                    hasSufficientAllowance={hasSufficientAllowance}
                    transactions={transactions}
                    error={error}
                    handleFill={runFill}
                    handleAuthorize={runAuthorize}
                    dharma={dharma}
                />
            )}
        </LoanRequestLoader>
    );
    }
}

export default LoanRequestContainer;
