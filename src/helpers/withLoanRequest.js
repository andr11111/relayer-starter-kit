// External libraries
import React, { Component } from "react";

// Helpers
import LoanRequestLoader from "./LoanRequestLoader";


const withLoanRequest = WrappedComponent => {
    return class extends Component {
        render() {
            const { id } = this.props;
            return (
                <LoanRequestLoader id={id}>
                    {(loanRequestProps) => (
                        <WrappedComponent 
                            loanRequestProps={loanRequestProps}                            
                            {...this.props}
                        />
                    )}
                </LoanRequestLoader>
            );           
        }
  };
}

export default withLoanRequest;