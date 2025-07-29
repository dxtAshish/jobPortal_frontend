import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import JobDetailsPage from "./pages/JobDetailsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-job" element={<AddJobPage />} />
        <Route path="/job/:_id" element={<JobDetailsPage />} />
      </Routes>
    </Router>
  );
}
