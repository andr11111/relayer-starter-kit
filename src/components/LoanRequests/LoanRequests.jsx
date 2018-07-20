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
        dataField: "timestamp",
        text: "Requested at",
    },
];

class LoanRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loanRequests: [],
            highlightRow: false,
        };

        this.parseLoanRequests = this.parseLoanRequests.bind(this);
        this.parseLoanRequest = this.parseLoanRequest.bind(this);
    }

    componentDidMount() {
        const { highlightRow } = this.props;

        if (highlightRow) {
            setTimeout(() => {
                this.setState({
                    highlightRow: false,
                });
            }, 3000);
        }

        const api = new Api();

        api.get("loanRequests")
            .then(this.parseLoanRequests)
            .then((loanRequests) => this.setState({ loanRequests }))
            .catch((error) => console.error(error));
    }

    parseLoanRequests(loanRequestData) {
        return Promise.all(loanRequestData.map(this.parseLoanRequest));
    }

    parseLoanRequest(datum) {
        const { dharma } = this.props;

        const { LoanRequest } = Dharma.Types;

        return new Promise((resolve) => {
            LoanRequest.load(dharma, datum).then((loanRequest) => {
                resolve({
                    ...loanRequest.getTerms(),
                    id: datum.id,
                    timestamp: datum.createdAt,
                });
            });
        });
    }

    timeFromNow(unixTimestamp) {
        return moment.unix(unixTimestamp).fromNow();
    }

    getData() {
        const { loanRequests } = this.state;

        return loanRequests.map((request) => {
            return {
                ...request,
                expiration: this.timeFromNow(request.expiresAt),
                timestamp: moment(request.timestamp).calendar(),
            };
        });
    }

    render() {
        const { highlightRow } = this.state;

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                this.props.redirect(`/request/${row.id}`);
            },
        };

        const rowClasses = (row, rowIndex) => {
            if (rowIndex === 0 && highlightRow) {
                return "highlight";
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
