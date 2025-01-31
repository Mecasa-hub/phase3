import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { Cloud as CloudIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const AzureDevOpsNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <CloudIcon sx={{ color: '#0078D4' }} />
        <Typography variant="subtitle2">Azure DevOps</Typography>
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
        label="Organization"
        value={data.organization || ''}
        onChange={handleChange('organization')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Project"
        value={data.project || ''}
        onChange={handleChange('project')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Personal Access Token"
        type="password"
        value={data.pat || ''}
        onChange={handleChange('pat')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'getRepository'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="getRepository">Get Repository</MenuItem>
          <MenuItem value="listRepositories">List Repositories</MenuItem>
          <MenuItem value="createRepository">Create Repository</MenuItem>
          <MenuItem value="deleteRepository">Delete Repository</MenuItem>
          <MenuItem value="getBuild">Get Build</MenuItem>
          <MenuItem value="listBuilds">List Builds</MenuItem>
          <MenuItem value="queueBuild">Queue Build</MenuItem>
          <MenuItem value="cancelBuild">Cancel Build</MenuItem>
          <MenuItem value="getRelease">Get Release</MenuItem>
          <MenuItem value="listReleases">List Releases</MenuItem>
          <MenuItem value="createRelease">Create Release</MenuItem>
          <MenuItem value="updateRelease">Update Release</MenuItem>
          <MenuItem value="getWorkItem">Get Work Item</MenuItem>
          <MenuItem value="listWorkItems">List Work Items</MenuItem>
          <MenuItem value="createWorkItem">Create Work Item</MenuItem>
          <MenuItem value="updateWorkItem">Update Work Item</MenuItem>
          <MenuItem value="deleteWorkItem">Delete Work Item</MenuItem>
          <MenuItem value="getPullRequest">Get Pull Request</MenuItem>
          <MenuItem value="listPullRequests">List Pull Requests</MenuItem>
          <MenuItem value="createPullRequest">Create Pull Request</MenuItem>
          <MenuItem value="updatePullRequest">Update Pull Request</MenuItem>
          <MenuItem value="mergePullRequest">Merge Pull Request</MenuItem>
          <MenuItem value="getPipeline">Get Pipeline</MenuItem>
          <MenuItem value="listPipelines">List Pipelines</MenuItem>
          <MenuItem value="createPipeline">Create Pipeline</MenuItem>
          <MenuItem value="updatePipeline">Update Pipeline</MenuItem>
          <MenuItem value="runPipeline">Run Pipeline</MenuItem>
          <MenuItem value="getArtifact">Get Artifact</MenuItem>
          <MenuItem value="listArtifacts">List Artifacts</MenuItem>
          <MenuItem value="createArtifact">Create Artifact</MenuItem>
          <MenuItem value="deleteArtifact">Delete Artifact</MenuItem>
          <MenuItem value="getVariable">Get Variable</MenuItem>
          <MenuItem value="listVariables">List Variables</MenuItem>
          <MenuItem value="setVariable">Set Variable</MenuItem>
          <MenuItem value="deleteVariable">Delete Variable</MenuItem>
          <MenuItem value="getServiceEndpoint">Get Service Connection</MenuItem>
          <MenuItem value="listServiceEndpoints">List Service Connections</MenuItem>
          <MenuItem value="createServiceEndpoint">Create Service Connection</MenuItem>
          <MenuItem value="deleteServiceEndpoint">Delete Service Connection</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Repository ID"
        value={data.repositoryId || ''}
        onChange={handleChange('repositoryId')}
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
        label="Release ID"
        value={data.releaseId || ''}
        onChange={handleChange('releaseId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Work Item ID"
        value={data.workItemId || ''}
        onChange={handleChange('workItemId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Pull Request ID"
        value={data.pullRequestId || ''}
        onChange={handleChange('pullRequestId')}
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

      <TextField
        fullWidth
        label="Source Branch"
        value={data.sourceBranch || ''}
        onChange={handleChange('sourceBranch')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Target Branch"
        value={data.targetBranch || ''}
        onChange={handleChange('targetBranch')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Variable Group"
        value={data.variableGroup || ''}
        onChange={handleChange('variableGroup')}
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

      <FormControlLabel
        control={
          <Switch
            checked={data.isSecret || false}
            onChange={handleSwitchChange('isSecret')}
          />
        }
        label="Is Secret"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.autoComplete || false}
            onChange={handleSwitchChange('autoComplete')}
          />
        }
        label="Auto-Complete"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default AzureDevOpsNode;
