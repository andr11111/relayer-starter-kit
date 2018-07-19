import Dharma from "@dharmaprotocol/dharma.js";
import React, { Component } from "react";
import * as moment from "moment";

import FillButton from "../FillButton/FillButton";

class LoanRequest extends Component {
    constructor(props) {
        super(props);

        this.handleFill = this.handleFill.bind(this);
    }

    isExpired(unixTimestamp) {
        return moment.unix(unixTimestamp).isBefore();
    }

    handleFill(loanRequestId) {
        const { dharma } = this.props;

        const { LoanRequest } = Dharma.Types;

        const api = new Api();

        api.get(`loanRequests/${loanRequestId}`).then(async (loanRequestData) => {
            const loanRequest = await LoanRequest.load(dharma, loanRequestData);
            const creditorAddress = await loanRequest.getCurrentUser();

            await loanRequest.fill(creditorAddress);
        });
    }

    render() {
        const { request } = this.props;

        return (
            <div>
                <FillButton
                    loanRequestId={request.id}
                    disabled={this.isExpired(request.expiresAt)}
                    handleFill={this.handleFill}
                />
            </div>
        );
    }
}

export default LoanRequest;
