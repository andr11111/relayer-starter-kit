// External libraries
import { Component } from "react";
import Dharma from "@dharmaprotocol/dharma.js";
import { withApollo } from 'react-apollo';
import { compose } from 'react-apollo';

// Helpers
import withDharma from "./withDharma";

// API
import { LOAN_REQUEST_CREATE } from "../services/graphql/mutations";
import { LOAN_REQUESTS_LIST } from "../services/graphql/queries";

class LoanRequestCreator extends Component {
    constructor(props) {
        super(props);            
    
        this.createLoanRequest = this.createLoanRequest.bind(this);
        this.generateLoanRequest = this.generateLoanRequest.bind(this);
    }

    async createLoanRequest(params) {
        const { client } = this.props;
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

        // Temporary hack until we implemnent JSON field type
        let loanRequestJSON = loanRequest.toJSON();
        loanRequestJSON = {
            ...loanRequestJSON,
            debtorSignature: JSON.stringify(loanRequestJSON.debtorSignature),
            creditorSignature: JSON.stringify(loanRequestJSON.creditorSignature),
            underwriterSignature: JSON.stringify(loanRequestJSON.underwriterSignature)
        }

        // Create Loan Request and update local cache
        const { data: { loanRequestCreate: { id } }}  = await client.mutate(
            { 
                mutation: LOAN_REQUEST_CREATE, 
                variables: { data: loanRequestJSON },
                refetchQueries: ['loanRequestsList'],
                update: (store, { data: { loanRequestCreate } }) => {
                    // Read the data from our cache for this query.
                    const data = store.readQuery({ 
                        query: LOAN_REQUESTS_LIST, 
                        variables: {
                            first: 10,
                            orderBy: ["createdAt_DESC"]
                        }, 
                    });
                    // Add loan request from the mutation to the end.
                    data.loanRequestsList.unshift(loanRequestCreate);
                    // Write our data back to the cache.
                    store.writeQuery({ 
                        query: LOAN_REQUESTS_LIST, 
                        variables: {
                            first: 10,
                            orderBy: ["createdAt_DESC"]
                        },
                        data
                    });
                }
            });

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
        const { children, dharmaProps } = this.props;
        return children(this.createLoanRequest, dharmaProps);
    }        
};


export default compose(
    withApollo, 
    withDharma
)(LoanRequestCreator);