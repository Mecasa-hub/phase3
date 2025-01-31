import React, { useCallback, useEffect } from 'react';
import { useWorkflow } from '../context/WorkflowContext';
import { Box, Divider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { ReactFlowProvider } from 'reactflow';
import { useLocation } from 'react-router-dom';
import Canvas from './Canvas';
import WorkflowSimulation from './WorkflowSimulation';

const nodeCategories = {
  'Communication': ['telegram', 'gmail', 'whatsapp', 'twilio', 'microsoftTeams', 'discord', 'slack', 'twitter'],
  'Storage': ['dropbox', 'googleDrive'],
  'Database': ['mysql', 'postgres', 'redis', 'elasticsearch'],
  'Version Control': ['github', 'gitlab', 'bitbucket'],
  'Project Management': ['jira', 'trello', 'notion', 'asana', 'clickup'],
  'API': ['httpRequest', 'webhook', 'graphql', 'url'],
  'Automation': ['agent', 'calculator'],
  'Other': ['chat']
};

const WorkflowBuilderContent = () => {
  const { showSimulation, setShowSimulation, canvasRef } = useWorkflow();
  const location = useLocation();

  const handleLoadTemplate = useCallback((template) => {
    if (canvasRef.current) {
      console.log('Loading template:', template);
      canvasRef.current.loadTemplate(template);
    }
  }, [canvasRef]);

  useEffect(() => {
    console.log('WorkflowBuilder mounted');
    console.log('Initial canvas ref:', canvasRef.current);

    // Load template if provided in navigation state
    const template = location.state?.template;
    if (template && canvasRef.current) {
      console.log('Loading template from navigation:', template);
      handleLoadTemplate(template);
    }
  }, [location.state, handleLoadTemplate, canvasRef]);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <Box sx={{ display: 'flex', width: '100%', height: '750px', position: 'relative' }}>
        <div style={{ 
          width: '300px', 
          padding: '20px',
          borderRight: '1px solid #ccc',
          overflowY: 'auto',
          maxHeight: '750px'
        }}>
        <button
          type="button"
          onClick={() => setShowSimulation(!showSimulation)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {showSimulation ? (
            <>
              <StopIcon /> Hide Simulation
            </>
          ) : (
            <>
              <PlayArrowIcon /> Run Simulation
            </>
          )}
        </button>
        <h3 style={{ marginBottom: '15px', marginTop: '20px' }}>Node Types</h3>
        {Object.entries(nodeCategories).map(([category, nodeTypeList]) => (
          <div key={category} style={{ marginBottom: '20px' }}>
            <h4 style={{ marginBottom: '10px' }}>{category}</h4>
            {nodeTypeList.map((type) => (
              <button
                key={type}
                type="button"
                draggable
                onDragStart={(event) => onDragStart(event, type)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px',
                  marginBottom: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: '#fff',
                  cursor: 'move',
                  userSelect: 'none'
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} Node
              </button>
            ))}
          </div>
        ))}
        </div>
        <div style={{ flex: 1, height: '100%', position: 'relative' }}>
          <Canvas 
            ref={canvasRef}
            onSimulate={() => setShowSimulation(true)} 
          />
          {showSimulation && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'white',
                zIndex: 10
              }}
            >
              <WorkflowSimulation />
            </Box>
          )}
        </div>
      </Box>
    </Box>
  );
};

const WorkflowBuilder = () => (
  <ReactFlowProvider>
    <WorkflowBuilderContent />
  </ReactFlowProvider>
);

export default WorkflowBuilder;
