import gql from "graphql-tag";

export const LOAN_REQUEST_CREATE = gql`
    mutation loanRequestCreate($data: LoanRequestCreateInput) {
        loanRequestCreate(data: $data) {
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
            underwriterFee
            underwriterRiskRating
            salt
            debtorSignature
            creditorSignature
            underwriterSignature            
        }
    }
`