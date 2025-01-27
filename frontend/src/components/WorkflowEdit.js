import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const ACTION_TYPES = ['HTTP_GET', 'HTTP_POST', 'DELAY'];

const WorkflowEdit = ({ match, history }) => {
  const [workflowName, setWorkflowName] = useState('');
  const [steps, setSteps] = useState([]);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [cronExpression, setCronExpression] = useState('');
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
        const workflow = response.data;
        setWorkflowName(workflow.name);
        setSteps(workflow.steps.map(step => ({ ...step, id: Date.now() + Math.random() })));
        setScheduleEnabled(workflow.schedule?.enabled || false);
        setCronExpression(workflow.schedule?.cronExpression || '');
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkflow();
  }, [match.params.id]);

  const handleAddStep = () => {
    setSteps([...steps, { id: Date.now(), description: '', action: 'HTTP_GET', params: '{}' }]);
  };

  const handleStepChange = (id, field, value) => {
    const newSteps = steps.map(step =>
      step.id === id ? { ...step, [field]: value } : step
    );
    setSteps(newSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/workflows/${match.params.id}`, {
        name: workflowName,
        steps: steps.map(({ description, action, params }) => ({ description, action, params })),
        schedule: {
          enabled: scheduleEnabled,
          cronExpression: cronExpression,
        },
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      history.push(`/workflows/${match.params.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Edit Workflow</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="workflowName">Workflow Name:</label>
          <input
            type="text"
            id="workflowName"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            required
          />
        </div>
        {steps.map((step) => (
          <div key={step.id}>
            <h3>Step</h3>
            <div>
              <label htmlFor={`description-${step.id}`}>Description:</label>
              <input
                type="text"
                id={`description-${step.id}`}
                value={step.description}
                onChange={(e) => handleStepChange(step.id, 'description', e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor={`action-${step.id}`}>Action:</label>
              <select
                id={`action-${step.id}`}
                value={step.action}
                onChange={(e) => handleStepChange(step.id, 'action', e.target.value)}
                required
              >
                {ACTION_TYPES.map(actionType => (
                  <option key={actionType} value={actionType}>{actionType}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`params-${step.id}`}>Parameters (JSON):</label>
              <textarea
                id={`params-${step.id}`}
                value={step.params}
                onChange={(e) => handleStepChange(step.id, 'params', e.target.value)}
                required
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddStep}>Add Step</button>
        <div>
          <label htmlFor="scheduleEnabled">Enable Schedule:</label>
          <input
            type="checkbox"
            id="scheduleEnabled"
            checked={scheduleEnabled}
            onChange={(e) => setScheduleEnabled(e.target.checked)}
          />
        </div>
        {scheduleEnabled && (
          <div>
            <label htmlFor="cronExpression">Cron Expression:</label>
            <input
              type="text"
              id="cronExpression"
              value={cronExpression}
              onChange={(e) => setCronExpression(e.target.value)}
              required={scheduleEnabled}
            />
          </div>
        )}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default withRouter(WorkflowEdit);
