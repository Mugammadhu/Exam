


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allLanguages } from "./languages";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import './exam.css';

const Exam = () => {
  const [question, setQuestion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!question.trim()) {
      setError("Question is required.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    
    try {
      
      navigate("/editor", {
        state: {
          question,
          language: selectedLanguage,
        },
      });
    } catch (err) {
      setError("Failed to create question");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setError("");
  }, [question]);

  return (
    <motion.div
      className="exam-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1 
        className="exam-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Create New Coding Question
      </motion.h1>

      <motion.div
        className="input-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.input
          className="input-box"
          placeholder="Enter your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          whileFocus={{ 
            boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.5)",
            borderColor: "rgba(99, 102, 241, 0.8)"
          }}
        />
        <AnimatePresence>
          {error && (
            <motion.p
              className="error-text"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        className="select-action-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.select
          className="select-box"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <option value="all">All Languages</option>
          {allLanguages.map((lang) => (
            <option key={lang.language} value={lang.language}>
              {lang.language}
            </option>
          ))}
        </motion.select>

        <motion.button
          className="create-button"
          onClick={handleCreate}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 8px 15px rgba(99, 102, 241, 0.3)"
          }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{ display: 'inline-block' }}
            >
              ⏳
            </motion.span>
          ) : (
            "Create"
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Exam;