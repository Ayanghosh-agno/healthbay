import { Route, Switch } from "react-router-dom";
import React from "react";

import Welcome from "./routes/Welcome";
import Register from "./routes/Register";
import Privacy from "./routes/Privacy";
import Terms from "./routes/Terms";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";

import Loading from "./screens/Loading";

import PrivateRoute from "./components/PrivateRoute";

import { useAuth } from "./contexts/AuthContext";

function PageRouter() {
  const { loading } = useAuth();

  return (
    <div
      className="w-screen overflow-hidden text-text-color-theme my-auto mx-auto"
      style={{
        backgroundImage: "url('/assets/images/background.png')",
        backgroundRepeat: true,
        maxWidth: "400px",
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <Switch>
          <PrivateRoute path="/" exact component={Dashboard} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/toc" component={Terms} />
        </Switch>
      )}
    </div>
  );
}

export default PageRouter;
