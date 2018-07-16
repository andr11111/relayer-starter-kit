import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./Header.css";

class Header extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>Dharma Relayer</Navbar.Brand>
                </Navbar.Header>

                <Nav>
                    <LinkContainer to="/">
                        <NavItem eventKey={1}>Browse</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/create">
                        <NavItem eventKey={2}>Create</NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar>
        );
    }
}

export default Header;
