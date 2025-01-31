import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

const HomeAssistantNode = ({ data, isConnectable, updateNodeData }) => {
  const handleChange = (field) => (event) => {
    updateNodeData({ ...data, [field]: event.target.value });
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Home Assistant</Typography>

      <TextField
        fullWidth
        label="Host"
        value={data.host || ''}
        onChange={handleChange('host')}
        placeholder="http://homeassistant.local:8123"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Access Token"
        type="password"
        value={data.accessToken || ''}
        onChange={handleChange('accessToken')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'getState'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="getState">Get State</MenuItem>
          <MenuItem value="setState">Set State</MenuItem>
          <MenuItem value="callService">Call Service</MenuItem>
          <MenuItem value="fireEvent">Fire Event</MenuItem>
          <MenuItem value="getConfig">Get Config</MenuItem>
          <MenuItem value="getServices">Get Services</MenuItem>
          <MenuItem value="getStates">Get States</MenuItem>
          <MenuItem value="getEvents">Get Events</MenuItem>
          <MenuItem value="getErrorLog">Get Error Log</MenuItem>
          <MenuItem value="getHistory">Get History</MenuItem>
          <MenuItem value="getLogbook">Get Logbook</MenuItem>
          <MenuItem value="renderTemplate">Render Template</MenuItem>
          <MenuItem value="checkConfig">Check Config</MenuItem>
          <MenuItem value="restartServer">Restart Server</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Entity ID"
        value={data.entityId || ''}
        onChange={handleChange('entityId')}
        placeholder="light.living_room"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Domain"
        value={data.domain || ''}
        onChange={handleChange('domain')}
        placeholder="light"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Service"
        value={data.service || ''}
        onChange={handleChange('service')}
        placeholder="turn_on"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Service Data"
        multiline
        rows={4}
        value={data.serviceData || ''}
        onChange={handleChange('serviceData')}
        placeholder="Service data in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Event Type"
        value={data.eventType || ''}
        onChange={handleChange('eventType')}
        placeholder="automation_triggered"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Event Data"
        multiline
        rows={4}
        value={data.eventData || ''}
        onChange={handleChange('eventData')}
        placeholder="Event data in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Template"
        multiline
        rows={4}
        value={data.template || ''}
        onChange={handleChange('template')}
        placeholder="Jinja2 template"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Start Time"
        type="datetime-local"
        value={data.startTime || ''}
        onChange={handleChange('startTime')}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="End Time"
        type="datetime-local"
        value={data.endTime || ''}
        onChange={handleChange('endTime')}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default HomeAssistantNode;
