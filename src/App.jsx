import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";

import Layout from "./components/Layout/Layout";
import apolloClient from "./services/graphql/apolloClient"

import "./App.css";

class App extends Component {
    render() {
        return (
            <ApolloProvider client={apolloClient}>
                <div className="App">
                    <Layout />
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
