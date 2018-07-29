// External libraries
import React, { Component } from "react";
import Dharma from "@dharmaprotocol/dharma.js";

// HOCs
import withDharma from "./withDharma";

import Api from "../services/api";


const withLoanRequestCreator = WrappedComponent => {
    class HasLoanRequestCreator extends Component {
        constructor(props) {
            super(props);            
        
            this.createLoanRequest = this.createLoanRequest.bind(this);
            this.generateLoanRequest = this.generateLoanRequest.bind(this);
        }
    
        async createLoanRequest(params) {
            const api = new Api();
            const {                
                principalAmount,
                principalToken,
                collateralAmount,
                collateralToken,
                interestRate,
                termDuration,
                termUnit,
                expiresInDuration,
                expiresInUnit,
            } = params;
            
            const debtorAddress = await this.getDebtorAddress();            

            const loanRequest = await this.generateLoanRequest({
                principalAmount,
                principalToken,
                collateralAmount,
                collateralToken,
                interestRate,
                termDuration,
                termUnit,                
                expiresInDuration,
                expiresInUnit,            
                debtorAddress
            });

            await loanRequest.allowCollateralTransfer(debtorAddress);

            const id = await api.create("loanRequests", loanRequest.toJSON());

            return id;
        }
    
        async getDebtorAddress() {
            const { dharmaProps: { dharma }} = this.props;
    
            const debtorAccounts = await dharma.blockchain.getAccounts();
            return debtorAccounts[0];
        }
    
        async generateLoanRequest(params) {
            const { dharmaProps: { dharma }} = this.props;
    
            const { LoanRequest } = Dharma.Types;
    
            const {
                principalAmount,
                principalToken,
                collateralAmount,
                collateralToken,
                interestRate,
                termDuration,
                termUnit,                
                expiresInDuration,
                expiresInUnit,
                debtorAddress
            } = params;
    
            return LoanRequest.create(dharma, {
                principalAmount,
                principalToken,
                collateralAmount,
                collateralToken,
                interestRate,
                termDuration,
                termUnit,                
                expiresInDuration,
                expiresInUnit,            
                debtorAddress
            });
        }

        render() {
            return <WrappedComponent 
                handleCreateLoanRequest={ this.createLoanRequest }
                {...this.props} />;      
        }        
  };

  return withDharma(HasLoanRequestCreator);
}

export default withLoanRequestCreator;