import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { AutoMode as AutoModeIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const CircleCINode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <AutoModeIcon sx={{ color: '#343434' }} />
        <Typography variant="subtitle2">CircleCI</Typography>
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
          value={data.operation || 'getPipeline'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="getPipeline">Get Pipeline</MenuItem>
          <MenuItem value="listPipelines">List Pipelines</MenuItem>
          <MenuItem value="triggerPipeline">Trigger Pipeline</MenuItem>
          <MenuItem value="cancelPipeline">Cancel Pipeline</MenuItem>
          <MenuItem value="getBuild">Get Build</MenuItem>
          <MenuItem value="listBuilds">List Builds</MenuItem>
          <MenuItem value="retryBuild">Retry Build</MenuItem>
          <MenuItem value="cancelBuild">Cancel Build</MenuItem>
          <MenuItem value="getWorkflow">Get Workflow</MenuItem>
          <MenuItem value="listWorkflows">List Workflows</MenuItem>
          <MenuItem value="rerunWorkflow">Rerun Workflow</MenuItem>
          <MenuItem value="cancelWorkflow">Cancel Workflow</MenuItem>
          <MenuItem value="getJob">Get Job</MenuItem>
          <MenuItem value="listJobs">List Jobs</MenuItem>
          <MenuItem value="getArtifacts">Get Artifacts</MenuItem>
          <MenuItem value="listArtifacts">List Artifacts</MenuItem>
          <MenuItem value="getTests">Get Tests</MenuItem>
          <MenuItem value="listTests">List Tests</MenuItem>
          <MenuItem value="getProject">Get Project</MenuItem>
          <MenuItem value="listProjects">List Projects</MenuItem>
          <MenuItem value="getEnvVar">Get Environment Variable</MenuItem>
          <MenuItem value="listEnvVars">List Environment Variables</MenuItem>
          <MenuItem value="addEnvVar">Add Environment Variable</MenuItem>
          <MenuItem value="deleteEnvVar">Delete Environment Variable</MenuItem>
          <MenuItem value="getContext">Get Context</MenuItem>
          <MenuItem value="listContexts">List Contexts</MenuItem>
          <MenuItem value="createContext">Create Context</MenuItem>
          <MenuItem value="deleteContext">Delete Context</MenuItem>
          <MenuItem value="getContextEnvVar">Get Context Env Var</MenuItem>
          <MenuItem value="addContextEnvVar">Add Context Env Var</MenuItem>
          <MenuItem value="deleteContextEnvVar">Delete Context Env Var</MenuItem>
          <MenuItem value="getCheckoutKey">Get Checkout Key</MenuItem>
          <MenuItem value="listCheckoutKeys">List Checkout Keys</MenuItem>
          <MenuItem value="createCheckoutKey">Create Checkout Key</MenuItem>
          <MenuItem value="deleteCheckoutKey">Delete Checkout Key</MenuItem>
          <MenuItem value="getSSHKey">Get SSH Key</MenuItem>
          <MenuItem value="listSSHKeys">List SSH Keys</MenuItem>
          <MenuItem value="addSSHKey">Add SSH Key</MenuItem>
          <MenuItem value="removeSSHKey">Remove SSH Key</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Project Slug"
        value={data.projectSlug || ''}
        onChange={handleChange('projectSlug')}
        placeholder="gh/username/repo"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Pipeline ID"
        value={data.pipelineId || ''}
        onChange={handleChange('pipelineId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Build Number"
        value={data.buildNum || ''}
        onChange={handleChange('buildNum')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Workflow ID"
        value={data.workflowId || ''}
        onChange={handleChange('workflowId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Job Number"
        value={data.jobNumber || ''}
        onChange={handleChange('jobNumber')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Branch"
        value={data.branch || ''}
        onChange={handleChange('branch')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Tag"
        value={data.tag || ''}
        onChange={handleChange('tag')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Parameters"
        multiline
        rows={4}
        value={data.parameters || ''}
        onChange={handleChange('parameters')}
        placeholder="Pipeline parameters in JSON format"
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
        label="Context Name"
        value={data.contextName || ''}
        onChange={handleChange('contextName')}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.parallel || false}
            onChange={handleSwitchChange('parallel')}
          />
        }
        label="Run in Parallel"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.fromBeginning || false}
            onChange={handleSwitchChange('fromBeginning')}
          />
        }
        label="From Beginning"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default CircleCINode;
