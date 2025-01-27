import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkflowList = () => {
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await axios.get('/api/workflows');
        setWorkflows(response.data);
      } catch (error) {
        console.error('Error fetching workflows:', error);
      }
    };

    fetchWorkflows();
  }, []);

  return (
    <div>
      <h1>Workflows</h1>
      {workflows.length === 0 ? (
        <p>No workflows found.</p>
      ) : (
        <ul>
          {workflows.map((workflow) => (
            <li key={workflow._id}>{workflow.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkflowList;
