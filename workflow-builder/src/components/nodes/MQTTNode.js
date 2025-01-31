import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const MQTTNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>MQTT</Typography>

      <TextField
        fullWidth
        label="Broker URL"
        value={data.brokerUrl || ''}
        onChange={handleChange('brokerUrl')}
        placeholder="mqtt://broker.example.com"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Port"
        value={data.port || ''}
        onChange={handleChange('port')}
        placeholder="1883"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Client ID"
        value={data.clientId || ''}
        onChange={handleChange('clientId')}
        placeholder="Unique client identifier"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Username"
        value={data.username || ''}
        onChange={handleChange('username')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        value={data.password || ''}
        onChange={handleChange('password')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'publish'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="publish">Publish</MenuItem>
          <MenuItem value="subscribe">Subscribe</MenuItem>
          <MenuItem value="unsubscribe">Unsubscribe</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Topic"
        value={data.topic || ''}
        onChange={handleChange('topic')}
        placeholder="sensor/temperature"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Message"
        multiline
        rows={4}
        value={data.message || ''}
        onChange={handleChange('message')}
        placeholder="Message payload"
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>QoS Level</InputLabel>
        <Select
          value={data.qos || '0'}
          onChange={handleChange('qos')}
          label="QoS Level"
        >
          <MenuItem value="0">0 - At most once</MenuItem>
          <MenuItem value="1">1 - At least once</MenuItem>
          <MenuItem value="2">2 - Exactly once</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Switch
            checked={data.retain || false}
            onChange={handleSwitchChange('retain')}
          />
        }
        label="Retain Message"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.cleanSession || true}
            onChange={handleSwitchChange('cleanSession')}
          />
        }
        label="Clean Session"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Will Topic"
        value={data.willTopic || ''}
        onChange={handleChange('willTopic')}
        placeholder="Last will and testament topic"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Will Message"
        value={data.willMessage || ''}
        onChange={handleChange('willMessage')}
        placeholder="Last will and testament message"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Keep Alive"
        type="number"
        value={data.keepAlive || ''}
        onChange={handleChange('keepAlive')}
        placeholder="Seconds (default: 60)"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default MQTTNode;
