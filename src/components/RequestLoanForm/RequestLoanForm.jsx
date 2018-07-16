import React, {Component} from "react";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";

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
            termUnit: "",
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
        const {disableForm} = this.props;

        const {
            principal,
            collateral,
            termLength,
            interestRate,
            expirationUnit,
            expirationLength
        } = this.state;

        const labelWidth = 3;
        const dropdownWidth = 3;
        const inputWidth = 6;

        return (
            <Col md={6}>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FormGroup controlId="principal">
                        <Col componentClass={ControlLabel} sm={labelWidth}>
                            Principal
                        </Col>
                        <Col sm={inputWidth}>
                            <FormControl
                                onChange={this.handleInputChange}
                                type="number"
                                placeholder="Principal"
                                name="principal"
                                value={principal}
                            />
                        </Col>
                        <Col sm={dropdownWidth}>
                            <FormControl
                                name="principalTokenSymbol"
                                onChange={this.handleInputChange}
                                componentClass="select"
                                placeholder="select"
                            >
                                <option value="WETH">WETH</option>
                                <option value="REP">REP</option>
                                <option value="ZRX">ZRX</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="collateral">
                        <Col componentClass={ControlLabel} sm={labelWidth}>
                            Collateral
                        </Col>
                        <Col sm={inputWidth}>
                            <FormControl
                                onChange={this.handleInputChange}
                                type="number"
                                name="collateral"
                                placeholder="Collateral"
                                value={collateral}
                            />
                        </Col>
                        <Col sm={dropdownWidth}>
                            <FormControl
                                onChange={this.handleInputChange}
                                name="collateralTokenSymbol"
                                componentClass="select"
                                placeholder="select"
                            >
                                <option value="WETH">WETH</option>
                                <option value="REP">REP</option>
                                <option value="ZRX">ZRX</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="term">
                        <Col componentClass={ControlLabel} sm={labelWidth}>
                            Term Length
                        </Col>
                        <Col sm={inputWidth}>
                            <FormControl
                                onChange={this.handleInputChange}
                                type="number"
                                placeholder="Term Length"
                                name="termLength"
                                value={termLength}
                            />
                        </Col>
                        <Col sm={dropdownWidth}>
                            <FormControl
                                onChange={this.handleInputChange}
                                componentClass="select"
                                placeholder="select"
                                name="termUnit"
                            >
                                <option value="hours">Hour</option>
                                <option value="days">Day</option>
                                <option value="weeks">Week</option>
                                <option value="months">Month</option>
                                <option value="years">Year</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="interest">
                        <Col componentClass={ControlLabel} sm={labelWidth}>
                            Interest Rate
                        </Col>
                        <Col sm={inputWidth}>
                            <FormControl
                                onChange={this.handleInputChange}
                                type="number"
                                placeholder="Interest Rate"
                                name="interestRate"
                                value={interestRate}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="expiration">
                        <Col componentClass={ControlLabel} sm={labelWidth}>
                            Expiration
                        </Col>
                        <Col sm={inputWidth}>
                            <FormControl
                                onChange={this.handleInputChange}
                                type="number"
                                placeholder="Expiration"
                                name="expirationLength"
                                value={expirationLength}
                            />
                        </Col>
                        <Col sm={dropdownWidth}>
                            <FormControl
                                onChange={this.handleInputChange}
                                componentClass="select"
                                placeholder="select"
                                name="expirationUnit"
                            >
                                <option value="hours">Hour</option>
                                <option value="days">Day</option>
                                <option value="weeks">Week</option>
                                <option value="months">Month</option>
                                <option value="years">Year</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={labelWidth} sm={10}>
                            <Button type="submit" bsStyle="primary">Create</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        );
    }
}

export default RequestLoanForm;
