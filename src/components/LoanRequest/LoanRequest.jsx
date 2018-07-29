import React, { Component } from "react";

import Actions from "./Actions/Actions";
import Terms from "./Terms/Terms";
import NotFillableAlert from "./Alert/NotFillableAlert";

import TransactionManager from "../TransactionManager/TransactionManager";
import Loading from "../Loading/Loading";

import "./LoanRequest.css";

import { LinkContainer } from "react-router-bootstrap";

import { Breadcrumb, Panel } from "react-bootstrap";

class LoanRequest extends Component {
    render() {
        const { dharma, loanRequest, hasSufficientAllowance, transactions, error, handleAuthorize, handleFill } = this.props;        

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
                            onFill={handleFill}
                            onAuthorize={handleAuthorize}
                        />
                    </Panel.Footer>
                </Panel>
            </div>
        );
    }
}

export default LoanRequest;
