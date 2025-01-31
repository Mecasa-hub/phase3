import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const MondayNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Monday.com</Typography>

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
          value={data.operation || 'createItem'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="createItem">Create Item</MenuItem>
          <MenuItem value="updateItem">Update Item</MenuItem>
          <MenuItem value="deleteItem">Delete Item</MenuItem>
          <MenuItem value="getItem">Get Item</MenuItem>
          <MenuItem value="listItems">List Items</MenuItem>
          <MenuItem value="createBoard">Create Board</MenuItem>
          <MenuItem value="updateBoard">Update Board</MenuItem>
          <MenuItem value="deleteBoard">Delete Board</MenuItem>
          <MenuItem value="getBoard">Get Board</MenuItem>
          <MenuItem value="listBoards">List Boards</MenuItem>
          <MenuItem value="createGroup">Create Group</MenuItem>
          <MenuItem value="updateGroup">Update Group</MenuItem>
          <MenuItem value="deleteGroup">Delete Group</MenuItem>
          <MenuItem value="getGroup">Get Group</MenuItem>
          <MenuItem value="listGroups">List Groups</MenuItem>
          <MenuItem value="createColumn">Create Column</MenuItem>
          <MenuItem value="updateColumn">Update Column</MenuItem>
          <MenuItem value="deleteColumn">Delete Column</MenuItem>
          <MenuItem value="getColumn">Get Column</MenuItem>
          <MenuItem value="listColumns">List Columns</MenuItem>
          <MenuItem value="createUpdate">Create Update</MenuItem>
          <MenuItem value="deleteUpdate">Delete Update</MenuItem>
          <MenuItem value="getUpdate">Get Update</MenuItem>
          <MenuItem value="listUpdates">List Updates</MenuItem>
          <MenuItem value="createSubitem">Create Subitem</MenuItem>
          <MenuItem value="updateSubitem">Update Subitem</MenuItem>
          <MenuItem value="deleteSubitem">Delete Subitem</MenuItem>
          <MenuItem value="getSubitem">Get Subitem</MenuItem>
          <MenuItem value="listSubitems">List Subitems</MenuItem>
          <MenuItem value="createTag">Create Tag</MenuItem>
          <MenuItem value="deleteTag">Delete Tag</MenuItem>
          <MenuItem value="getTag">Get Tag</MenuItem>
          <MenuItem value="listTags">List Tags</MenuItem>
          <MenuItem value="addSubscriber">Add Subscriber</MenuItem>
          <MenuItem value="removeSubscriber">Remove Subscriber</MenuItem>
          <MenuItem value="listSubscribers">List Subscribers</MenuItem>
          <MenuItem value="moveItem">Move Item</MenuItem>
          <MenuItem value="archiveItem">Archive Item</MenuItem>
          <MenuItem value="duplicateItem">Duplicate Item</MenuItem>
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
        label="Item ID"
        value={data.itemId || ''}
        onChange={handleChange('itemId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Group ID"
        value={data.groupId || ''}
        onChange={handleChange('groupId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Column ID"
        value={data.columnId || ''}
        onChange={handleChange('columnId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Item Name"
        value={data.itemName || ''}
        onChange={handleChange('itemName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Column Values"
        multiline
        rows={4}
        value={data.columnValues || ''}
        onChange={handleChange('columnValues')}
        placeholder="Column values in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Board Name"
        value={data.boardName || ''}
        onChange={handleChange('boardName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Group Name"
        value={data.groupName || ''}
        onChange={handleChange('groupName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Column Title"
        value={data.columnTitle || ''}
        onChange={handleChange('columnTitle')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Column Type</InputLabel>
        <Select
          value={data.columnType || 'text'}
          onChange={handleChange('columnType')}
          label="Column Type"
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="number">Number</MenuItem>
          <MenuItem value="status">Status</MenuItem>
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="dropdown">Dropdown</MenuItem>
          <MenuItem value="people">People</MenuItem>
          <MenuItem value="team">Team</MenuItem>
          <MenuItem value="world_clock">World Clock</MenuItem>
          <MenuItem value="file">File</MenuItem>
          <MenuItem value="link">Link</MenuItem>
          <MenuItem value="color_picker">Color Picker</MenuItem>
          <MenuItem value="long_text">Long Text</MenuItem>
          <MenuItem value="check">Checkbox</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="timeline">Timeline</MenuItem>
          <MenuItem value="tags">Tags</MenuItem>
          <MenuItem value="formula">Formula</MenuItem>
          <MenuItem value="dependency">Dependency</MenuItem>
          <MenuItem value="board_relation">Board Relation</MenuItem>
          <MenuItem value="location">Location</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Update Text"
        multiline
        rows={4}
        value={data.updateText || ''}
        onChange={handleChange('updateText')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="User IDs"
        value={data.userIds || ''}
        onChange={handleChange('userIds')}
        placeholder="Comma-separated user IDs"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.archived || false}
            onChange={handleSwitchChange('archived')}
          />
        }
        label="Archived"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default MondayNode;
