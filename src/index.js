import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Dharma from "@dharmaprotocol/dharma.js";

import registerServiceWorker from "./registerServiceWorker";

import App from "./App";

import "./index.css";

const dharma = new Dharma("http://localhost:8545");

export const DharmaContext = React.createContext({ dharma });

ReactDOM.render(
    <BrowserRouter>
        <DharmaContext.Provider value={dharma}>
            <App />
        </DharmaContext.Provider>
    </BrowserRouter>,

    document.getElementById("root"),
);
registerServiceWorker();
