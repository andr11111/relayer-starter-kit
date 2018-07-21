import React, { Component } from "react";
import Dharma from "@dharmaprotocol/dharma.js";

import DharmaContext from "./DharmaContext";

const dharma = new Dharma();

class DharmaProvider extends Component {
    render() {
        return (
            <DharmaContext.Provider value={dharma}>{this.props.children}</DharmaContext.Provider>
        );
    }
}

export default DharmaProvider;
