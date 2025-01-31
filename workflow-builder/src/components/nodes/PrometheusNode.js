import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

const PrometheusNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Prometheus</Typography>

      <TextField
        fullWidth
        label="URL"
        value={data.url || ''}
        onChange={handleChange('url')}
        placeholder="http://prometheus.example.com:9090"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Basic Auth Username"
        value={data.username || ''}
        onChange={handleChange('username')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Basic Auth Password"
        type="password"
        value={data.password || ''}
        onChange={handleChange('password')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'query'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="query">Instant Query</MenuItem>
          <MenuItem value="queryRange">Range Query</MenuItem>
          <MenuItem value="series">Series Query</MenuItem>
          <MenuItem value="labels">Get Label Names</MenuItem>
          <MenuItem value="labelValues">Get Label Values</MenuItem>
          <MenuItem value="targets">Get Targets</MenuItem>
          <MenuItem value="rules">Get Rules</MenuItem>
          <MenuItem value="alerts">Get Alerts</MenuItem>
          <MenuItem value="alertmanagers">Get Alertmanagers</MenuItem>
          <MenuItem value="status">Get Status</MenuItem>
          <MenuItem value="config">Get Config</MenuItem>
          <MenuItem value="flags">Get Flags</MenuItem>
          <MenuItem value="metadata">Get Metadata</MenuItem>
          <MenuItem value="tsdb">Get TSDB Stats</MenuItem>
          <MenuItem value="walReplay">Get WAL Replay</MenuItem>
          <MenuItem value="buildinfo">Get Build Info</MenuItem>
          <MenuItem value="runtimeinfo">Get Runtime Info</MenuItem>
          <MenuItem value="metrics">Get Metrics</MenuItem>
          <MenuItem value="federate">Federate Metrics</MenuItem>
          <MenuItem value="snapshot">Create Snapshot</MenuItem>
          <MenuItem value="deleteData">Delete Data</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="PromQL Query"
        multiline
        rows={4}
        value={data.query || ''}
        onChange={handleChange('query')}
        placeholder="up{job='prometheus'}"
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

      <TextField
        fullWidth
        label="Step"
        value={data.step || ''}
        onChange={handleChange('step')}
        placeholder="15s, 1m, 1h"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Match[]"
        value={data.match || ''}
        onChange={handleChange('match')}
        placeholder="Series selector"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Label Name"
        value={data.labelName || ''}
        onChange={handleChange('labelName')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>State</InputLabel>
        <Select
          value={data.state || 'any'}
          onChange={handleChange('state')}
          label="State"
        >
          <MenuItem value="any">Any</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="firing">Firing</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Evaluation Time"
        value={data.evaluationTime || ''}
        onChange={handleChange('evaluationTime')}
        placeholder="Time in seconds"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Timeout"
        value={data.timeout || ''}
        onChange={handleChange('timeout')}
        placeholder="Timeout in seconds"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Block Duration"
        value={data.blockDuration || ''}
        onChange={handleChange('blockDuration')}
        placeholder="Duration in seconds"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default PrometheusNode;
