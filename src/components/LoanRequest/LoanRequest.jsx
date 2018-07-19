import Dharma from "@dharmaprotocol/dharma.js";
import React, { Component } from "react";
import * as moment from "moment";

import Api from "../../services/api";
import FillButton from "../FillButton/FillButton";

import { Link } from "react-router-dom";

import { Button, Glyphicon } from "react-bootstrap";

class LoanRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loanRequest: null,
            hasSufficientAllowance: null,
            isFilled: null,
            isFillable: null,
        };

        this.handleFill = this.handleFill.bind(this);
        this.handleAuthorize = this.handleAuthorize.bind(this);
        this.setHasSufficientAllowance = this.setHasSufficientAllowance.bind(this);
        this.setIsFilled = this.setIsFilled.bind(this);
        this.setIsFillable = this.setIsFillable.bind(this);
    }

    componentDidMount() {
        const { LoanRequest } = Dharma.Types;

        const { dharma, id } = this.props;

        const api = new Api();

        api.get(`loanRequests/${id}`).then(async (loanRequestData) => {
            const loanRequest = await LoanRequest.load(dharma, loanRequestData);

            this.setState({ loanRequest });

            this.setHasSufficientAllowance();
            this.setIsFilled();
            this.setIsFillable();
        });
    }

    isExpired(unixTimestamp) {
        return moment.unix(unixTimestamp).isBefore();
    }

    async handleFill() {
        const { dharma } = this.props;

        const { loanRequest } = this.state;

        const txHash = await loanRequest.fill();

        dharma.blockchain.awaitTransactionMinedAsync(txHash).then(() => {
            this.setState({
                isFilled: true,
            });
        });
    }

    async handleAuthorize() {
        const { dharma } = this.props;

        const { loanRequest } = this.state;

        const txHash = await loanRequest.allowPrincipalTransfer();

        dharma.blockchain.awaitTransactionMinedAsync(txHash).then(() => {
            this.setState({
                hasSufficientAllowance: true,
            });
        });
    }

    async setIsFillable() {
        const { loanRequest } = this.state;

        loanRequest.isFillable().then((isFillable) => {
            this.setState({
                isFillable,
            });
        });
    }

    async setIsFilled() {
        const { loanRequest } = this.state;

        loanRequest.isFilled().then((isFilled) => {
            this.setState({
                isFilled,
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
        const { loanRequest, hasSufficientAllowance, isFilled, isFillable } = this.state;

        if (
            !loanRequest ||
            hasSufficientAllowance === null ||
            isFilled === null ||
            isFillable === null
        ) {
            // TODO(kayvon): show loading state here
            return null;
        }

        const terms = loanRequest.getTerms();
        const isExpired = this.isExpired(terms.expiresAt);

        return (
            <div>
                <div>
                    <Link to="/">Back</Link>
                </div>

                <dl className="row">
                    <dt className="col-sm-3">Principal</dt>
                    <dd className="col-sm-9">
                        {`${terms.principalAmount} ${terms.principalTokenSymbol}`}
                    </dd>

                    <dt className="col-sm-3">Collateral</dt>
                    <dd className="col-sm-9">
                        {`${terms.collateralAmount} ${terms.collateralTokenSymbol}`}
                    </dd>

                    <dt className="col-sm-3">Interest Rate</dt>
                    <dd className="col-sm-9">{terms.interestRate}%</dd>

                    <dt className="col-sm-3">Term Duration</dt>
                    <dd className="col-sm-9">{`${terms.termDuration} ${terms.termUnit}`}</dd>

                    <dt className="col-sm-3">Loan Requester</dt>
                    <dd className="col-sm-9">
                        <a
                            href={`https://etherscan.io/address/${terms.debtorAddress}`}
                            target="_blank">
                            {terms.debtorAddress}
                        </a>
                    </dd>

                    <dt className="col-sm-3">Valid Until</dt>
                    <dd className="col-sm-9">{moment.unix(terms.expiresAt).calendar()}</dd>

                    {isExpired && (
                        <div>
                            <dt className="col-sm-3">Expired</dt>
                            <dd className="col-sm-9">
                                <Glyphicon glyph="ok" className="text-success" />
                            </dd>
                        </div>
                    )}

                    {isFilled && (
                        <div>
                            <dt className="col-sm-3">Filled</dt>
                            <dd className="col-sm-9">
                                <Glyphicon glyph="ok" className="text-success" />
                            </dd>
                        </div>
                    )}
                </dl>

                {isFillable || (
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
                )}
            </div>
        );
    }
}

export default LoanRequest;
