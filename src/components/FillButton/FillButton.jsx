import React, { Component } from "react";

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
            <button data-id={loanRequestId} onClick={this.handleClick}>
                Fill
            </button>
        );
    }
}

export default FillButton;
