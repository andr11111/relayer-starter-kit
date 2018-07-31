import gql from "graphql-tag";


export const LOAN_REQUESTS_LIST = gql`
    query loanRequestsList($filter: LoanRequestFilter, $orderBy: [LoanRequestOrderBy], $after: String, $before: String, $first: Int, $last: Int, $skip: Int) {
        loanRequestsList(filter: $filter, orderBy: $orderBy, after: $after, before: $before, first: $first, last: $last, skip: $skip) {
            id
            createdAt
            updatedAt
            createdBy
            principalAmount
            expirationTimestampInSec
            principalToken
            termsContract
            termsContractParameters
            kernelVersion
            issuanceVersion
            debtor
            debtorFee
            creditor
            creditorFee
            relayer
            relayerFee
            underwriter
            underwriterRiskRating
            salt
            debtorSignature
            creditorSignature
            underwriterFee
            underwriterSignature
                  
        }
    }
`

export const LOAN_REQUEST = gql`
    query loanRequest($id: ID!) {
        loanRequest(id: $id) {
            id
            createdAt
            updatedAt
            createdBy
            principalAmount
            expirationTimestampInSec
            principalToken
            termsContract
            termsContractParameters
            kernelVersion
            issuanceVersion
            debtor
            debtorFee
            creditor
            creditorFee
            relayer
            relayerFee
            underwriter
            underwriterRiskRating
            salt
            debtorSignature
            creditorSignature
            underwriterFee
            underwriterSignature
            _description
            id
            __typename
        }
    }
`