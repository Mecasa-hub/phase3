import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { BugReport as BugReportIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const JiraNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <BugReportIcon sx={{ color: '#0052CC' }} />
        <Typography variant="subtitle2">Jira Software</Typography>
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
        label="Domain"
        value={data.domain || ''}
        onChange={handleChange('domain')}
        placeholder="Your Jira domain"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Email"
        value={data.email || ''}
        onChange={handleChange('email')}
        placeholder="Jira account email"
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
          value={data.operation || 'createIssue'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="createIssue">Create Issue</MenuItem>
          <MenuItem value="updateIssue">Update Issue</MenuItem>
          <MenuItem value="deleteIssue">Delete Issue</MenuItem>
          <MenuItem value="getIssue">Get Issue</MenuItem>
          <MenuItem value="searchIssues">Search Issues</MenuItem>
          <MenuItem value="assignIssue">Assign Issue</MenuItem>
          <MenuItem value="addComment">Add Comment</MenuItem>
          <MenuItem value="updateComment">Update Comment</MenuItem>
          <MenuItem value="deleteComment">Delete Comment</MenuItem>
          <MenuItem value="addAttachment">Add Attachment</MenuItem>
          <MenuItem value="createProject">Create Project</MenuItem>
          <MenuItem value="updateProject">Update Project</MenuItem>
          <MenuItem value="deleteProject">Delete Project</MenuItem>
          <MenuItem value="getProject">Get Project</MenuItem>
          <MenuItem value="listProjects">List Projects</MenuItem>
          <MenuItem value="createVersion">Create Version</MenuItem>
          <MenuItem value="updateVersion">Update Version</MenuItem>
          <MenuItem value="deleteVersion">Delete Version</MenuItem>
          <MenuItem value="getVersion">Get Version</MenuItem>
          <MenuItem value="createComponent">Create Component</MenuItem>
          <MenuItem value="updateComponent">Update Component</MenuItem>
          <MenuItem value="deleteComponent">Delete Component</MenuItem>
          <MenuItem value="getComponent">Get Component</MenuItem>
          <MenuItem value="createSprint">Create Sprint</MenuItem>
          <MenuItem value="updateSprint">Update Sprint</MenuItem>
          <MenuItem value="deleteSprint">Delete Sprint</MenuItem>
          <MenuItem value="getSprint">Get Sprint</MenuItem>
          <MenuItem value="moveIssuesToSprint">Move Issues to Sprint</MenuItem>
          <MenuItem value="getTransitions">Get Transitions</MenuItem>
          <MenuItem value="transitionIssue">Transition Issue</MenuItem>
          <MenuItem value="getWorkflows">Get Workflows</MenuItem>
          <MenuItem value="getStatuses">Get Statuses</MenuItem>
          <MenuItem value="getFields">Get Fields</MenuItem>
          <MenuItem value="getIssueTypes">Get Issue Types</MenuItem>
          <MenuItem value="getPriorities">Get Priorities</MenuItem>
          <MenuItem value="getResolutions">Get Resolutions</MenuItem>
          <MenuItem value="getUsers">Get Users</MenuItem>
          <MenuItem value="getGroups">Get Groups</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Project Key"
        value={data.projectKey || ''}
        onChange={handleChange('projectKey')}
        placeholder="Jira project key"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Issue Key"
        value={data.issueKey || ''}
        onChange={handleChange('issueKey')}
        placeholder="Jira issue key"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Issue Type"
        value={data.issueType || ''}
        onChange={handleChange('issueType')}
        placeholder="Issue type (e.g., Story, Bug)"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Summary"
        value={data.summary || ''}
        onChange={handleChange('summary')}
        placeholder="Issue summary"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Description"
        multiline
        rows={4}
        value={data.description || ''}
        onChange={handleChange('description')}
        placeholder="Issue description"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Assignee"
        value={data.assignee || ''}
        onChange={handleChange('assignee')}
        placeholder="Username or email"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Priority"
        value={data.priority || ''}
        onChange={handleChange('priority')}
        placeholder="Issue priority"
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
        label="Components"
        value={data.components || ''}
        onChange={handleChange('components')}
        placeholder="Comma-separated components"
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

      <TextField
        fullWidth
        label="JQL Query"
        multiline
        rows={3}
        value={data.jql || ''}
        onChange={handleChange('jql')}
        placeholder="Jira Query Language (JQL)"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Transition ID"
        value={data.transitionId || ''}
        onChange={handleChange('transitionId')}
        placeholder="Workflow transition ID"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.updateHistory || false}
            onChange={handleSwitchChange('updateHistory')}
          />
        }
        label="Update Issue History"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.notifyUsers || false}
            onChange={handleSwitchChange('notifyUsers')}
          />
        }
        label="Notify Users"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default JiraNode;
