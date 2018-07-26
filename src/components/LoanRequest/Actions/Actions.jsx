import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Actions extends Component {
    handleClick(event, callback) {
        event.preventDefault();

        callback();
    }

    render() {
        const { canFill, canAuthorize, onFill, onAuthorize } = this.props;

        return (
            <div>
                <Button
                    onClick={(event) => this.handleClick(event, onAuthorize)}
                    disabled={!canAuthorize}
                    bsStyle="primary">
                    Authorize
                </Button>

                <Button
                    onClick={(event) => this.handleClick(event, onFill)}
                    disabled={!canFill}
                    bsStyle="primary">
                    Fill
                </Button>
            </div>
        );
    }
}

export default Actions;
