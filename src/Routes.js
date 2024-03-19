import React from "react";

import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Appointments from "./Pages/Appointments/Appointments";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<Home />} />
        <Route path="/appointments" element={<Appointments />} />
      </Switch>
    </Router>
  );
};
