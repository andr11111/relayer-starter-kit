import React, { Component } from "react";
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from "react-bootstrap";

import "./RequestLoanForm.css";

class RequestLoanForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            principal: 0,
            principalTokenSymbol: "",
            collateral: 0,
            collateralTokenSymbol: "",
            interestRate: 0,
            termLength: 0,
            termLengthUnit: "",
            expirationLength: 0,
            expirationUnit: "",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        await this.props.createLoanRequest(this.state);
    }

    render() {
        const { disableForm } = this.props;
        const { principal, collateral, termLength, interestRate } = this.state;

        return (
            <Col md={6}>
                <Form horizontal>
                    <FormGroup controlId="principal">
                        <Col componentClass={ControlLabel} sm={3}>
                            Principal
                        </Col>
                        <Col sm={6}>
                            <FormControl type="number" placeholder="Principal" />
                        </Col>
                        <Col sm={2}>
                            <FormControl componentClass="select" placeholder="select">
                                <option value="WETH">WETH</option>
                                <option value="REP">REP</option>
                                <option value="ZRX">ZRX</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="collateral">
                        <Col componentClass={ControlLabel} sm={3}>
                            Collateral
                        </Col>
                        <Col sm={6}>
                            <FormControl type="number" placeholder="Collateral" />
                        </Col>
                        <Col sm={2}>
                            <FormControl componentClass="select" placeholder="select">
                                <option value="WETH">WETH</option>
                                <option value="REP">REP</option>
                                <option value="ZRX">ZRX</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="term">
                        <Col componentClass={ControlLabel} sm={3}>
                            Term Length
                        </Col>
                        <Col sm={6}>
                            <FormControl type="number" placeholder="Term Length" />
                        </Col>
                        <Col sm={2}>
                            <FormControl componentClass="select" placeholder="select">
                                <option value="hours">Hour</option>
                                <option value="days">Day</option>
                                <option value="weeks">Week</option>
                                <option value="months">Month</option>
                                <option value="years">Year</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="interest">
                        <Col componentClass={ControlLabel} sm={3}>
                            Interest Rate
                        </Col>
                        <Col sm={8}>
                            <FormControl type="number" placeholder="Interest Rate" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="expiration">
                        <Col componentClass={ControlLabel} sm={3}>
                            Expiration
                        </Col>
                        <Col sm={6}>
                            <FormControl type="number" placeholder="Expiration" />
                        </Col>
                        <Col sm={2}>
                            <FormControl componentClass="select" placeholder="select">
                                <option value="hours">Hour</option>
                                <option value="days">Day</option>
                                <option value="weeks">Week</option>
                                <option value="months">Month</option>
                                <option value="years">Year</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">Create</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        );
    }
}

export default RequestLoanForm;
