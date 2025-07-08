import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './preview.css';

const Preview = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/submissions/${submissionId}`);
        setSubmission(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load submission');
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [submissionId]);

  const handleEdit = () => {
    navigate('/editor', {
      state: {
        question: submission.question,
        language: submission.language,
        code: submission.code,
        submissionId,
      },
    });
  };

  if (loading) return (
    <div className="loading-container">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="loading-spinner"
      ></motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
      >
        Loading your submission...
      </motion.p>
    </div>
  );
  
  if (error) return (
    <motion.div 
      className="error-container"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {error}
    </motion.div>
  );
  
  if (!submission) return (
    <motion.div 
      className="not-found"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      No submission found
    </motion.div>
  );

  return (
    <motion.div 
      className="preview-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="split-layout"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Panel */}
        <motion.div 
          className="left-panel"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <motion.h1 
            className="preview-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Submission Preview
          </motion.h1>
          
          <motion.div 
            className="details-card"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.div 
              className="detail-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2>Question</h2>
              <p>{submission.question}</p>
            </motion.div>
            
            <motion.div 
              className="detail-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2>Language</h2>
              <motion.div 
                className="language-tag"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {submission.language.toUpperCase()}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.button 
            className="edit-button"
            onClick={handleEdit}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 8px 15px rgba(66, 153, 225, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  className="hover-circle"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                />
              )}
            </AnimatePresence>
            <svg className="edit-icon" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            Edit Code
          </motion.button>
        </motion.div>

        {/* Right Panel */}
        <motion.div 
          className="right-panel"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
        >
          <motion.div 
            className="code-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="code-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="code-filename">
              {submission.language.toUpperCase()} Code
            </div>
          </motion.div>
          <motion.pre 
            className="code-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <code>{submission.code}</code>
          </motion.pre>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Preview;