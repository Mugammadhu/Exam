import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allLanguages } from "./languages";
import './exam.css';

const Exam = () => {
  const [question, setQuestion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!question.trim()) {
      setError("Question is required.");
      return;
    }

    setError(""); // Clear any previous errors
    navigate("/editor", {
      state: {
        question,
        language: selectedLanguage,
      },
    });
  };

  
useEffect(() => {
setError("")
}, [question])

  return (
    <div className="exam-container">
      <input
        className="input-box"
        placeholder="Enter your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {error && <p className="error-text">{error}</p>}

      <div className="select-action-row">
        <select
          className="select-box"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="all">All Languages</option>
          {allLanguages.map((lang) => (
            <option key={lang.language} value={lang.language}>
              {lang.language}
            </option>
          ))}
        </select>

        <button className="create-button" onClick={handleCreate}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Exam;
