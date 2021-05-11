import React from "react";
import "./App.css";
import Navigation from "./Components/Navigation";
import Home from "./Components/Home";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Navigation>
      <Home></Home>
    </Navigation>
  );
}

export default App;
