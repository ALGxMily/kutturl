import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "firebase/compat/auth";
import Landing from "./3.0final/Landing";
import { RedirectURLpage } from "./3.0final/Components/RedirectURLpage";
import Customise from "./3.0final/Customise";
import NotFound from "./3.0final/404";
import Dashboard from "./3.0final/Dashboard";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/customise/:shortId" element={<Customise />} />
      <Route exact path="/:shortId" element={<RedirectURLpage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
