import React, { Component } from "react";
import { FormControl } from "react-bootstrap";

class TokenSelect extends Component {
    getTokens() {
        return [
            {
                name: "Augur REP",
                value: "REP",
            },
            {
                name: "Wrapped Ether",
                value: "WETH",
            },
            {
                name: "0x",
                value: "ZRX",
            },
        ];
    }

    render() {
        const { name, onChange, defaultValue } = this.props;

        const tokens = this.getTokens();

        return (
            <FormControl
                name={name}
                onChange={onChange}
                componentClass="select"
                placeholder="select"
                defaultValue={defaultValue}>
                {tokens.map((token) => (
                    <option key={token.value} value={token.value}>
                        {token.name}
                    </option>
                ))}
            </FormControl>
        );
    }
}

export default TokenSelect;
