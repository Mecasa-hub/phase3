import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const JenkinsNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Jenkins</Typography>

      <TextField
        fullWidth
        label="URL"
        value={data.url || ''}
        onChange={handleChange('url')}
        placeholder="https://jenkins.example.com"
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
        label="API Token"
        type="password"
        value={data.apiToken || ''}
        onChange={handleChange('apiToken')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'getJob'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="getJob">Get Job</MenuItem>
          <MenuItem value="listJobs">List Jobs</MenuItem>
          <MenuItem value="createJob">Create Job</MenuItem>
          <MenuItem value="updateJob">Update Job</MenuItem>
          <MenuItem value="deleteJob">Delete Job</MenuItem>
          <MenuItem value="buildJob">Build Job</MenuItem>
          <MenuItem value="buildWithParams">Build with Parameters</MenuItem>
          <MenuItem value="stopBuild">Stop Build</MenuItem>
          <MenuItem value="getBuild">Get Build</MenuItem>
          <MenuItem value="listBuilds">List Builds</MenuItem>
          <MenuItem value="getBuildLog">Get Build Log</MenuItem>
          <MenuItem value="getLastBuild">Get Last Build</MenuItem>
          <MenuItem value="getLastSuccessfulBuild">Get Last Successful Build</MenuItem>
          <MenuItem value="getLastFailedBuild">Get Last Failed Build</MenuItem>
          <MenuItem value="getLastCompletedBuild">Get Last Completed Build</MenuItem>
          <MenuItem value="getJobConfig">Get Job Config</MenuItem>
          <MenuItem value="updateJobConfig">Update Job Config</MenuItem>
          <MenuItem value="copyJob">Copy Job</MenuItem>
          <MenuItem value="enableJob">Enable Job</MenuItem>
          <MenuItem value="disableJob">Disable Job</MenuItem>
          <MenuItem value="getQueue">Get Queue</MenuItem>
          <MenuItem value="cancelQueue">Cancel Queued Item</MenuItem>
          <MenuItem value="getNode">Get Node</MenuItem>
          <MenuItem value="listNodes">List Nodes</MenuItem>
          <MenuItem value="createNode">Create Node</MenuItem>
          <MenuItem value="updateNode">Update Node</MenuItem>
          <MenuItem value="deleteNode">Delete Node</MenuItem>
          <MenuItem value="enableNode">Enable Node</MenuItem>
          <MenuItem value="disableNode">Disable Node</MenuItem>
          <MenuItem value="getPlugin">Get Plugin</MenuItem>
          <MenuItem value="listPlugins">List Plugins</MenuItem>
          <MenuItem value="installPlugin">Install Plugin</MenuItem>
          <MenuItem value="uninstallPlugin">Uninstall Plugin</MenuItem>
          <MenuItem value="getCredential">Get Credential</MenuItem>
          <MenuItem value="listCredentials">List Credentials</MenuItem>
          <MenuItem value="createCredential">Create Credential</MenuItem>
          <MenuItem value="updateCredential">Update Credential</MenuItem>
          <MenuItem value="deleteCredential">Delete Credential</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Job Name"
        value={data.jobName || ''}
        onChange={handleChange('jobName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Build Number"
        type="number"
        value={data.buildNumber || ''}
        onChange={handleChange('buildNumber')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Build Parameters"
        multiline
        rows={4}
        value={data.buildParams || ''}
        onChange={handleChange('buildParams')}
        placeholder="Build parameters in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Job Config XML"
        multiline
        rows={6}
        value={data.jobConfig || ''}
        onChange={handleChange('jobConfig')}
        placeholder="Job configuration in XML format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Node Name"
        value={data.nodeName || ''}
        onChange={handleChange('nodeName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Plugin Name"
        value={data.pluginName || ''}
        onChange={handleChange('pluginName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Credential ID"
        value={data.credentialId || ''}
        onChange={handleChange('credentialId')}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.wait || false}
            onChange={handleSwitchChange('wait')}
          />
        }
        label="Wait for Completion"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.force || false}
            onChange={handleSwitchChange('force')}
          />
        }
        label="Force Operation"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default JenkinsNode;
