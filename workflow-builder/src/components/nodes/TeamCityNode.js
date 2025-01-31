import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { Build as BuildIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const TeamCityNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <BuildIcon sx={{ color: '#0CB0F2' }} />
        <Typography variant="subtitle2">TeamCity</Typography>
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
        placeholder="https://teamcity.example.com"
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
          value={data.operation || 'getBuild'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="getBuild">Get Build</MenuItem>
          <MenuItem value="listBuilds">List Builds</MenuItem>
          <MenuItem value="startBuild">Start Build</MenuItem>
          <MenuItem value="cancelBuild">Cancel Build</MenuItem>
          <MenuItem value="pinBuild">Pin Build</MenuItem>
          <MenuItem value="unpinBuild">Unpin Build</MenuItem>
          <MenuItem value="tagBuild">Tag Build</MenuItem>
          <MenuItem value="untagBuild">Untag Build</MenuItem>
          <MenuItem value="getBuildType">Get Build Configuration</MenuItem>
          <MenuItem value="listBuildTypes">List Build Configurations</MenuItem>
          <MenuItem value="createBuildType">Create Build Configuration</MenuItem>
          <MenuItem value="updateBuildType">Update Build Configuration</MenuItem>
          <MenuItem value="deleteBuildType">Delete Build Configuration</MenuItem>
          <MenuItem value="pauseBuildType">Pause Build Configuration</MenuItem>
          <MenuItem value="unpauseBuildType">Unpause Build Configuration</MenuItem>
          <MenuItem value="getProject">Get Project</MenuItem>
          <MenuItem value="listProjects">List Projects</MenuItem>
          <MenuItem value="createProject">Create Project</MenuItem>
          <MenuItem value="updateProject">Update Project</MenuItem>
          <MenuItem value="deleteProject">Delete Project</MenuItem>
          <MenuItem value="archiveProject">Archive Project</MenuItem>
          <MenuItem value="unarchiveProject">Unarchive Project</MenuItem>
          <MenuItem value="getAgent">Get Agent</MenuItem>
          <MenuItem value="listAgents">List Agents</MenuItem>
          <MenuItem value="enableAgent">Enable Agent</MenuItem>
          <MenuItem value="disableAgent">Disable Agent</MenuItem>
          <MenuItem value="authorizeAgent">Authorize Agent</MenuItem>
          <MenuItem value="unauthorizeAgent">Unauthorize Agent</MenuItem>
          <MenuItem value="getVcsRoot">Get VCS Root</MenuItem>
          <MenuItem value="listVcsRoots">List VCS Roots</MenuItem>
          <MenuItem value="createVcsRoot">Create VCS Root</MenuItem>
          <MenuItem value="updateVcsRoot">Update VCS Root</MenuItem>
          <MenuItem value="deleteVcsRoot">Delete VCS Root</MenuItem>
          <MenuItem value="getArtifact">Get Artifact</MenuItem>
          <MenuItem value="listArtifacts">List Artifacts</MenuItem>
          <MenuItem value="downloadArtifact">Download Artifact</MenuItem>
          <MenuItem value="getParameter">Get Parameter</MenuItem>
          <MenuItem value="listParameters">List Parameters</MenuItem>
          <MenuItem value="setParameter">Set Parameter</MenuItem>
          <MenuItem value="deleteParameter">Delete Parameter</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Build ID"
        value={data.buildId || ''}
        onChange={handleChange('buildId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Build Type ID"
        value={data.buildTypeId || ''}
        onChange={handleChange('buildTypeId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Project ID"
        value={data.projectId || ''}
        onChange={handleChange('projectId')}
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
        label="VCS Root ID"
        value={data.vcsRootId || ''}
        onChange={handleChange('vcsRootId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Parameter Name"
        value={data.parameterName || ''}
        onChange={handleChange('parameterName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Parameter Value"
        value={data.parameterValue || ''}
        onChange={handleChange('parameterValue')}
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

      <TextField
        fullWidth
        label="Tags"
        value={data.tags || ''}
        onChange={handleChange('tags')}
        placeholder="Comma-separated tags"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.cleanSources || false}
            onChange={handleSwitchChange('cleanSources')}
          />
        }
        label="Clean Sources"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.queueAtTop || false}
            onChange={handleSwitchChange('queueAtTop')}
          />
        }
        label="Queue at Top"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default TeamCityNode;
