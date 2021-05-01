import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import React from 'react'
import Welcome from "./routes/Welcome";

function PageRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Welcome} />
            </Switch>
        </Router>
    )
}

export default PageRouter
