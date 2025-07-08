import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Editor from "./components/Editor";
import "./App.css";
import Preview from './components/Preview';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/preview/:submissionId" element={<Preview />} />
      </Routes>
    </Router>
  );
};

export default App;
