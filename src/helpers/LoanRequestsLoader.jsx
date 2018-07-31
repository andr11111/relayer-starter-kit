// External libraries
import Dharma from "@dharmaprotocol/dharma.js";
import { Component } from "react";
import { withApollo } from 'react-apollo';
import { compose } from 'react-apollo';

// Helpers
import withDharma from "../helpers/withDharma";

// API
import { LOAN_REQUESTS_LIST } from "../services/graphql/queries"

class LoanRequestsLoader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loanRequests: [],    
            isLoading: true,    
            query: null,
            subscription: null
        };

        this.parseLoanRequests = this.parseLoanRequests.bind(this);
        this.parseLoanRequest = this.parseLoanRequest.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }

    /**
     * When the component mounts, use the API to get all of the load requests from the relayer
     * database, and parse those into LoanRequest objects using Dharma.js. Then, set the state of
     * the current component to include those loan requests so that they can be rendered as a table.
     *
     * This function assumes that there is a database with Loan Request data, and that we have
     * access to Dharma.js, which is connected to a blockchain.
     */
    async componentDidMount() {
        // Get ApolloClient instance        
        const { client } = this.props;        
        try {
            const query = client.watchQuery({ 
                query: LOAN_REQUESTS_LIST,
                variables: {
                    first: 10,
                    orderBy: ["createdAt_DESC"]
                }                
            });
            const subscription = query.subscribe({
                next: async ({ data }) => {                    
                    if (data) {
                        const { loanRequestsList } = data;                        
                        const loanRequests = await this.parseLoanRequests(loanRequestsList);
                        this.setState({ loanRequests, isLoading: false });    
                    }                    
                },
                error: (err) => { console.log(`Finished with error: ${ err }`) },
                complete: () => { console.log('Finished') }
              });
            
              await query.result();
                        
            this.setState({ query, subscription });
        } catch(error) {
            console.error(error)
        }
    }

    componentWillUnmount() {
        const { subscription } = this.state;
        subscription.unsubscribe();
    }
    
    async loadMore() {        
        const { query, loanRequests } = this.state;
        query.fetchMore({
            variables: {
                skip: loanRequests.length  
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                    loanRequestsList: [...prev.loanRequestsList, ...fetchMoreResult.loanRequestsList]
                });
            }            
        });
    }

    parseLoanRequests(loanRequestData) {
        return Promise.all(loanRequestData.map(this.parseLoanRequest));
    }

    /**
     * Given loan data that comes from the relayer database, `parseLoanRequest` uses Dharma.js to
     * instantiate a `LoanRequest` type, which has access to more information about the loan. It
     * then adds an id and requestedAt (both from the relayer database) to that object.
     *
     * @param datum
     * @returns {Promise<any>}
     */
    parseLoanRequest(datum) {
        const { dharmaProps: { dharma } } = this.props;

        const { LoanRequest } = Dharma.Types;

        return new Promise((resolve) => {
            LoanRequest.load(dharma, datum).then((loanRequest) => {
                resolve({
                    ...loanRequest.getTerms(),
                    id: datum.id,
                    createdAt: datum.createdAt,
                });
            });
        });
    }

    render() {
        const { children, dharmaProps } = this.props;
        const loanRequestProps = {
            loanRequests: this.state.loanRequests,
            isLoading: this.state.isLoading,
            loadMore: this.loadMore
        };
        return children(loanRequestProps, dharmaProps);
    }
}

export default compose(
    withApollo, 
    withDharma
)(LoanRequestsLoader);
