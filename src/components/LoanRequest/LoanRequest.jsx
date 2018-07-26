import Dharma from "@dharmaprotocol/dharma.js";
import React, { Component } from "react";

import Api from "../../services/api";

import Actions from "./Actions/Actions";
import Terms from "./Terms/Terms";
import NotFillableAlert from "./Alert/NotFillableAlert";

import TransactionManager from "../TransactionManager/TransactionManager";
import Loading from "../Loading/Loading";

import "./LoanRequest.css";

import { LinkContainer } from "react-router-bootstrap";

import { Breadcrumb, Panel } from "react-bootstrap";

class LoanRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loanRequest: null,
            hasSufficientAllowance: null,
            transactions: [],
            error: null,
        };

        // handlers
        this.handleFill = this.handleFill.bind(this);
        this.handleAuthorize = this.handleAuthorize.bind(this);

        // setters
        this.reloadState = this.reloadState.bind(this);
        this.setHasSufficientAllowance = this.setHasSufficientAllowance.bind(this);
        this.assertFillable = this.assertFillable.bind(this);
    }

    componentDidMount() {
        const { LoanRequest } = Dharma.Types;

        const { dharma, id } = this.props;

        const api = new Api();

        api.get(`loanRequests/${id}`).then(async (loanRequestData) => {
            const loanRequest = await LoanRequest.load(dharma, loanRequestData);
            this.setState({ loanRequest });
            this.reloadState();
        });
    }

    reloadState() {
        this.setHasSufficientAllowance();
        this.assertFillable();
    }

    async handleFill() {
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

    async handleAuthorize() {
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
        const { dharma } = this.props;
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
        const { loanRequest, hasSufficientAllowance, transactions, error } = this.state;

        const { dharma } = this.props;

        if (!loanRequest || hasSufficientAllowance === null) {
            return <Loading />;
        }

        return (
            <div>
                <Breadcrumb>
                    <LinkContainer to="/" exact={true}>
                        <Breadcrumb.Item href="#">&lsaquo; All Requests</Breadcrumb.Item>
                    </LinkContainer>

                    <Breadcrumb.Item active>Details</Breadcrumb.Item>
                </Breadcrumb>

                {error && <NotFillableAlert>{error.message}</NotFillableAlert>}

                {transactions.map((transaction) => {
                    const { txHash, description } = transaction;

                    return (
                        <TransactionManager
                            key={txHash}
                            txHash={txHash}
                            dharma={dharma}
                            description={description}
                            onSuccess={this.reloadState}
                        />
                    );
                })}

                <Panel bsStyle="primary">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Loan Request</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <Terms terms={loanRequest.getTerms()} />
                    </Panel.Body>
                    <Panel.Footer>
                        <Actions
                            canFill={!error && hasSufficientAllowance}
                            canAuthorize={!hasSufficientAllowance}
                            onFill={this.handleFill}
                            onAuthorize={this.handleAuthorize}
                        />
                    </Panel.Footer>
                </Panel>
            </div>
        );
    }
}

export default LoanRequest;
