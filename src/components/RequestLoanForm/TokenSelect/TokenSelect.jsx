import React, { Component } from "react";
import { FormControl } from "react-bootstrap";

class TokenSelect extends Component {
    getTokens() {
        return [
            {
                label: "Augur REP",
                value: "REP",
            },
            {
                label: "Wrapped Ether",
                value: "WETH",
            },
            {
                label: "0x",
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
                        {token.label}
                    </option>
                ))}
            </FormControl>
        );
    }
}

export default TokenSelect;
