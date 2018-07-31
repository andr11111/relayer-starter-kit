// External libraries
import { Component } from "react";
import Dharma from "@dharmaprotocol/dharma.js";
import { withApollo } from 'react-apollo';
import { compose } from 'react-apollo';

// Helpers
import withDharma from "./withDharma";

// API
import { LOAN_REQUEST } from "../services/graphql/queries"
 
class LoanRequestsLoader extends Component {
    constructor(props) {
        super(props);
        
        this.state = {            
            loanRequest: null,
            hasSufficientAllowance: null,
            transactions: [],
            error: null,
        };

        // handlers
        this.runFill = this.runFill.bind(this);
        this.runAuthorize = this.runAuthorize.bind(this);

        // setters
        this.reloadState = this.reloadState.bind(this);
        this.setHasSufficientAllowance = this.setHasSufficientAllowance.bind(this);
        this.assertFillable = this.assertFillable.bind(this);
        this.loadLoanRequest = this.loadLoanRequest.bind(this);
    }

    componentDidMount() {        
        this.loadLoanRequest();
    }

    reloadState() {
        this.setHasSufficientAllowance();
        this.assertFillable();
    }

    async loadLoanRequest() {
        const { dharmaProps: { dharma }, id, client } = this.props;        
        const { LoanRequest } = Dharma.Types;
        let { data: { loanRequest } } = await client.query({ query: LOAN_REQUEST, variables: { id } });
                
        // Temporary hack until we implemnent JSON field type
        loanRequest = {
            ...loanRequest,
            debtorSignature: JSON.parse(loanRequest.debtorSignature),
            creditorSignature: JSON.parse(loanRequest.creditorSignature),
            underwriterSignature: JSON.parse(loanRequest.underwriterSignature)
        };

        const loanRequestInstance = await LoanRequest.load(dharma, loanRequest);
        this.setState({ loanRequest: loanRequestInstance });
        this.reloadState();        
    }
    
    async runFill() {
        const { loanRequest } = this.state;

        loanRequest
            .fill()
            .then((txHash) => {
                const { transactions } = this.state;
                transactions.push({ txHash, description: "Loan Request Fill" });

                this.setState({
                    transactions,
                });
            })
            .catch((error) => {
                this.setState({
                    error,
                });
            });
    }

    async runAuthorize() {
        const { loanRequest, transactions } = this.state;

        const txHash = await loanRequest.allowPrincipalTransfer();

        transactions.push({ txHash, description: "Authorize Loan Request" });

        this.setState({
            transactions,
        });
    }

    async assertFillable() {
        const { loanRequest } = this.state;

        loanRequest
            .assertFillable()
            .then(() => {
                this.setState({
                    error: null,
                });
            })
            .catch((error) => {
                this.setState({
                    error,
                });
            });
    }

    async setHasSufficientAllowance() {
        const { dharmaProps: { dharma } } = this.props;
        const { loanRequest } = this.state;

        const { Tokens } = Dharma.Types;

        const accounts = await dharma.blockchain.getAccounts();
        const currentAccount = accounts[0];

        const tokens = new Tokens(dharma, currentAccount);
        const terms = loanRequest.getTerms();

        const tokenData = await tokens.getTokenDataForSymbol(terms.principalTokenSymbol);

        const hasSufficientAllowance =
            tokenData.hasUnlimitedAllowance || tokenData.allowance >= terms.principalAmount;

        this.setState({
            hasSufficientAllowance,
        });
    }    
    
    render() {
        const { children, dharmaProps } = this.props;
        const loanRequestProps = {
            loanRequest: this.state.loanRequest,
            hasSufficientAllowance: this.state.hasSufficientAllowance,
            transactions: this.state.transactions,
            error: this.state.error,
            runFill: this.runFill,
            runAuthorize: this.runAuthorize
        }
        
        return children(loanRequestProps, dharmaProps);
    }
  };

export default compose(
    withApollo, 
    withDharma
)(LoanRequestsLoader);