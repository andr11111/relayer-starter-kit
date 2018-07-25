import React, { Component } from "react";
import { Table } from "react-bootstrap";

class Tokens extends Component {
    render() {
        const { tokens } = this.props;

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