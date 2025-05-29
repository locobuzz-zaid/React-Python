import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PathRoutes from "./PathRoutes";
import "./index.css";

const App = () => {
  return (
    <Router>
      <PathRoutes />
    </Router>
  );
};

export default App;
