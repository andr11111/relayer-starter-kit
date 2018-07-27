import React, { Component } from "react";
import { Button } from "react-bootstrap";

// Styling
import "./Actions.css";

class Actions extends Component {
    handleClick(event, callback) {
        event.preventDefault();

        callback();
    }

    render() {
        const { canFill, canAuthorize, onFill, onAuthorize } = this.props;

        return (
            <div className="Actions">
                <Button
                    onClick={(event) => this.handleClick(event, onAuthorize)}
                    disabled={!canAuthorize}
                    bsStyle="primary"
                    className="Actions-Authorize">
                    Authorize Token Transfer
                </Button>

                <Button
                    onClick={(event) => this.handleClick(event, onFill)}
                    disabled={!canFill}
                    bsStyle="primary"
                    className="Actions-Fill">
                    Fill Loan
                </Button>
            </div>
        );
    }
}

export default Actions;
