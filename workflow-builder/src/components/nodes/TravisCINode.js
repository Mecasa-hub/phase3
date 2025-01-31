import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { Engineering as EngineeringIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const TravisCINode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <EngineeringIcon sx={{ color: '#C73A63' }} />
        <Typography variant="subtitle2">Travis CI</Typography>
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

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'getBuild'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="getBuild">Get Build</MenuItem>
          <MenuItem value="listBuilds">List Builds</MenuItem>
          <MenuItem value="restartBuild">Restart Build</MenuItem>
          <MenuItem value="cancelBuild">Cancel Build</MenuItem>
          <MenuItem value="getJob">Get Job</MenuItem>
          <MenuItem value="listJobs">List Jobs</MenuItem>
          <MenuItem value="restartJob">Restart Job</MenuItem>
          <MenuItem value="cancelJob">Cancel Job</MenuItem>
          <MenuItem value="getRepository">Get Repository</MenuItem>
          <MenuItem value="listRepositories">List Repositories</MenuItem>
          <MenuItem value="activateRepository">Activate Repository</MenuItem>
          <MenuItem value="deactivateRepository">Deactivate Repository</MenuItem>
          <MenuItem value="getBranch">Get Branch</MenuItem>
          <MenuItem value="listBranches">List Branches</MenuItem>
          <MenuItem value="getLog">Get Log</MenuItem>
          <MenuItem value="deleteLog">Delete Log</MenuItem>
          <MenuItem value="getCaches">Get Caches</MenuItem>
          <MenuItem value="deleteCaches">Delete Caches</MenuItem>
          <MenuItem value="getEnvVar">Get Environment Variable</MenuItem>
          <MenuItem value="listEnvVars">List Environment Variables</MenuItem>
          <MenuItem value="setEnvVar">Set Environment Variable</MenuItem>
          <MenuItem value="deleteEnvVar">Delete Environment Variable</MenuItem>
          <MenuItem value="getSetting">Get Setting</MenuItem>
          <MenuItem value="listSettings">List Settings</MenuItem>
          <MenuItem value="updateSetting">Update Setting</MenuItem>
          <MenuItem value="getKey">Get SSH Key</MenuItem>
          <MenuItem value="listKeys">List SSH Keys</MenuItem>
          <MenuItem value="createKey">Create SSH Key</MenuItem>
          <MenuItem value="deleteKey">Delete SSH Key</MenuItem>
          <MenuItem value="getUser">Get User</MenuItem>
          <MenuItem value="listUsers">List Users</MenuItem>
          <MenuItem value="sync">Sync User</MenuItem>
          <MenuItem value="getCurrentUser">Get Current User</MenuItem>
          <MenuItem value="getOrganization">Get Organization</MenuItem>
          <MenuItem value="listOrganizations">List Organizations</MenuItem>
          <MenuItem value="getBroadcasts">Get Broadcasts</MenuItem>
          <MenuItem value="listBroadcasts">List Broadcasts</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Repository Slug"
        value={data.repositorySlug || ''}
        onChange={handleChange('repositorySlug')}
        placeholder="owner/repository"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Build ID"
        value={data.buildId || ''}
        onChange={handleChange('buildId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Job ID"
        value={data.jobId || ''}
        onChange={handleChange('jobId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Branch Name"
        value={data.branchName || ''}
        onChange={handleChange('branchName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Environment Variable Name"
        value={data.envVarName || ''}
        onChange={handleChange('envVarName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Environment Variable Value"
        type="password"
        value={data.envVarValue || ''}
        onChange={handleChange('envVarValue')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="SSH Key"
        multiline
        rows={4}
        value={data.sshKey || ''}
        onChange={handleChange('sshKey')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Description"
        value={data.description || ''}
        onChange={handleChange('description')}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.isPublic || false}
            onChange={handleSwitchChange('isPublic')}
          />
        }
        label="Public"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.debugMode || false}
            onChange={handleSwitchChange('debugMode')}
          />
        }
        label="Debug Mode"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default TravisCINode;
