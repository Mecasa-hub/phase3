import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const WorkflowDetail = ({ match, history }) => {
  const [workflow, setWorkflow] = useState(null);
  const [executions, setExecutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkflow = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/workflows/${match.params.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setWorkflow(response.data);
        const executionsResponse = await axios.get(`http://localhost:5001/api/workflows/${match.params.id}/executions`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setExecutions(executionsResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkflow();
  }, [match.params.id]);

  const handleEdit = () => {
    history.push(`/workflows/${match.params.id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this workflow?')) {
      try {
        await axios.delete(`http://localhost:5001/api/workflows/${match.params.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        history.push('/workflows');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleExecute = async () => {
    try {
      await axios.post(`http://localhost:5001/api/workflows/${match.params.id}/execute`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Refresh executions list
      const executionsResponse = await axios.get(`http://localhost:5001/api/workflows/${match.params.id}/executions`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setExecutions(executionsResponse.data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!workflow) return <div>Workflow not found</div>;

  return (
    <div>
      <h2>{workflow.name}</h2>
      <button type="button" onClick={handleEdit}>Edit</button>
      <button type="button" onClick={handleDelete}>Delete</button>
      <button type="button" onClick={handleExecute}>Execute Now</button>

      <h3>Steps:</h3>
      {workflow.steps.map((step, index) => (
          <div key={step._id || Date.now() + Math.random()}>
          <h4>Step {index + 1}: {step.description}</h4>
          <p>Action: {step.action}</p>
          <p>Parameters: {step.params}</p>
        </div>
      ))}

      <h3>Schedule:</h3>
      <p>Enabled: {workflow.schedule?.enabled ? 'Yes' : 'No'}</p>
      {workflow.schedule?.enabled && (
        <p>Cron Expression: {workflow.schedule.cronExpression}</p>
      )}

      <h3>Executions:</h3>
      <table>
        <thead>
          <tr>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {executions.map(execution => (
            <tr key={execution._id}>
              <td>{new Date(execution.startTime).toLocaleString()}</td>
              <td>{execution.endTime ? new Date(execution.endTime).toLocaleString() : 'N/A'}</td>
              <td>{execution.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default withRouter(WorkflowDetail);
