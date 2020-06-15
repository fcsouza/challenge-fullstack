import React from "react";
import { Switch, Route } from "react-router-dom";
import Translator from "../pages/Translator";

// This is the route manager of the application
// We only have one route.
const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Translator} />
  </Switch>
);

export default Routes;
