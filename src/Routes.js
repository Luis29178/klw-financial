import React from "react";

import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Appointments from "./Pages/Appointments/Appointments";
import NotFound from "./Pages/Other/NotFound";
import Confirmation from "./Pages/Confirmation/Confirmation";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<Home />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/confirm-appointment" element={<Confirmation />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </Router>
  );
};
