import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const TheHiveNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>TheHive</Typography>

      <TextField
        fullWidth
        label="API URL"
        value={data.apiUrl || ''}
        onChange={handleChange('apiUrl')}
        placeholder="http://thehive.example.com:9000"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="API Key"
        type="password"
        value={data.apiKey || ''}
        onChange={handleChange('apiKey')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'createCase'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="createCase">Create Case</MenuItem>
          <MenuItem value="updateCase">Update Case</MenuItem>
          <MenuItem value="getCase">Get Case</MenuItem>
          <MenuItem value="listCases">List Cases</MenuItem>
          <MenuItem value="createTask">Create Task</MenuItem>
          <MenuItem value="updateTask">Update Task</MenuItem>
          <MenuItem value="getTask">Get Task</MenuItem>
          <MenuItem value="listTasks">List Tasks</MenuItem>
          <MenuItem value="createObservable">Create Observable</MenuItem>
          <MenuItem value="updateObservable">Update Observable</MenuItem>
          <MenuItem value="getObservable">Get Observable</MenuItem>
          <MenuItem value="listObservables">List Observables</MenuItem>
          <MenuItem value="createAlert">Create Alert</MenuItem>
          <MenuItem value="updateAlert">Update Alert</MenuItem>
          <MenuItem value="getAlert">Get Alert</MenuItem>
          <MenuItem value="listAlerts">List Alerts</MenuItem>
          <MenuItem value="createLog">Create Log</MenuItem>
          <MenuItem value="getLog">Get Log</MenuItem>
          <MenuItem value="listLogs">List Logs</MenuItem>
          <MenuItem value="createCustomField">Create Custom Field</MenuItem>
          <MenuItem value="updateCustomField">Update Custom Field</MenuItem>
          <MenuItem value="deleteCustomField">Delete Custom Field</MenuItem>
          <MenuItem value="listCustomFields">List Custom Fields</MenuItem>
          <MenuItem value="mergeCase">Merge Cases</MenuItem>
          <MenuItem value="promoteAlert">Promote Alert to Case</MenuItem>
          <MenuItem value="runAnalyzer">Run Analyzer</MenuItem>
          <MenuItem value="listAnalyzers">List Analyzers</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Case ID"
        value={data.caseId || ''}
        onChange={handleChange('caseId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Title"
        value={data.title || ''}
        onChange={handleChange('title')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Description"
        multiline
        rows={4}
        value={data.description || ''}
        onChange={handleChange('description')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Severity</InputLabel>
        <Select
          value={data.severity || 2}
          onChange={handleChange('severity')}
          label="Severity"
        >
          <MenuItem value={1}>Low</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>High</MenuItem>
          <MenuItem value={4}>Critical</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>TLP</InputLabel>
        <Select
          value={data.tlp || 2}
          onChange={handleChange('tlp')}
          label="TLP"
        >
          <MenuItem value={0}>White</MenuItem>
          <MenuItem value={1}>Green</MenuItem>
          <MenuItem value={2}>Amber</MenuItem>
          <MenuItem value={3}>Red</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>PAP</InputLabel>
        <Select
          value={data.pap || 2}
          onChange={handleChange('pap')}
          label="PAP"
        >
          <MenuItem value={0}>White</MenuItem>
          <MenuItem value={1}>Green</MenuItem>
          <MenuItem value={2}>Amber</MenuItem>
          <MenuItem value={3}>Red</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Tags"
        value={data.tags || ''}
        onChange={handleChange('tags')}
        placeholder="Comma-separated tags"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Task Title"
        value={data.taskTitle || ''}
        onChange={handleChange('taskTitle')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Observable Data"
        multiline
        rows={4}
        value={data.observableData || ''}
        onChange={handleChange('observableData')}
        placeholder="Observable data in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Observable Type"
        value={data.observableType || ''}
        onChange={handleChange('observableType')}
        placeholder="ip, domain, file, etc."
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Alert Title"
        value={data.alertTitle || ''}
        onChange={handleChange('alertTitle')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Alert Source"
        value={data.alertSource || ''}
        onChange={handleChange('alertSource')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Alert Type"
        value={data.alertType || ''}
        onChange={handleChange('alertType')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Custom Fields"
        multiline
        rows={4}
        value={data.customFields || ''}
        onChange={handleChange('customFields')}
        placeholder="Custom fields in JSON format"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.iocFlag || false}
            onChange={handleSwitchChange('iocFlag')}
          />
        }
        label="IOC Flag"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default TheHiveNode;
