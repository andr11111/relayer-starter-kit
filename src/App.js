import React, { Component } from "react";

import LoanRequests from "./components/LoanRequests/LoanRequests";

import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <LoanRequests />
            </div>
        );
    }
}

export default App;
