import React, { Component } from "react";
import Dharma from "@dharmaprotocol/dharma.js";

const dharma = new Dharma("http://localhost:8545");

export const DharmaContext = React.createContext();

class DharmaProvider extends Component {
    render() {
        return (
            <DharmaContext.Provider value={dharma}>{this.props.children}</DharmaContext.Provider>
        );
    }
}

export default DharmaProvider;
