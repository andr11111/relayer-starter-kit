import React, { Component } from "react";
import { Alert } from "react-bootstrap";

import "./NotFillableAlert.css";

class NotFillableAlert extends Component {
    render() {
        return (
            <Alert className="NotFillableAlert" bsStyle="danger">
                <h4>This loan request cannot be filled</h4>
                <p>{this.props.children}</p>
            </Alert>
        );
    }
}

export default NotFillableAlert;
