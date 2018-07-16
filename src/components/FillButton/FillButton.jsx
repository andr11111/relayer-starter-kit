import React, { Component } from "react";
import { Button } from "react-bootstrap";

import "./FillButton.css";

class FillButton extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(element) {
        element.preventDefault();

        const { handleFill } = this.props;

        handleFill(element.target.dataset.id);
    }

    render() {
        const { loanRequestId } = this.props;

        return (
            <Button data-id={loanRequestId} bsStyle="primary" onClick={this.handleClick}>
                Fill
            </Button>
        );
    }
}

export default FillButton;
