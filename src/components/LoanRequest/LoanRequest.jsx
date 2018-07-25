import Dharma from "@dharmaprotocol/dharma.js";
import React, { Component } from "react";

import Api from "../../services/api";

import FillButton from "../FillButton/FillButton";
import Terms from "./Terms/Terms";
import NotFillableAlert from "./Alert/NotFillableAlert";

import "./LoanRequest.css";

import { LinkContainer } from "react-router-bootstrap";

import { Breadcrumb, Button, Glyphicon, Panel } from "react-bootstrap";

class LoanRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loanRequest: null,
            hasSufficientAllowance: null,
            isFilled: null,
            isFillable: null,
            isMiningTx: false,
            error: null,
        };

        // handlers
        this.handleFill = this.handleFill.bind(this);
        this.handleAuthorize = this.handleAuthorize.bind(this);

        // setters
        this.reloadState = this.reloadState.bind(this);
        this.setHasSufficientAllowance = this.setHasSufficientAllowance.bind(this);
        this.setIsFillable = this.setIsFillable.bind(this);
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
        this.setIsFillable();
    }

    async handleFill() {
        const { dharma } = this.props;

        const { loanRequest } = this.state;

        this.setState({
            isMiningTx: true,
        });

        loanRequest
            .fill()
            .then((txHash) => {
                dharma.blockchain.awaitTransactionMinedAsync(txHash).then(() => {
                    this.setState({
                        isFilled: true,
                        isFillable: false,
                        isMiningTx: false,
                    });
                });
            })
            .catch((error) => {
                this.setState({
                    isMiningTx: false,
                    error,
                });
            });
    }

    async handleAuthorize() {
        const { dharma } = this.props;

        const { loanRequest } = this.state;

        this.setState({
            isMiningTx: true,
        });

        const txHash = await loanRequest.allowPrincipalTransfer();

        dharma.blockchain.awaitTransactionMinedAsync(txHash).then(() => {
            this.setState({
                hasSufficientAllowance: true,
                isMiningTx: false,
            });
        });
    }

    async setIsFillable() {
        const { loanRequest } = this.state;

        loanRequest
            .assertFillable()
            .then(() => {
                this.setState({
                    isFillable: true,
                });
            })
            .catch((error) => {
                this.setState({
                    isFillable: false,
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
        const {
            loanRequest,
            hasSufficientAllowance,
            isFilled,
            isFillable,
            error,
            isMiningTx,
        } = this.state;

        if (
            !loanRequest ||
            hasSufficientAllowance === null ||
            isFilled === null ||
            isFillable === null
        ) {
            // TODO(kayvon): show loading state here
            return null;
        }

        const loanRequestStatus = (
            <div>
                <dl className="row">
                    {isFilled && (
                        <div>
                            <dt className="col-sm-3">Filled</dt>
                            <dd className="col-sm-9">
                                <Glyphicon glyph="ok" className="text-success" />
                            </dd>
                        </div>
                    )}
                </dl>
            </div>
        );

        const loanRequestActions = (
            <div>
                {hasSufficientAllowance ? (
                    <FillButton handleFill={this.handleFill} />
                ) : (
                    <div>
                        <Button onClick={this.handleAuthorize} bsStyle="primary">
                            Authorize
                        </Button>
                    </div>
                )}
            </div>
        );

        return (
            <div>
                <Breadcrumb>
                    <LinkContainer to="/" exact={true}>
                        <Breadcrumb.Item href="#">&lsaquo; All Requests</Breadcrumb.Item>
                    </LinkContainer>

                    <Breadcrumb.Item active>Details</Breadcrumb.Item>
                </Breadcrumb>

                {error && <NotFillableAlert>{error.message}</NotFillableAlert>}

                <Panel bsStyle="primary">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Loan Request</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <Terms terms={loanRequest.getTerms()} />
                        {loanRequestStatus}
                    </Panel.Body>

                    {isFillable && (
                        <Panel.Footer>
                            {isMiningTx ? <span>Mining Transaction...</span> : loanRequestActions}
                        </Panel.Footer>
                    )}
                </Panel>
            </div>
        );
    }
}

export default LoanRequest;
