import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { Construction as ConstructionIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const BambooNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <ConstructionIcon sx={{ color: '#57D9A3' }} />
        <Typography variant="subtitle2">Bamboo</Typography>
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
        label="Server URL"
        value={data.serverUrl || ''}
        onChange={handleChange('serverUrl')}
        placeholder="https://bamboo.example.com"
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
          value={data.operation || 'getPlan'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="getPlan">Get Plan</MenuItem>
          <MenuItem value="listPlans">List Plans</MenuItem>
          <MenuItem value="enablePlan">Enable Plan</MenuItem>
          <MenuItem value="disablePlan">Disable Plan</MenuItem>
          <MenuItem value="getBuild">Get Build</MenuItem>
          <MenuItem value="listBuilds">List Builds</MenuItem>
          <MenuItem value="queueBuild">Queue Build</MenuItem>
          <MenuItem value="cancelBuild">Cancel Build</MenuItem>
          <MenuItem value="getDeployment">Get Deployment</MenuItem>
          <MenuItem value="listDeployments">List Deployments</MenuItem>
          <MenuItem value="createDeployment">Create Deployment</MenuItem>
          <MenuItem value="executeDeployment">Execute Deployment</MenuItem>
          <MenuItem value="getEnvironment">Get Environment</MenuItem>
          <MenuItem value="listEnvironments">List Environments</MenuItem>
          <MenuItem value="getProject">Get Project</MenuItem>
          <MenuItem value="listProjects">List Projects</MenuItem>
          <MenuItem value="getAgent">Get Agent</MenuItem>
          <MenuItem value="listAgents">List Agents</MenuItem>
          <MenuItem value="enableAgent">Enable Agent</MenuItem>
          <MenuItem value="disableAgent">Disable Agent</MenuItem>
          <MenuItem value="getArtifact">Get Artifact</MenuItem>
          <MenuItem value="listArtifacts">List Artifacts</MenuItem>
          <MenuItem value="downloadArtifact">Download Artifact</MenuItem>
          <MenuItem value="getVariable">Get Variable</MenuItem>
          <MenuItem value="listVariables">List Variables</MenuItem>
          <MenuItem value="setVariable">Set Variable</MenuItem>
          <MenuItem value="deleteVariable">Delete Variable</MenuItem>
          <MenuItem value="getPermission">Get Permission</MenuItem>
          <MenuItem value="listPermissions">List Permissions</MenuItem>
          <MenuItem value="grantPermission">Grant Permission</MenuItem>
          <MenuItem value="revokePermission">Revoke Permission</MenuItem>
          <MenuItem value="getLabel">Get Label</MenuItem>
          <MenuItem value="listLabels">List Labels</MenuItem>
          <MenuItem value="addLabel">Add Label</MenuItem>
          <MenuItem value="removeLabel">Remove Label</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Plan Key"
        value={data.planKey || ''}
        onChange={handleChange('planKey')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Build Number"
        value={data.buildNumber || ''}
        onChange={handleChange('buildNumber')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Project Key"
        value={data.projectKey || ''}
        onChange={handleChange('projectKey')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Environment ID"
        value={data.environmentId || ''}
        onChange={handleChange('environmentId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Agent ID"
        value={data.agentId || ''}
        onChange={handleChange('agentId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Artifact Name"
        value={data.artifactName || ''}
        onChange={handleChange('artifactName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Variable Name"
        value={data.variableName || ''}
        onChange={handleChange('variableName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Variable Value"
        type="password"
        value={data.variableValue || ''}
        onChange={handleChange('variableValue')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Label Name"
        value={data.labelName || ''}
        onChange={handleChange('labelName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Build Parameters"
        multiline
        rows={4}
        value={data.buildParameters || ''}
        onChange={handleChange('buildParameters')}
        placeholder="Build parameters in JSON format"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.customRevision || false}
            onChange={handleSwitchChange('customRevision')}
          />
        }
        label="Custom Revision"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.executeAllStages || true}
            onChange={handleSwitchChange('executeAllStages')}
          />
        }
        label="Execute All Stages"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default BambooNode;
