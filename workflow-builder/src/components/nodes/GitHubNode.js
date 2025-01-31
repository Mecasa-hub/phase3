import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const GitHubNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #ddd',
        minWidth: '200px',
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
        <GitHubIcon sx={{ color: '#24292F' }} />
        <Typography variant="subtitle2">GitHub</Typography>
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
        label="Access Token"
        type="password"
        value={data.accessToken || ''}
        onChange={handleChange('accessToken')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Repository Owner"
        value={data.owner || ''}
        onChange={handleChange('owner')}
        placeholder="GitHub username or organization"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Repository Name"
        value={data.repo || ''}
        onChange={handleChange('repo')}
        placeholder="Repository name"
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'createIssue'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="createIssue">Create Issue</MenuItem>
          <MenuItem value="updateIssue">Update Issue</MenuItem>
          <MenuItem value="closeIssue">Close Issue</MenuItem>
          <MenuItem value="createPR">Create Pull Request</MenuItem>
          <MenuItem value="mergePR">Merge Pull Request</MenuItem>
          <MenuItem value="createRelease">Create Release</MenuItem>
          <MenuItem value="createBranch">Create Branch</MenuItem>
          <MenuItem value="deleteBranch">Delete Branch</MenuItem>
          <MenuItem value="addComment">Add Comment</MenuItem>
          <MenuItem value="createFile">Create File</MenuItem>
          <MenuItem value="updateFile">Update File</MenuItem>
          <MenuItem value="deleteFile">Delete File</MenuItem>
          <MenuItem value="listIssues">List Issues</MenuItem>
          <MenuItem value="listPRs">List Pull Requests</MenuItem>
          <MenuItem value="getContent">Get Content</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Issue/PR Number"
        value={data.number || ''}
        onChange={handleChange('number')}
        placeholder="Issue or PR number"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Title"
        value={data.title || ''}
        onChange={handleChange('title')}
        placeholder="Title for issue/PR/release"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Body"
        multiline
        rows={4}
        value={data.body || ''}
        onChange={handleChange('body')}
        placeholder="Content in markdown format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Labels"
        value={data.labels || ''}
        onChange={handleChange('labels')}
        placeholder="Comma-separated labels"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Assignees"
        value={data.assignees || ''}
        onChange={handleChange('assignees')}
        placeholder="Comma-separated usernames"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Branch Name"
        value={data.branch || ''}
        onChange={handleChange('branch')}
        placeholder="Branch name"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Base Branch"
        value={data.baseBranch || ''}
        onChange={handleChange('baseBranch')}
        placeholder="Base branch for PR"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="File Path"
        value={data.path || ''}
        onChange={handleChange('path')}
        placeholder="Path to file"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Commit Message"
        value={data.commitMessage || ''}
        onChange={handleChange('commitMessage')}
        placeholder="Git commit message"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.draft || false}
            onChange={handleSwitchChange('draft')}
          />
        }
        label="Create as Draft"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default GitHubNode;
