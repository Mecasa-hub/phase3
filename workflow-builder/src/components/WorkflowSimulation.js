import React, { useState, useCallback, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  CircularProgress, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  SpeedDial, 
  SpeedDialAction, 
  SpeedDialIcon, 
  IconButton 
} from '@mui/material';
import ReactFlow, { 
  Background, 
  Controls, 
  ReactFlowProvider, 
  addEdge, 
  useNodesState, 
  useEdgesState,
  Handle 
} from 'reactflow';
import AddIcon from '@mui/icons-material/Add';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import WebhookIcon from '@mui/icons-material/Webhook';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import 'reactflow/dist/style.css';

// Import custom node components
import TwitterNode from './nodes/TwitterNode';
import TelegramNode from './nodes/TelegramNode';
import WebhookNode from './nodes/WebhookNode';
import ChatNode from './nodes/ChatNode';

// Custom node styles for simulation
const getSimulationNodeStyle = (isHighlighted) => ({
  background: '#ffffff',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  minWidth: '250px',
  transition: 'all 0.3s ease',
  fontSize: '14px',
  position: 'relative'
});

// Node type registration with simulation-specific styling
const createCustomNode = (color, icon, IconComponent) => (props) => {
  const onDelete = () => {
    props.data.onDelete(props.id);
  };

  return (
    <Box sx={getSimulationNodeStyle(props.data.isHighlighted)}>
      <Handle
        type="target"
        position="top"
        style={{ 
          background: '#4a90e2',
          width: 8,
          height: 8,
          top: -4
        }}
      />
      
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1.5,
        mb: 1,
        pr: 4
      }}>
        <Box sx={{
          width: 32,
          height: 32,
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: `${color}15`,
          color: color
        }}>
          <IconComponent fontSize="small" />
        </Box>
        
        <Typography variant="subtitle2" sx={{ 
          fontWeight: 600,
          color: 'text.primary',
          flex: 1
        }}>
          {props.data.operation || props.data.description}
        </Typography>

        <IconButton
          size="small"
          onClick={onDelete}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            p: 0.5,
            '&:hover': {
              color: 'error.main',
              bgcolor: 'error.lighter'
            }
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{
        p: 1.5,
        bgcolor: 'grey.50',
        borderRadius: 1,
        fontSize: '13px',
        color: 'text.secondary'
      }}>
        {props.data.description}
      </Box>

      <Handle
        type="source"
        position="bottom"
        style={{ 
          background: '#4a90e2',
          width: 8,
          height: 8,
          bottom: -4
        }}
      />
    </Box>
  );
};

const nodeTypes = {
  twitterNode: createCustomNode('#1DA1F2', 'Twitter', TwitterIcon),
  telegramNode: createCustomNode('#0088cc', 'Telegram', TelegramIcon),
  webhookNode: createCustomNode('#673ab7', 'Webhook', WebhookIcon),
  chatNode: createCustomNode('#2196f3', 'AI Processing', ChatIcon)
};

// Available node templates for adding new nodes
const nodeTemplates = [
  {
    type: 'webhookNode',
    icon: <WebhookIcon />,
    label: 'Webhook',
    data: {
      description: 'New webhook trigger',
      responseMode: true
    }
  },
  {
    type: 'twitterNode',
    icon: <TwitterIcon />,
    label: 'Twitter',
    data: {
      operation: 'Action',
      description: 'Twitter interaction'
    }
  },
  {
    type: 'telegramNode',
    icon: <TelegramIcon />,
    label: 'Telegram',
    data: {
      operation: 'Send',
      description: 'Telegram message'
    }
  },
  {
    type: 'chatNode',
    icon: <ChatIcon />,
    label: 'AI Chat',
    data: {
      description: 'Process with AI',
      model: 'gpt-3.5-turbo'
    }
  }
];

const WORKFLOW_TEMPLATES = {
  twitterAutoReply: {
    name: 'Twitter Auto Reply Bot',
    nodes: [
      {
        id: '1',
        type: 'webhookNode',
        position: { x: 250, y: 50 },
        data: {
          description: 'Monitor Twitter mentions',
          responseMode: true
        }
      },
      {
        id: '2',
        type: 'chatNode',
        position: { x: 250, y: 200 },
        data: {
          description: 'Analyze sentiment and generate response',
          model: 'gpt-3.5-turbo'
        }
      },
      {
        id: '3',
        type: 'twitterNode',
        position: { x: 250, y: 350 },
        data: {
          operation: 'Reply',
          description: 'Post automated response'
        }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#999', strokeWidth: 2 } },
      { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#999', strokeWidth: 2 } }
    ],
    steps: [
      { node: 'Webhook Trigger', output: 'New mention detected: "@YourHandle Great product!"' },
      { node: 'AI Processing', output: 'Analyzed sentiment: Positive (0.8)\nGenerated response template: "Thank you for your feedback!"' },
      { node: 'Twitter Reply', output: 'Reply sent: "Thank you for your kind words! We appreciate your support. 🙌"' }
    ]
  },
  scheduledTwitter: {
    name: 'Scheduled Twitter Posts',
    nodes: [
      {
        id: '1',
        type: 'webhookNode',
        position: { x: 250, y: 50 },
        data: {
          description: 'Trigger every 4 hours',
          responseMode: true
        }
      },
      {
        id: '2',
        type: 'chatNode',
        position: { x: 250, y: 200 },
        data: {
          description: 'Generate engaging tech content',
          model: 'gpt-4'
        }
      },
      {
        id: '3',
        type: 'twitterNode',
        position: { x: 250, y: 350 },
        data: {
          operation: 'Post',
          description: 'Share generated content'
        }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#999', strokeWidth: 2 } },
      { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#999', strokeWidth: 2 } }
    ],
    steps: [
      { node: 'Schedule Trigger', output: 'Scheduled execution triggered at 10:00 AM' },
      { node: 'AI Processing', output: 'Generated tweet: "Exciting news! Our latest AI feature is now live! Experience the future of automation. #Innovation #Tech"' },
      { node: 'Twitter Post', output: 'Tweet posted successfully. Engagement metrics: 12 likes, 3 retweets' }
    ]
  },
  telegramBot: {
    name: 'Telegram Reply Bot',
    nodes: [
      {
        id: '1',
        type: 'webhookNode',
        position: { x: 250, y: 50 },
        data: {
          description: 'Listen for Telegram messages',
          responseMode: true
        }
      },
      {
        id: '2',
        type: 'chatNode',
        position: { x: 250, y: 200 },
        data: {
          description: 'Process commands and generate responses',
          model: 'gpt-3.5-turbo'
        }
      },
      {
        id: '3',
        type: 'telegramNode',
        position: { x: 250, y: 350 },
        data: {
          operation: 'Send',
          description: 'Send formatted response'
        }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#999', strokeWidth: 2 } },
      { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#999', strokeWidth: 2 } }
    ],
    steps: [
      { node: 'Webhook Trigger', output: 'Received message: "/weather New York"' },
      { node: 'AI Processing', output: 'Processed command: Getting weather for New York\nFetched data: 72°F, Partly Cloudy' },
      { node: 'Telegram Reply', output: 'Sent response: "Current weather in New York: 72°F, Partly Cloudy ⛅"' }
    ]
  }
};

const WorkflowSimulation = ({ workflowId, onBack }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('twitterAutoReply');
  const [activeNodes, setActiveNodes] = useState([]);
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Delete node handler
  const handleDeleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, [setNodes, setEdges]);

  // Load template when selected
  const handleTemplateChange = (event) => {
    const template = WORKFLOW_TEMPLATES[event.target.value];
    setSelectedTemplate(event.target.value);
    setResults([]);
    setActiveNodes([]);
    
    // Add delete handler to each node
    const nodesWithDelete = template.nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        onDelete: handleDeleteNode
      }
    }));
    
    setNodes(nodesWithDelete);
    setEdges(template.edges);
  };

  // Initialize template on mount
  useEffect(() => {
    const template = WORKFLOW_TEMPLATES[selectedTemplate];
    const nodesWithDelete = template.nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        onDelete: handleDeleteNode
      }
    }));
    setNodes(nodesWithDelete);
    setEdges(template.edges);
  }, [handleDeleteNode, selectedTemplate, setNodes, setEdges]);

  // Handle new edge connections
  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#999', strokeWidth: 2 } }, eds));
  }, [setEdges]);

  // Add new node
  const addNode = (template) => {
    const newNode = {
      id: `${Date.now()}`,
      type: template.type,
      position: { x: 250, y: 200 },
      data: {
        ...template.data,
        onDelete: handleDeleteNode
      }
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // Save modified workflow
  const saveWorkflow = () => {
    const workflow = {
      nodes,
      edges,
      steps: WORKFLOW_TEMPLATES[selectedTemplate].steps
    };
    console.log('Saving workflow:', workflow);
  };

  const handleRunSimulation = () => {
    setIsRunning(true);
    setResults([]);
    setActiveNodes([]);

    const template = WORKFLOW_TEMPLATES[selectedTemplate];
    const steps = template.steps;

    const simulateStep = (step, index, delay) => {
      setTimeout(() => {
        setResults(prev => [...prev, {
          node: step.node,
          status: 'completed',
          output: step.output
        }]);
        setActiveNodes(prev => [...prev, step.node]);

        if (index === steps.length - 1) {
          setIsRunning(false);
        }
      }, delay);
    };

    steps.forEach((step, index) => {
      simulateStep(step, index, (index + 1) * 1500);
    });
  };

  return (
    <ReactFlowProvider>
      <Box sx={{ p: 2, pt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Workflow Simulation
        </Typography>

        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 300 }}>
            <InputLabel>Select Template</InputLabel>
            <Select
              value={selectedTemplate}
              onChange={handleTemplateChange}
              label="Select Template"
              disabled={isRunning}
            >
              {Object.entries(WORKFLOW_TEMPLATES).map(([key, template]) => (
                <MenuItem key={key} value={key}>{template.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button 
            variant="contained"
            onClick={handleRunSimulation}
            disabled={isRunning}
            sx={{ 
              bgcolor: '#1976d2',
              color: 'white',
              textTransform: 'uppercase',
              '&:hover': {
                bgcolor: '#1565c0'
              }
            }}
          >
            {isRunning ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                Running Simulation...
              </Box>
            ) : (
              'RUN SIMULATION'
            )}
          </Button>

          <Button
            variant="outlined"
            onClick={saveWorkflow}
            startIcon={<SaveIcon />}
            disabled={isRunning}
          >
            Save Workflow
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box 
            sx={{ 
              flex: 1.5,
              bgcolor: 'white',
              borderRadius: 1,
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
              p: 3,
              position: 'relative'
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Workflow Preview
            </Typography>
            <Box sx={{ height: 550 }}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                defaultzoom={1.5}
                minZoom={0.5}
                maxZoom={2}
                attributionPosition="bottom-left"
              >
                <Background color="#f8f8f8" gap={16} />
                <Controls />
              </ReactFlow>
            </Box>

            <SpeedDial
              ariaLabel="Add Node"
              sx={{ position: 'absolute', bottom: 16, right: 16 }}
              icon={<SpeedDialIcon />}
            >
              {nodeTemplates.map((template) => (
                <SpeedDialAction
                  key={template.type}
                  icon={template.icon}
                  tooltipTitle={template.label}
                  onClick={() => addNode(template)}
                />
              ))}
            </SpeedDial>
          </Box>

          <Box 
            sx={{ 
              width: 400,
              bgcolor: 'white',
              borderRadius: 1,
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
              p: 3,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Simulation Results
            </Typography>
            
            {isRunning && results.length === 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary', mt: 2 }}>
                <CircularProgress size={20} />
                <Typography>Starting simulation...</Typography>
              </Box>
            )}

            <List sx={{ flex: 1, overflow: 'auto' }}>
              {results.map((result, index) => (
                <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'flex-start', borderBottom: '1px solid #eee', py: 2 }}>
                  <ListItemText 
                    primary={result.node}
                    secondary={result.output}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      color: 'primary.main',
                      gutterBottom: true
                    }}
                    secondaryTypographyProps={{
                      sx: { 
                        whiteSpace: 'pre-wrap',
                        color: 'text.primary',
                        fontSize: '0.9rem'
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </ReactFlowProvider>
  );
};

export default WorkflowSimulation;
