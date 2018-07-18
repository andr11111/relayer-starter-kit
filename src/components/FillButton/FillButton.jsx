import React, { Component } from "react";
import { Button } from "react-bootstrap";

import "./FillButton.css";

class FillButton extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event, loanRequestId) {
        event.preventDefault();

        console.log(loanRequestId);

        const { handleFill } = this.props;

        handleFill(loanRequestId);
    }

    render() {
        const { loanRequestId, disabled } = this.props;

        console.log(loanRequestId);

        return (
            <Button
                data-id={loanRequestId}
                bsStyle="primary"
                onClick={(event) => this.handleClick(event, loanRequestId)}
                disabled={disabled}
            >
                Fill
            </Button>
        );
    }
}

export default FillButton;
