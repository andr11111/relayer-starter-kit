import React, { Component } from "react";

import Main from "./components/Main/Main";
import Nav from "./components/Nav/Nav";

import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Nav />
                <Main />
            </div>
        );
    }
}

export default App;
