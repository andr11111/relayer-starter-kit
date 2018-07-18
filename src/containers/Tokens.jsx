import React, { Component } from "react";

import DharmaConsumer from "../contexts/Dharma/DharmaConsumer";

import Tokens from "../components/Tokens/Tokens";

class TokensContainer extends Component {
    render() {
        return (
            <DharmaConsumer>
                {(dharma) => {
                    return <Tokens dharma={dharma} />;
                }}
            </DharmaConsumer>
        );
    }
}

export default TokensContainer;
