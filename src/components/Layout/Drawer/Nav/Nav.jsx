import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Nav.css";

class Nav extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Browse</Link>
                    </li>
                    <li>
                        <Link to="/create">Create</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Nav;
