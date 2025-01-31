import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const PushoverNode = ({ id, data, isConnectable, updateNodeData }) => {
  const { setNodes, setEdges } = useReactFlow();

  const onDelete = () => {
    setNodes((nodes) => nodes.filter(node => node.id !== id));
    setEdges((edges) => edges.filter(edge => edge.source !== id && edge.target !== id));
  };

  const handleChange = (field) => (event) => {
    updateNodeData({ ...data, [field]: event.target.value });
  };

  const handleSwitchChange = (field) => (event) => {
    updateNodeData({ ...data, [field]: event.target.checked });
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
        <NotificationsIcon sx={{ color: '#1976d2' }} />
        <Typography variant="subtitle2">Pushover</Typography>
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
        label="API Token"
        type="password"
        value={data.apiToken || ''}
        onChange={handleChange('apiToken')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="User Key"
        type="password"
        value={data.userKey || ''}
        onChange={handleChange('userKey')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Device"
        value={data.device || ''}
        onChange={handleChange('device')}
        placeholder="Device name (optional)"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Message"
        multiline
        rows={3}
        value={data.message || ''}
        onChange={handleChange('message')}
        placeholder="Notification message"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Title"
        value={data.title || ''}
        onChange={handleChange('title')}
        placeholder="Notification title"
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          value={data.priority || '0'}
          onChange={handleChange('priority')}
          label="Priority"
        >
          <MenuItem value="-2">Lowest</MenuItem>
          <MenuItem value="-1">Low</MenuItem>
          <MenuItem value="0">Normal</MenuItem>
          <MenuItem value="1">High</MenuItem>
          <MenuItem value="2">Emergency</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Sound"
        value={data.sound || ''}
        onChange={handleChange('sound')}
        placeholder="Notification sound"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="URL"
        value={data.url || ''}
        onChange={handleChange('url')}
        placeholder="Supplementary URL"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="URL Title"
        value={data.urlTitle || ''}
        onChange={handleChange('urlTitle')}
        placeholder="Title for supplementary URL"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Timestamp"
        type="number"
        value={data.timestamp || ''}
        onChange={handleChange('timestamp')}
        placeholder="Unix timestamp (optional)"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Retry"
        type="number"
        value={data.retry || ''}
        onChange={handleChange('retry')}
        placeholder="Retry interval (seconds)"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Expire"
        type="number"
        value={data.expire || ''}
        onChange={handleChange('expire')}
        placeholder="Expiry time (seconds)"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.html || false}
            onChange={handleSwitchChange('html')}
          />
        }
        label="HTML Formatting"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.monospace || false}
            onChange={handleSwitchChange('monospace')}
          />
        }
        label="Monospace Font"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default PushoverNode;
