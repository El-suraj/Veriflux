// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IssuancePage from "./pages/IssuancePage";
import VerificationPage from "./pages/VerificationPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import "./index.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<HomePage/>} />
        <Route path="/issuance" element={<IssuancePage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
