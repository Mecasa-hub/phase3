import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const WorkflowList = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/workflows', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setWorkflows(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workflows:', error);
        setError('Failed to fetch workflows. Please try again later.');
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, []);

  if (loading) {
    return <div>Loading workflows...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Your Workflows</h2>
      {workflows.length === 0 ? (
        <p>You haven't created any workflows yet.</p>
      ) : (
        <ul>
          {workflows.map((workflow) => (
            <li key={workflow._id}>
              <h3>{workflow.name}</h3>
              <p>Steps: {workflow.steps.length}</p>
              <Link to={`/workflows/${workflow._id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/builder">Create New Workflow</Link>
    </div>
  );
};

export default WorkflowList;
