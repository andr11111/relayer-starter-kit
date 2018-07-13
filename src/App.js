import React, { Component } from "react";

import LoanRequestsContainer from "./containers/LoanRequests";

import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <LoanRequestsContainer />
            </div>
        );
    }
}

export default App;
