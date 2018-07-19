import Dharma from "@dharmaprotocol/dharma.js";
import React, { Component } from "react";
import { Table } from "react-bootstrap";

class Tokens extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tokens: [],
        };
    }

    componentDidMount() {
        const { dharma } = this.props;

        const { Tokens } = Dharma.Types;

        dharma.blockchain.getAccounts().then((accounts) => {
            const owner = accounts[0];

            const tokens = new Tokens(dharma, owner);

            tokens.get().then((tokenData) => {
                this.setState({
                    tokens: tokenData,
                });
            });
        });
    }

    render() {
        const { tokens } = this.state;

        return (
            <Table striped bordered condensed hover responsive>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Balance</th>
                        <th>Allowance</th>
                    </tr>
                </thead>

                <tbody>
                    {tokens.map((token) => {
                        return (
                            <tr key={token.symbol}>
                                <td>{token.symbol}</td>
                                <td>{token.balance}</td>
                                <td>
                                    {token.hasUnlimitedAllowance ? "Unlimited" : token.allowance}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}

export default Tokens;
