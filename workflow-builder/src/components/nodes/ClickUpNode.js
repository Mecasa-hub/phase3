import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { Task as TaskIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const ClickUpNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <TaskIcon sx={{ color: '#7B68EE' }} />
        <Typography variant="subtitle2">ClickUp</Typography>
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
          value={data.operation || 'createTask'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="createTask">Create Task</MenuItem>
          <MenuItem value="updateTask">Update Task</MenuItem>
          <MenuItem value="deleteTask">Delete Task</MenuItem>
          <MenuItem value="getTask">Get Task</MenuItem>
          <MenuItem value="searchTasks">Search Tasks</MenuItem>
          <MenuItem value="createSubtask">Create Subtask</MenuItem>
          <MenuItem value="createList">Create List</MenuItem>
          <MenuItem value="updateList">Update List</MenuItem>
          <MenuItem value="deleteList">Delete List</MenuItem>
          <MenuItem value="getList">Get List</MenuItem>
          <MenuItem value="createFolder">Create Folder</MenuItem>
          <MenuItem value="updateFolder">Update Folder</MenuItem>
          <MenuItem value="deleteFolder">Delete Folder</MenuItem>
          <MenuItem value="getFolder">Get Folder</MenuItem>
          <MenuItem value="createSpace">Create Space</MenuItem>
          <MenuItem value="updateSpace">Update Space</MenuItem>
          <MenuItem value="deleteSpace">Delete Space</MenuItem>
          <MenuItem value="getSpace">Get Space</MenuItem>
          <MenuItem value="createTag">Create Tag</MenuItem>
          <MenuItem value="updateTag">Update Tag</MenuItem>
          <MenuItem value="deleteTag">Delete Tag</MenuItem>
          <MenuItem value="getTag">Get Tag</MenuItem>
          <MenuItem value="addComment">Add Comment</MenuItem>
          <MenuItem value="updateComment">Update Comment</MenuItem>
          <MenuItem value="deleteComment">Delete Comment</MenuItem>
          <MenuItem value="addAttachment">Add Attachment</MenuItem>
          <MenuItem value="createCustomField">Create Custom Field</MenuItem>
          <MenuItem value="updateCustomField">Update Custom Field</MenuItem>
          <MenuItem value="deleteCustomField">Delete Custom Field</MenuItem>
          <MenuItem value="getTimeEntries">Get Time Entries</MenuItem>
          <MenuItem value="startTimer">Start Timer</MenuItem>
          <MenuItem value="stopTimer">Stop Timer</MenuItem>
          <MenuItem value="addDependency">Add Dependency</MenuItem>
          <MenuItem value="removeDependency">Remove Dependency</MenuItem>
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
        label="Space ID"
        value={data.spaceId || ''}
        onChange={handleChange('spaceId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Folder ID"
        value={data.folderId || ''}
        onChange={handleChange('folderId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="List ID"
        value={data.listId || ''}
        onChange={handleChange('listId')}
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
        label="Name"
        value={data.name || ''}
        onChange={handleChange('name')}
        placeholder="Name for task/list/folder/space"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Description"
        multiline
        rows={4}
        value={data.description || ''}
        onChange={handleChange('description')}
        placeholder="Description"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Assignees"
        value={data.assignees || ''}
        onChange={handleChange('assignees')}
        placeholder="Comma-separated assignee IDs"
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

      <TextField
        fullWidth
        label="Status"
        value={data.status || ''}
        onChange={handleChange('status')}
        placeholder="Task status"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Priority"
        value={data.priority || ''}
        onChange={handleChange('priority')}
        placeholder="Task priority"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Due Date"
        type="datetime-local"
        value={data.dueDate || ''}
        onChange={handleChange('dueDate')}
        InputLabelProps={{ shrink: true }}
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
            checked={data.notify || false}
            onChange={handleSwitchChange('notify')}
          />
        }
        label="Send Notifications"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default ClickUpNode;
