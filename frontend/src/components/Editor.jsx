

import React, { useEffect, useRef, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
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
    <div className="editor-container">
      <div className="editor-glass-panel">
        <div className="editor-header">
          <div className="header-content">
            <div className="question-display">
              <div className="question-meta">
                <span className="language-badge">
                  <img 
                    src={languageIcons[language?.toLowerCase()] || allIcon} 
                    alt={language} 
                    className="language-icon"
                  />
                  <span className="language-name">{language || 'All Languages'}</span>
                </span>
                <span className="question-label">PROBLEM STATEMENT</span>
              </div>
              <h1 className="question-text">{question}</h1>
            </div>
          </div>
        </div>

        <div className="editor-wrapper">
          <iframe
            ref={iframeRef}
            src="http://localhost:5173"
            onLoad={() => setIframeLoaded(true)}
            title="Code Editor"
            className="editor-iframe"
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;