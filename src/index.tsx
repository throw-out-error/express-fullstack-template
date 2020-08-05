import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import { App } from "./App/App";
import { Header } from "./Header/Header";
import { Helmet } from "react-helmet";
import * as serviceWorker from "./serviceWorker";

const title = "My App";

ReactDOM.render(
    <Router>
        <Helmet>
            <meta charSet="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <meta name="keywords" content="React App" />
            <meta name="description" content="My react app" />
            <meta name="author" content="Theo Paris" />

            <title>{title}</title>
        </Helmet>
        <Header title={title} />
        <Switch>
            <Route exact path="/" component={App} />
        </Switch>
    </Router>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
