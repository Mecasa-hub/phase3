import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const AsanaNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Asana</Typography>

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
          value={data.operation || 'createTask'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="createTask">Create Task</MenuItem>
          <MenuItem value="updateTask">Update Task</MenuItem>
          <MenuItem value="deleteTask">Delete Task</MenuItem>
          <MenuItem value="getTask">Get Task</MenuItem>
          <MenuItem value="searchTasks">Search Tasks</MenuItem>
          <MenuItem value="createProject">Create Project</MenuItem>
          <MenuItem value="updateProject">Update Project</MenuItem>
          <MenuItem value="deleteProject">Delete Project</MenuItem>
          <MenuItem value="getProject">Get Project</MenuItem>
          <MenuItem value="listProjects">List Projects</MenuItem>
          <MenuItem value="createSection">Create Section</MenuItem>
          <MenuItem value="updateSection">Update Section</MenuItem>
          <MenuItem value="deleteSection">Delete Section</MenuItem>
          <MenuItem value="getSection">Get Section</MenuItem>
          <MenuItem value="listSections">List Sections</MenuItem>
          <MenuItem value="createTag">Create Tag</MenuItem>
          <MenuItem value="updateTag">Update Tag</MenuItem>
          <MenuItem value="deleteTag">Delete Tag</MenuItem>
          <MenuItem value="getTag">Get Tag</MenuItem>
          <MenuItem value="listTags">List Tags</MenuItem>
          <MenuItem value="addTaskToProject">Add Task to Project</MenuItem>
          <MenuItem value="removeTaskFromProject">Remove Task from Project</MenuItem>
          <MenuItem value="addTaskToSection">Add Task to Section</MenuItem>
          <MenuItem value="removeTaskFromSection">Remove Task from Section</MenuItem>
          <MenuItem value="addTaskTag">Add Tag to Task</MenuItem>
          <MenuItem value="removeTaskTag">Remove Tag from Task</MenuItem>
          <MenuItem value="createSubtask">Create Subtask</MenuItem>
          <MenuItem value="addFollowers">Add Followers</MenuItem>
          <MenuItem value="removeFollowers">Remove Followers</MenuItem>
          <MenuItem value="addComment">Add Comment</MenuItem>
          <MenuItem value="getComments">Get Comments</MenuItem>
          <MenuItem value="createAttachment">Create Attachment</MenuItem>
          <MenuItem value="deleteAttachment">Delete Attachment</MenuItem>
          <MenuItem value="getAttachments">Get Attachments</MenuItem>
          <MenuItem value="getWorkspaces">Get Workspaces</MenuItem>
          <MenuItem value="getTeams">Get Teams</MenuItem>
          <MenuItem value="getUserInfo">Get User Info</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Workspace ID"
        value={data.workspaceId || ''}
        onChange={handleChange('workspaceId')}
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
        label="Task ID"
        value={data.taskId || ''}
        onChange={handleChange('taskId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Section ID"
        value={data.sectionId || ''}
        onChange={handleChange('sectionId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Tag ID"
        value={data.tagId || ''}
        onChange={handleChange('tagId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Name"
        value={data.name || ''}
        onChange={handleChange('name')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Notes"
        multiline
        rows={4}
        value={data.notes || ''}
        onChange={handleChange('notes')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Due Date"
        type="date"
        value={data.dueDate || ''}
        onChange={handleChange('dueDate')}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Assignee"
        value={data.assignee || ''}
        onChange={handleChange('assignee')}
        placeholder="Email or User ID"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Followers"
        value={data.followers || ''}
        onChange={handleChange('followers')}
        placeholder="Comma-separated emails or user IDs"
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

      <FormControlLabel
        control={
          <Switch
            checked={data.isCompleted || false}
            onChange={handleSwitchChange('isCompleted')}
          />
        }
        label="Mark as Complete"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.isPublic || true}
            onChange={handleSwitchChange('isPublic')}
          />
        }
        label="Public Access"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default AsanaNode;
