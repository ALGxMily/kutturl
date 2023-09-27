import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "firebase/compat/auth";
import Landing from "./3.0final/Landing";
import { RedirectURLpage } from "./3.0final/Components/RedirectURLpage";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      {/* <Route path="/login" element={<Loginv2 />} />
      <Route path="/register" element={<Registerv2 />} />

      <Route path="/404" element={<NotFound />} /> */}
      <Route exact path="/:shortId" element={<RedirectURLpage />} />
    </Routes>
  );
}

export default App;
