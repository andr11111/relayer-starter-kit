import React, { Component } from "react";
import { Table } from "react-bootstrap";

class TokenPermissions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tokens: [
                {
                    symbol: "REP",
                    balance: 100,
                    enabled: true,
                },
                {
                    symbol: "ZRX",
                    balance: 250,
                    enabled: false,
                },
            ],
        };
    }

    render() {
        const { tokens } = this.state;

        return (
            <Table striped bordered condensed hover responsive>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Balance</th>
                        <th>Enabled</th>
                    </tr>
                </thead>

                <tbody>
                    {tokens.map((token, i) => {
                        return (
                            <tr key={i}>
                                <td>{token.symbol}</td>
                                <td>{token.balance}</td>
                                <td>{`${token.enabled}`}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}

export default TokenPermissions;
