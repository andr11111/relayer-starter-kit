import React, { Component } from "react";
import Dharma from "@dharmaprotocol/dharma.js";

import DharmaContext from "./DharmaContext";

const dharma = new Dharma("http://localhost:8545");

/**
 * Allows any children of this provider to have access to an instance of Dharma.js that is
 * connected to a blockchain.
 */
class DharmaProvider extends Component {
    render() {
        return (
            <DharmaContext.Provider value={dharma}>{this.props.children}</DharmaContext.Provider>
        );
    }
}

export default DharmaProvider;
