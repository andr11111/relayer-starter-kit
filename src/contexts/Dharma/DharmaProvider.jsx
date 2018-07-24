import React, { Component } from "react";
import Dharma from "@dharmaprotocol/dharma.js";

import DharmaContext from "./DharmaContext";

const dharma = new Dharma("http://localhost:8545");

/**
 * Allows any children of this provider to have access to an instance of Dharma.js that is
 * connected to a blockchain.
 */
class DharmaProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // The tokens that the user has in their wallet.
            tokens: [],
            // The tokens available for lending on Dharma Protocol.
            supportedTokens: [],
        };
    }

    componentDidMount() {
        this.getUserTokens();
        this.getSupportedTokens();
    }

    getSupportedTokens() {
        dharma.token.getSupportedTokens().then((supportedTokens) => {
            this.setState({ supportedTokens });
        });
    }

    getUserTokens() {
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
        const dharmaProps = {
            dharma: dharma,
            tokens: this.state.tokens,
            supportedTokens: this.state.supportedTokens,
        };

        return (
            <DharmaContext.Provider value={dharmaProps}>
                {this.props.children}
            </DharmaContext.Provider>
        );
    }
}

export default DharmaProvider;
