// External libraries
import Dharma from "@dharmaprotocol/dharma.js";
import { Component } from "react";

// Services
import Api from "../services/api";

// HOCs
import withDharma from "../helpers/withDharma";


class LoanRequestsLoader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loanRequests: [],    
            isLoading: true,    
        };

        this.parseLoanRequests = this.parseLoanRequests.bind(this);
        this.parseLoanRequest = this.parseLoanRequest.bind(this);
    }

    /**
     * When the component mounts, use the API to get all of the load requests from the relayer
     * database, and parse those into LoanRequest objects using Dharma.js. Then, set the state of
     * the current component to include those loan requests so that they can be rendered as a table.
     *
     * This function assumes that there is a database with Loan Request data, and that we have
     * access to Dharma.js, which is connected to a blockchain.
     */
    componentDidMount() {
        const api = new Api();

        api.get("loanRequests")
            .then(this.parseLoanRequests)
            .then((loanRequests) => this.setState({ loanRequests, isLoading: false }))
            .catch((error) => console.error(error));
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
            isLoading: this.state.isLoading
        };
        return children(loanRequestProps, dharmaProps);
    }
}

export default withDharma(LoanRequestsLoader);
