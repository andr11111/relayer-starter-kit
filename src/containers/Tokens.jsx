import React, { Component } from "react";

import DharmaConsumer from "../contexts/Dharma/DharmaConsumer";

import Tokens from "../components/Tokens/Tokens";

class TokensContainer extends Component {
    render() {
        return (
            <DharmaConsumer>
                {(dharmaProps) => {
                    return <Tokens tokens={dharmaProps.tokens} />;
                }}
            </DharmaConsumer>
        );
    }
}

export default TokensContainer;