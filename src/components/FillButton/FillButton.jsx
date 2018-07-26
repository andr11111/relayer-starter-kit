// External libraries
import React, { Component } from "react";
import { Button } from "react-bootstrap";

// Styling
import "./FillButton.css";

class FillButton extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();

        this.props.handleFill();
    }

    render() {
        const { disabled } = this.props;

        return (
            <Button bsStyle="primary" onClick={this.handleClick} disabled={disabled}>
                Fill
            </Button>
        );
    }
}

export default FillButton;
