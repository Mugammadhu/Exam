import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './preview.css';

const Preview = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/submissions/${submissionId}`);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!submission) return <div>No submission found</div>;

  return (
    <div className="preview-container">
      <h1 className="preview-title">Submission Preview</h1>
      <div className="submission-details">
        <div className="detail-item">
          <h2>Question</h2>
          <p>{submission.question}</p>
        </div>
        <div className="detail-item">
          <h2>Language</h2>
          <p>{submission.language.toUpperCase()}</p>
        </div>
        <div className="detail-item">
          <h2>Code</h2>
          <pre className="code-block">
            <code>{submission.code}</code>
          </pre>
        </div>
      </div>
      <button className="edit-button" onClick={handleEdit}>
        Edit Code
      </button>
    </div>
  );
};

export default Preview;