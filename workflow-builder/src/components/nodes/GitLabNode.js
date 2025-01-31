import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { Code as CodeIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const GitLabNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <CodeIcon sx={{ color: '#FC6D26' }} />
        <Typography variant="subtitle2">GitLab</Typography>
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
        label="URL"
        value={data.url || ''}
        onChange={handleChange('url')}
        placeholder="https://gitlab.example.com"
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
          value={data.operation || 'getProject'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="getProject">Get Project</MenuItem>
          <MenuItem value="listProjects">List Projects</MenuItem>
          <MenuItem value="createProject">Create Project</MenuItem>
          <MenuItem value="updateProject">Update Project</MenuItem>
          <MenuItem value="deleteProject">Delete Project</MenuItem>
          <MenuItem value="forkProject">Fork Project</MenuItem>
          <MenuItem value="starProject">Star Project</MenuItem>
          <MenuItem value="unstarProject">Unstar Project</MenuItem>
          <MenuItem value="getMergeRequest">Get Merge Request</MenuItem>
          <MenuItem value="listMergeRequests">List Merge Requests</MenuItem>
          <MenuItem value="createMergeRequest">Create Merge Request</MenuItem>
          <MenuItem value="updateMergeRequest">Update Merge Request</MenuItem>
          <MenuItem value="mergeMergeRequest">Merge MR</MenuItem>
          <MenuItem value="closeMergeRequest">Close MR</MenuItem>
          <MenuItem value="approveMergeRequest">Approve MR</MenuItem>
          <MenuItem value="unapproveeMergeRequest">Unapprove MR</MenuItem>
          <MenuItem value="getIssue">Get Issue</MenuItem>
          <MenuItem value="listIssues">List Issues</MenuItem>
          <MenuItem value="createIssue">Create Issue</MenuItem>
          <MenuItem value="updateIssue">Update Issue</MenuItem>
          <MenuItem value="closeIssue">Close Issue</MenuItem>
          <MenuItem value="reopenIssue">Reopen Issue</MenuItem>
          <MenuItem value="getCommit">Get Commit</MenuItem>
          <MenuItem value="listCommits">List Commits</MenuItem>
          <MenuItem value="getBranch">Get Branch</MenuItem>
          <MenuItem value="listBranches">List Branches</MenuItem>
          <MenuItem value="createBranch">Create Branch</MenuItem>
          <MenuItem value="deleteBranch">Delete Branch</MenuItem>
          <MenuItem value="protectBranch">Protect Branch</MenuItem>
          <MenuItem value="unprotectBranch">Unprotect Branch</MenuItem>
          <MenuItem value="getTag">Get Tag</MenuItem>
          <MenuItem value="listTags">List Tags</MenuItem>
          <MenuItem value="createTag">Create Tag</MenuItem>
          <MenuItem value="deleteTag">Delete Tag</MenuItem>
          <MenuItem value="getPipeline">Get Pipeline</MenuItem>
          <MenuItem value="listPipelines">List Pipelines</MenuItem>
          <MenuItem value="createPipeline">Create Pipeline</MenuItem>
          <MenuItem value="retryPipeline">Retry Pipeline</MenuItem>
          <MenuItem value="cancelPipeline">Cancel Pipeline</MenuItem>
          <MenuItem value="getJob">Get Job</MenuItem>
          <MenuItem value="listJobs">List Jobs</MenuItem>
          <MenuItem value="runJob">Run Job</MenuItem>
          <MenuItem value="cancelJob">Cancel Job</MenuItem>
          <MenuItem value="retryJob">Retry Job</MenuItem>
          <MenuItem value="getArtifact">Get Artifact</MenuItem>
          <MenuItem value="listArtifacts">List Artifacts</MenuItem>
          <MenuItem value="downloadArtifact">Download Artifact</MenuItem>
          <MenuItem value="deleteArtifact">Delete Artifact</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Project ID"
        value={data.projectId || ''}
        onChange={handleChange('projectId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Project Name"
        value={data.projectName || ''}
        onChange={handleChange('projectName')}
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
        label="MR ID"
        value={data.mergeRequestId || ''}
        onChange={handleChange('mergeRequestId')}
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
        label="Issue ID"
        value={data.issueId || ''}
        onChange={handleChange('issueId')}
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
        label="Labels"
        value={data.labels || ''}
        onChange={handleChange('labels')}
        placeholder="Comma-separated labels"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Assignee IDs"
        value={data.assigneeIds || ''}
        onChange={handleChange('assigneeIds')}
        placeholder="Comma-separated user IDs"
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
        label="Job ID"
        value={data.jobId || ''}
        onChange={handleChange('jobId')}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.squash || false}
            onChange={handleSwitchChange('squash')}
          />
        }
        label="Squash Commits"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.removeSourceBranch || false}
            onChange={handleSwitchChange('removeSourceBranch')}
          />
        }
        label="Remove Source Branch"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default GitLabNode;
