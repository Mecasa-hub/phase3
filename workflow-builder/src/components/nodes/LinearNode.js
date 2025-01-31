import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const LinearNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Linear</Typography>

      <TextField
        fullWidth
        label="API Key"
        type="password"
        value={data.apiKey || ''}
        onChange={handleChange('apiKey')}
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
          <MenuItem value="listIssues">List Issues</MenuItem>
          <MenuItem value="createComment">Create Comment</MenuItem>
          <MenuItem value="updateComment">Update Comment</MenuItem>
          <MenuItem value="deleteComment">Delete Comment</MenuItem>
          <MenuItem value="getComment">Get Comment</MenuItem>
          <MenuItem value="listComments">List Comments</MenuItem>
          <MenuItem value="createProject">Create Project</MenuItem>
          <MenuItem value="updateProject">Update Project</MenuItem>
          <MenuItem value="deleteProject">Delete Project</MenuItem>
          <MenuItem value="getProject">Get Project</MenuItem>
          <MenuItem value="listProjects">List Projects</MenuItem>
          <MenuItem value="createTeam">Create Team</MenuItem>
          <MenuItem value="updateTeam">Update Team</MenuItem>
          <MenuItem value="deleteTeam">Delete Team</MenuItem>
          <MenuItem value="getTeam">Get Team</MenuItem>
          <MenuItem value="listTeams">List Teams</MenuItem>
          <MenuItem value="createCycle">Create Cycle</MenuItem>
          <MenuItem value="updateCycle">Update Cycle</MenuItem>
          <MenuItem value="deleteCycle">Delete Cycle</MenuItem>
          <MenuItem value="getCycle">Get Cycle</MenuItem>
          <MenuItem value="listCycles">List Cycles</MenuItem>
          <MenuItem value="createLabel">Create Label</MenuItem>
          <MenuItem value="updateLabel">Update Label</MenuItem>
          <MenuItem value="deleteLabel">Delete Label</MenuItem>
          <MenuItem value="getLabel">Get Label</MenuItem>
          <MenuItem value="listLabels">List Labels</MenuItem>
          <MenuItem value="assignIssue">Assign Issue</MenuItem>
          <MenuItem value="unassignIssue">Unassign Issue</MenuItem>
          <MenuItem value="addLabel">Add Label to Issue</MenuItem>
          <MenuItem value="removeLabel">Remove Label from Issue</MenuItem>
          <MenuItem value="moveIssue">Move Issue</MenuItem>
          <MenuItem value="subscribeToIssue">Subscribe to Issue</MenuItem>
          <MenuItem value="unsubscribeFromIssue">Unsubscribe from Issue</MenuItem>
        </Select>
      </FormControl>

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
        label="Description"
        multiline
        rows={4}
        value={data.description || ''}
        onChange={handleChange('description')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Team ID"
        value={data.teamId || ''}
        onChange={handleChange('teamId')}
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
        label="Cycle ID"
        value={data.cycleId || ''}
        onChange={handleChange('cycleId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Assignee ID"
        value={data.assigneeId || ''}
        onChange={handleChange('assigneeId')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          value={data.priority || 0}
          onChange={handleChange('priority')}
          label="Priority"
        >
          <MenuItem value={0}>No Priority</MenuItem>
          <MenuItem value={1}>Urgent</MenuItem>
          <MenuItem value={2}>High</MenuItem>
          <MenuItem value={3}>Medium</MenuItem>
          <MenuItem value={4}>Low</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>State</InputLabel>
        <Select
          value={data.state || 'backlog'}
          onChange={handleChange('state')}
          label="State"
        >
          <MenuItem value="backlog">Backlog</MenuItem>
          <MenuItem value="triage">Triage</MenuItem>
          <MenuItem value="todo">Todo</MenuItem>
          <MenuItem value="inProgress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
          <MenuItem value="canceled">Canceled</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Label IDs"
        value={data.labelIds || ''}
        onChange={handleChange('labelIds')}
        placeholder="Comma-separated label IDs"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Comment"
        multiline
        rows={4}
        value={data.comment || ''}
        onChange={handleChange('comment')}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.isBlocked || false}
            onChange={handleSwitchChange('isBlocked')}
          />
        }
        label="Blocked"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.isPrivate || false}
            onChange={handleSwitchChange('isPrivate')}
          />
        }
        label="Private"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default LinearNode;
