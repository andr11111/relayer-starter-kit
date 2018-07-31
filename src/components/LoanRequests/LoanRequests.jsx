// External libraries
import * as moment from "moment";
import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button } from "react-bootstrap";

// Components
import Loading from "../Loading/Loading";

// Styling
import "./LoanRequests.css";

/**
 * Here we define the columns that appear in the table that holds all of the
 * open Loan Requests.
 */
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
            highlightRow: null,            
        };
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
        const { highlightRow } = this.props;

        this.setState({
            highlightRow,
        });
    }

    /**
     * Returns an array of loan requests, which can be rendered in a table.
     *
     * For each `LoanRequest` object from Dharma.js, it adds two human-readable timestamps - one
     * describing when the request was created, and one describing its expiration date.
     */
    getData() {
        const { loanRequests } = this.props;

        return loanRequests.map((request) => {
            return {
                ...request,
                expiration: moment.unix(request.expiresAt).fromNow(),
                requestedAt: moment(request.createdAt).calendar(),
            };
        });
    }

    render() {
        const { highlightRow } = this.state;
        const { isLoading, handleLoadMore } = this.props;

        const data = this.getData();

        if (isLoading) {
            return <Loading/>;
        }

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                this.props.redirect(`/request/${row.id}`);
            },
        };

        const rowClasses = (row, rowIndex) => {
            const rowData = data[rowIndex];
            
            if (parseInt(rowData.id, 10) === highlightRow) {
                return "loan-request-row highlight";
            } else {
                return "loan-request-row";
            }
        };

        return (
            <div>
                <BootstrapTable
                    hover={true}
                    keyField="id"
                    columns={columns}
                    data={data}
                    rowEvents={rowEvents}
                    rowClasses={rowClasses}
                />
                <Button type="submit" bsStyle="primary" onClick={handleLoadMore}>
                    Load More
                </Button>
            </div>
        );
    }
}

export default LoanRequests;
