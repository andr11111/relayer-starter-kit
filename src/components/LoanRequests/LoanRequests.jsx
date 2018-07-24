import Dharma from "@dharmaprotocol/dharma.js";
import * as moment from "moment";
import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";

import Api from "../../services/api";

import "./LoanRequests.css";

const columns = [
    {
        dataField: "principalAmount",
        text: "Principal",
    },
    {
        dataField: "principalTokenSymbol",
        text: "Principal Token Symbol",
    },
    {
        dataField: "interestRate",
        text: "Interest Rate",
    },
    {
        dataField: "termDuration",
        text: "Term Length",
    },
    {
        dataField: "collateralAmount",
        text: "Collateral",
    },
    {
        dataField: "collateralTokenSymbol",
        text: "Collateral Token Symbol",
    },
    {
        dataField: "expiration",
        text: "Expiration",
    },
    {
        dataField: "requestedAt",
        text: "Requested at",
    },
];

class LoanRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loanRequests: [],
            shouldHighlightRow: false,
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
        const { shouldHighlightRow } = this.props;

        this.setState({
            shouldHighlightRow,
        });

        const api = new Api();

        api.get("loanRequests")
            .then(this.parseLoanRequests)
            .then((loanRequests) => this.setState({ loanRequests }))
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
        const { dharma } = this.props;

        const { LoanRequest } = Dharma.Types;

        return new Promise((resolve) => {
            LoanRequest.load(dharma, datum).then((loanRequest) => {
                resolve({
                    ...loanRequest.getTerms(),
                    id: datum.id,
                    requestedAt: datum.createdAt,
                });
            });
        });
    }

    /**
     * Returns an array of loan requests, which can be rendered in a table.
     *
     * For each `LoanRequest` object from Dharma.js, it adds two human-readable requestedAts - one
     * describing when the request was created, and one describing its expiration date.
     */
    getData() {
        const { loanRequests } = this.state;

        return loanRequests.map((request) => {
            return {
                ...request,
                expiration: moment.unix(request.expiresAt).fromNow(),
                requestedAt: moment(request.requestedAt).calendar(),
            };
        });
    }

    render() {
        const { shouldHighlightRow } = this.state;

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                this.props.redirect(`/request/${row.id}`);
            },
        };

        const rowClasses = (row, rowIndex) => {
            if (rowIndex === 0 && shouldHighlightRow) {
                return "loan-request-row highlight";
            } else {
                return "loan-request-row";
            }
        };

        return (
            <BootstrapTable
                hover={true}
                keyField="id"
                columns={columns}
                data={this.getData()}
                rowEvents={rowEvents}
                rowClasses={rowClasses}
            />
        );
    }
}

export default LoanRequests;
