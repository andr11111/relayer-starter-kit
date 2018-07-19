import Dharma from "@dharmaprotocol/dharma.js";
import React, { Component } from "react";
import * as moment from "moment";

import Api from "../../services/api";
import FillButton from "../FillButton/FillButton";

import { Link } from "react-router-dom";

class LoanRequest extends Component {
    constructor(props) {
        super(props);

        this.handleFill = this.handleFill.bind(this);

        this.state = {
            loanRequest: null,
        };
    }

    componentDidMount() {
        const { LoanRequest } = Dharma.Types;

        const { dharma, id } = this.props;

        const api = new Api();

        api.get(`loanRequests/${id}`).then(async (loanRequestData) => {
            const loanRequest = await LoanRequest.load(dharma, loanRequestData);

            this.setState({ loanRequest });
        });
    }

    isExpired(unixTimestamp) {
        return moment.unix(unixTimestamp).isBefore();
    }

    async handleFill() {
        await this.state.loanRequest.fill();
    }

    render() {
        const { loanRequest } = this.state;

        if (!loanRequest) {
            return null;
        }

        return (
            <div>
                <div>
                    <Link to="/">Back</Link>
                </div>

                <FillButton
                    disabled={this.isExpired(loanRequest.expiresAt)}
                    handleFill={this.handleFill}
                />
            </div>
        );
    }
}

export default LoanRequest;
