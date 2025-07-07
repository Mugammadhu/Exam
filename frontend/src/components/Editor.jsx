


import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import pythonIcon from '../assets/icons/python.svg';
import javascriptIcon from '../assets/icons/javascript.svg';
import javaIcon from '../assets/icons/java.svg';
import cIcon from '../assets/icons/c.svg';
import cppIcon from '../assets/icons/cpp.svg';
import goIcon from '../assets/icons/go.svg';
import rustIcon from '../assets/icons/rust.svg';
import typescriptIcon from '../assets/icons/typescript.svg';
import rubyIcon from '../assets/icons/ruby.svg';
import swiftIcon from '../assets/icons/swift.svg';
import phpIcon from '../assets/icons/php.svg';
import allIcon from '../assets/icons/all.svg';
import './editor.css';

const Editor = () => {
  const iframeRef = useRef();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { question, language } = state || {};
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!iframeLoaded || !iframeRef.current?.contentWindow || !question) return;

    const sendMessage = () => {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "INIT",
          payload: { question, language }
        },
        "http://localhost:5173"
      );
    };

    sendMessage();
    setIsLoading(false);
  }, [iframeLoaded, question, language]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (!event.origin.includes("localhost")) return;

      if (event.data?.type === "SUBMIT") {
        const { submissionId } = event.data.payload || {};
        if (submissionId) {
          navigate(`/preview/${submissionId}`);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [navigate]);

  // Language to icon mapping
  const languageIcons = {
    python: pythonIcon,
    javascript: javascriptIcon,
    java: javaIcon,
    c: cIcon,
    cpp: cppIcon,
    go: goIcon,
    rust: rustIcon,
    typescript: typescriptIcon,
    ruby: rubyIcon,
    swift: swiftIcon,
    php: phpIcon
  };

  return (
    <motion.div
      className="editor-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="editor-glass-panel"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="editor-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="header-content">
            <motion.div
              className="question-display"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <motion.div
                className="question-meta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.span
                  className="language-badge"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img 
                    src={languageIcons[language?.toLowerCase()] || allIcon} 
                    alt={language} 
                    className="language-icon"
                  />
                  <span className="language-name">{language || 'All Languages'}</span>
                </motion.span>
                <motion.span
                  className="question-label"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  PROBLEM STATEMENT
                </motion.span>
              </motion.div>
              <motion.h1
                className="question-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {question}
              </motion.h1>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="editor-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <AnimatePresence>
            {isLoading && (
              <motion.div
                className="loading-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="loading-spinner"
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
                >
                  Loading editor...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <iframe
            ref={iframeRef}
            src="http://localhost:5173"
            onLoad={() => setIframeLoaded(true)}
            title="Code Editor"
            className="editor-iframe"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Editor;