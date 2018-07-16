import React, { Component } from "react";

import Main from "./Main/Main";
import Drawer from "./Drawer/Drawer";
import Header from "./Header/Header";

class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                <Drawer />
                <Main />
            </div>
        );
    }
}

export default Layout;
