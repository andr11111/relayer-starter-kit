import React, { Component } from "react";

import Main from "./Main/Main";
import Header from "./Header/Header";

import "./Layout.css";

class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                <Main />
            </div>
        );
    }
}

export default Layout;
