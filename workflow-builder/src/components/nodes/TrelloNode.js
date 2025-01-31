import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { ViewKanban as ViewKanbanIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const TrelloNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <ViewKanbanIcon sx={{ color: '#0079BF' }} />
        <Typography variant="subtitle2">Trello</Typography>
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
        label="API Key"
        type="password"
        value={data.apiKey || ''}
        onChange={handleChange('apiKey')}
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
          value={data.operation || 'createCard'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="createCard">Create Card</MenuItem>
          <MenuItem value="updateCard">Update Card</MenuItem>
          <MenuItem value="deleteCard">Delete Card</MenuItem>
          <MenuItem value="getCard">Get Card</MenuItem>
          <MenuItem value="moveCard">Move Card</MenuItem>
          <MenuItem value="copyCard">Copy Card</MenuItem>
          <MenuItem value="createList">Create List</MenuItem>
          <MenuItem value="updateList">Update List</MenuItem>
          <MenuItem value="archiveList">Archive List</MenuItem>
          <MenuItem value="moveList">Move List</MenuItem>
          <MenuItem value="getList">Get List</MenuItem>
          <MenuItem value="createBoard">Create Board</MenuItem>
          <MenuItem value="updateBoard">Update Board</MenuItem>
          <MenuItem value="deleteBoard">Delete Board</MenuItem>
          <MenuItem value="getBoard">Get Board</MenuItem>
          <MenuItem value="addMember">Add Member</MenuItem>
          <MenuItem value="removeMember">Remove Member</MenuItem>
          <MenuItem value="addLabel">Add Label</MenuItem>
          <MenuItem value="removeLabel">Remove Label</MenuItem>
          <MenuItem value="addComment">Add Comment</MenuItem>
          <MenuItem value="updateComment">Update Comment</MenuItem>
          <MenuItem value="deleteComment">Delete Comment</MenuItem>
          <MenuItem value="addAttachment">Add Attachment</MenuItem>
          <MenuItem value="removeAttachment">Remove Attachment</MenuItem>
          <MenuItem value="addChecklist">Add Checklist</MenuItem>
          <MenuItem value="updateChecklist">Update Checklist</MenuItem>
          <MenuItem value="removeChecklist">Remove Checklist</MenuItem>
          <MenuItem value="addChecklistItem">Add Checklist Item</MenuItem>
          <MenuItem value="updateChecklistItem">Update Checklist Item</MenuItem>
          <MenuItem value="removeChecklistItem">Remove Checklist Item</MenuItem>
          <MenuItem value="addDueDate">Add Due Date</MenuItem>
          <MenuItem value="updateDueDate">Update Due Date</MenuItem>
          <MenuItem value="removeDueDate">Remove Due Date</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Board ID"
        value={data.boardId || ''}
        onChange={handleChange('boardId')}
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
        label="Card ID"
        value={data.cardId || ''}
        onChange={handleChange('cardId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Name"
        value={data.name || ''}
        onChange={handleChange('name')}
        placeholder="Name for card/list/board"
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
        label="Position"
        value={data.position || ''}
        onChange={handleChange('position')}
        placeholder="Position (top, bottom, or number)"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Labels"
        value={data.labels || ''}
        onChange={handleChange('labels')}
        placeholder="Comma-separated label IDs"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Members"
        value={data.members || ''}
        onChange={handleChange('members')}
        placeholder="Comma-separated member IDs"
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
            checked={data.closed || false}
            onChange={handleSwitchChange('closed')}
          />
        }
        label="Archived/Closed"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.subscribed || false}
            onChange={handleSwitchChange('subscribed')}
          />
        }
        label="Subscribed"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default TrelloNode;
