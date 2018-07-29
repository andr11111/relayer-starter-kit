// External libraries
import React, { Component } from "react";

// Components
import LoanRequest from "../components/LoanRequest/LoanRequest";

// HOCs
import withLoanRequest from '../hocs/withLoanRequest';

const LoanRequestEnhanced = withLoanRequest(LoanRequest);

class LoanRequestContainer extends Component {
    render() {
      const { id } = this.props.match.params;
      return <LoanRequestEnhanced id={id}/>;
    }
}

export default LoanRequestContainer;
