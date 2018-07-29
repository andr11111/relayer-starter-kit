// External libraries
import React, { Component } from "react";
import { Button, Col, ControlLabel, Form, FormControl, FormGroup } from "react-bootstrap";

// Components
import Loading from "../Loading/Loading";
import TimeUnitSelect from "./TimeUnitSelect/TimeUnitSelect";
import TokenSelect from "./TokenSelect/TokenSelect";

// Styling
import "./CreateLoanRequest.css";

class CreateLoanRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            principal: 0,
            principalTokenSymbol: "WETH",
            collateral: 0,
            collateralTokenSymbol: "REP",
            interestRate: 0,
            termLength: 0,
            termUnit: "weeks",
            expirationLength: 0,
            expirationUnit: "days",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createLoanRequest = this.createLoanRequest.bind(this);
    }

    async createLoanRequest(event) {
        event.preventDefault();

        const { handleCreateLoanRequest, onCompletion } = this.props;        

        try {
            const id = await handleCreateLoanRequest({
                principalAmount: this.state.principal,
                principalToken: this.state.principalTokenSymbol,
                collateralAmount: this.state.collateral,
                collateralToken: this.state.collateralTokenSymbol,
                interestRate: this.state.interestRate,
                termDuration: this.state.termLength,
                termUnit: this.state.termUnit,
                expiresInDuration: this.state.expirationLength,
                expiresInUnit: this.state.expirationUnit,
            });
            onCompletion(id);
        } catch (e) {
            console.error(e);
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    render() {
        const { dharmaProps: { supportedTokens } } = this.props;

        if (supportedTokens.length === 0) {
            return <Loading />;
        }

        const {
            principal,
            principalTokenSymbol,
            collateral,
            collateralTokenSymbol,
            termUnit,
            termLength,
            interestRate,
            expirationUnit,
            expirationLength,
        } = this.state;

        const labelWidth = 3;
        const dropdownWidth = 3;
        const inputWidth = 6;

        return (
            <Col md={6}>
                <Form horizontal onSubmit={this.createLoanRequest}>
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
                            <TokenSelect
                                name="principalTokenSymbol"
                                onChange={this.handleInputChange}
                                defaultValue={principalTokenSymbol}
                                tokens={supportedTokens}
                            />
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
                            <TokenSelect
                                onChange={this.handleInputChange}
                                name="collateralTokenSymbol"
                                defaultValue={collateralTokenSymbol}
                                tokens={supportedTokens}
                            />
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
                            <TimeUnitSelect
                                onChange={this.handleInputChange}
                                name="termUnit"
                                defaultValue={termUnit}
                            />
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
                            <TimeUnitSelect
                                onChange={this.handleInputChange}
                                name="expirationUnit"
                                defaultValue={expirationUnit}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={labelWidth} sm={10}>
                            <Button type="submit" bsStyle="primary">
                                Create
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        );
    }
}

export default CreateLoanRequest;
