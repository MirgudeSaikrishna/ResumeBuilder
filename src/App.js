import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ResumeBuilder from "./ResumeBuilder";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes for different components */}
        <Route path="/" element={<HomePage />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
      </Routes>
    </Router>
  );
};

export default App;
