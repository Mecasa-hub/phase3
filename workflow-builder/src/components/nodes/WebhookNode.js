import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { Webhook as WebhookIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const WebhookNode = ({ id, data, isConnectable }) => {
  const { setNodes, setEdges } = useReactFlow();

  const onDelete = () => {
    setNodes((nodes) => nodes.filter(node => node.id !== id));
    setEdges((edges) => edges.filter(edge => edge.source !== id && edge.target !== id));
  };

  const handleChange = (field) => (event) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, [field]: event.target.value } }
          : node
      )
    );
  };

  const handleSwitchChange = (field) => (event) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, [field]: event.target.checked } }
          : node
      )
    );
  };

  return (
    <Box
      sx={{
        background: '#fff',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        minWidth: '250px',
      }}
    >
      <Handle type="target" position="top" isConnectable={isConnectable} />
      
      <Stack 
        direction="row" 
        spacing={1} 
        alignItems="center" 
        sx={{ 
          mb: 2,
          pb: 1,
          borderBottom: '1px solid #e0e0e0',
          pr: 4
        }}
      >
        <WebhookIcon sx={{ color: '#1976d2' }} />
        <Typography variant="subtitle2">Webhook Configuration</Typography>
      </Stack>

      <IconButton 
        size="small" 
        onClick={onDelete}
        sx={{ 
          position: 'absolute',
          top: 12,
          right: 12,
          bgcolor: 'rgba(0,0,0,0.05)',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' }
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>

      <TextField
        fullWidth
        label="Path"
        value={data.path || ''}
        onChange={handleChange('path')}
        placeholder="/webhook/endpoint"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Description"
        value={data.description || ''}
        onChange={handleChange('description')}
        placeholder="Describe webhook purpose"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.responseMode || false}
            onChange={handleSwitchChange('responseMode')}
          />
        }
        label="Response Mode"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Authentication Token"
        value={data.authToken || ''}
        onChange={handleChange('authToken')}
        type="password"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Response Template"
        multiline
        rows={3}
        value={data.responseTemplate || ''}
        onChange={handleChange('responseTemplate')}
        placeholder="Enter response template in JSON format"
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default WebhookNode;
