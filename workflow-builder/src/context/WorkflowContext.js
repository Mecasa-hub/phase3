import React, { createContext, useContext, useState, useRef } from 'react';

const WorkflowContext = createContext();

export const WorkflowProvider = ({ children }) => {
  const [showSimulation, setShowSimulation] = useState(false);
  const canvasRef = useRef(null);

  return (
    <WorkflowContext.Provider value={{ 
      showSimulation, 
      setShowSimulation,
      canvasRef 
    }}>
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};
