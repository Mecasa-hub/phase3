import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { Code as CodeIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const BitbucketNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <CodeIcon sx={{ color: '#2684FF' }} />
        <Typography variant="subtitle2">Bitbucket</Typography>
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
        label="Username"
        value={data.username || ''}
        onChange={handleChange('username')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="App Password"
        type="password"
        value={data.appPassword || ''}
        onChange={handleChange('appPassword')}
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
          <MenuItem value="updateRepository">Update Repository</MenuItem>
          <MenuItem value="deleteRepository">Delete Repository</MenuItem>
          <MenuItem value="forkRepository">Fork Repository</MenuItem>
          <MenuItem value="getPullRequest">Get Pull Request</MenuItem>
          <MenuItem value="listPullRequests">List Pull Requests</MenuItem>
          <MenuItem value="createPullRequest">Create Pull Request</MenuItem>
          <MenuItem value="updatePullRequest">Update Pull Request</MenuItem>
          <MenuItem value="mergePullRequest">Merge PR</MenuItem>
          <MenuItem value="declinePullRequest">Decline PR</MenuItem>
          <MenuItem value="approvePullRequest">Approve PR</MenuItem>
          <MenuItem value="getIssue">Get Issue</MenuItem>
          <MenuItem value="listIssues">List Issues</MenuItem>
          <MenuItem value="createIssue">Create Issue</MenuItem>
          <MenuItem value="updateIssue">Update Issue</MenuItem>
          <MenuItem value="deleteIssue">Delete Issue</MenuItem>
          <MenuItem value="getCommit">Get Commit</MenuItem>
          <MenuItem value="listCommits">List Commits</MenuItem>
          <MenuItem value="getBranch">Get Branch</MenuItem>
          <MenuItem value="listBranches">List Branches</MenuItem>
          <MenuItem value="createBranch">Create Branch</MenuItem>
          <MenuItem value="deleteBranch">Delete Branch</MenuItem>
          <MenuItem value="getTag">Get Tag</MenuItem>
          <MenuItem value="listTags">List Tags</MenuItem>
          <MenuItem value="createTag">Create Tag</MenuItem>
          <MenuItem value="deleteTag">Delete Tag</MenuItem>
          <MenuItem value="getPipeline">Get Pipeline</MenuItem>
          <MenuItem value="listPipelines">List Pipelines</MenuItem>
          <MenuItem value="triggerPipeline">Trigger Pipeline</MenuItem>
          <MenuItem value="stopPipeline">Stop Pipeline</MenuItem>
          <MenuItem value="getDeployment">Get Deployment</MenuItem>
          <MenuItem value="listDeployments">List Deployments</MenuItem>
          <MenuItem value="createDeployment">Create Deployment</MenuItem>
          <MenuItem value="getDownload">Get Download</MenuItem>
          <MenuItem value="listDownloads">List Downloads</MenuItem>
          <MenuItem value="createDownload">Create Download</MenuItem>
          <MenuItem value="deleteDownload">Delete Download</MenuItem>
          <MenuItem value="getWebhook">Get Webhook</MenuItem>
          <MenuItem value="listWebhooks">List Webhooks</MenuItem>
          <MenuItem value="createWebhook">Create Webhook</MenuItem>
          <MenuItem value="updateWebhook">Update Webhook</MenuItem>
          <MenuItem value="deleteWebhook">Delete Webhook</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Workspace"
        value={data.workspace || ''}
        onChange={handleChange('workspace')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Repository Slug"
        value={data.repositorySlug || ''}
        onChange={handleChange('repositorySlug')}
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
        label="Issue ID"
        value={data.issueId || ''}
        onChange={handleChange('issueId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Pipeline UUID"
        value={data.pipelineUuid || ''}
        onChange={handleChange('pipelineUuid')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Commit Hash"
        value={data.commitHash || ''}
        onChange={handleChange('commitHash')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Reviewers"
        value={data.reviewers || ''}
        onChange={handleChange('reviewers')}
        placeholder="Comma-separated usernames"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.closeSourceBranch || false}
            onChange={handleSwitchChange('closeSourceBranch')}
          />
        }
        label="Close Source Branch"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.isPrivate || true}
            onChange={handleSwitchChange('isPrivate')}
          />
        }
        label="Private Repository"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default BitbucketNode;
