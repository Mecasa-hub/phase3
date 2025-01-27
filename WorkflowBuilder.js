import React, { useState } from 'react';
import axios from 'axios';

const WorkflowBuilder = () => {
  const [workflowName, setWorkflowName] = useState('');
  const [workflowSteps, setWorkflowSteps] = useState([]);

  const addStep = () => {
    setWorkflowSteps([...workflowSteps, { id: Date.now(), type: '', config: {} }]);
  };

  const updateStep = (id, field, value) => {
    const updatedSteps = workflowSteps.map(step =>
      step.id === id ? { ...step, [field]: value } : step
    );
    setWorkflowSteps(updatedSteps);
  };

  const saveWorkflow = async () => {
    try {
      await axios.post('/api/workflows', {
        name: workflowName,
        steps: workflowSteps,
      });
      alert('Workflow saved successfully!');
    } catch (error) {
      console.error('Error saving workflow:', error);
      alert('Failed to save workflow');
    }
  };

  return (
    <div>
      <h1>Workflow Builder</h1>
      <input
        type="text"
        placeholder="Workflow Name"
        value={workflowName}
        onChange={(e) => setWorkflowName(e.target.value)}
      />
      {workflowSteps.map((step) => (
        <div key={step.id}>
          <input
            type="text"
            placeholder="Step Type"
            value={step.type}
            onChange={(e) => updateStep(step.id, 'type', e.target.value)}
          />
          <textarea
            placeholder="Step Configuration (JSON)"
            value={JSON.stringify(step.config)}
            onChange={(e) => {
              try {
                updateStep(step.id, 'config', JSON.parse(e.target.value));
              } catch (error) {
                console.error('Invalid JSON:', error);
              }
            }}
          />
        </div>
      ))}
      <button type="button" onClick={addStep}>Add Step</button>
      <button type="button" onClick={saveWorkflow}>Save Workflow</button>
    </div>
  );
};

export default WorkflowBuilder;
