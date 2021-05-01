import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import React from "react";
import Welcome from "./routes/Welcome";

function PageRouter() {
  return (
    <div
      className="w-screen overflow-hidden"
      style={{
        backgroundImage: "url('/assets/images/background.png')",
        backgroundRepeat: true,
      }}
    >
      <Router>
        <Switch>
          <Route path="/" component={Welcome} />
        </Switch>
      </Router>
    </div>
  );
}

export default PageRouter;
