import React from "react";
import { Switch, Route } from "react-router-dom";
import { PlaceDetails } from "./pages/templates";
import Home from "./pages/Home";
import AttractionsList from "./pages/AttractionsList"
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import CheckOut from "./pages/CheckOut";
import Register from "./pages/Register";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path={"/"}>
          <Home />
        </Route>
        <Route path={"/attractions"}>
          <AttractionsList />
        </Route>
        <Route path={"/checkout/:id"}>
          <CheckOut/>
        </Route>
        <Route path={"/login"}>
          <Login/>
        </Route>
        <Route path={"/register"}>
          <Register/>
        </Route>
        <Route path={"/booking"}>
          <Booking/>
        </Route>
        <Route path={"/:type/:id"}>
          <PlaceDetails />
        </Route>
        
      </Switch>
      
    </>
  )
}

export default App
