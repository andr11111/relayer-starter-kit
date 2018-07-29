// External libraries
import React, { Component } from "react";

// Helpers
import LoanRequestCreator from "./LoanRequestCreator";


const withLoanRequestCreator = WrappedComponent => {
    return class extends Component {
        render() {            
            return (
                <LoanRequestCreator>
                    {(createLoanRequest) => (
                        <WrappedComponent 
                            handleCreateLoanRequest={createLoanRequest}                            
                            {...this.props}
                        />
                    )}
                </LoanRequestCreator>
            );
        }
  };
}

export default withLoanRequestCreator;