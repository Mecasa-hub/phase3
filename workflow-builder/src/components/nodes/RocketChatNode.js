import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const RocketChatNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>RocketChat</Typography>

      <TextField
        fullWidth
        label="Server URL"
        value={data.serverUrl || ''}
        onChange={handleChange('serverUrl')}
        placeholder="https://chat.example.com"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="User ID"
        value={data.userId || ''}
        onChange={handleChange('userId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Auth Token"
        type="password"
        value={data.authToken || ''}
        onChange={handleChange('authToken')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'sendMessage'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="sendMessage">Send Message</MenuItem>
          <MenuItem value="createChannel">Create Channel</MenuItem>
          <MenuItem value="deleteChannel">Delete Channel</MenuItem>
          <MenuItem value="archiveChannel">Archive Channel</MenuItem>
          <MenuItem value="unarchiveChannel">Unarchive Channel</MenuItem>
          <MenuItem value="createGroup">Create Private Group</MenuItem>
          <MenuItem value="deleteGroup">Delete Private Group</MenuItem>
          <MenuItem value="createDirectMessage">Create Direct Message</MenuItem>
          <MenuItem value="createDiscussion">Create Discussion</MenuItem>
          <MenuItem value="getChannelInfo">Get Channel Info</MenuItem>
          <MenuItem value="getGroupInfo">Get Group Info</MenuItem>
          <MenuItem value="getChannelMembers">Get Channel Members</MenuItem>
          <MenuItem value="getGroupMembers">Get Group Members</MenuItem>
          <MenuItem value="addUserToChannel">Add User to Channel</MenuItem>
          <MenuItem value="removeUserFromChannel">Remove User from Channel</MenuItem>
          <MenuItem value="addUserToGroup">Add User to Group</MenuItem>
          <MenuItem value="removeUserFromGroup">Remove User from Group</MenuItem>
          <MenuItem value="setChannelTopic">Set Channel Topic</MenuItem>
          <MenuItem value="setGroupTopic">Set Group Topic</MenuItem>
          <MenuItem value="setChannelAnnouncement">Set Channel Announcement</MenuItem>
          <MenuItem value="setGroupAnnouncement">Set Group Announcement</MenuItem>
          <MenuItem value="setChannelDescription">Set Channel Description</MenuItem>
          <MenuItem value="setGroupDescription">Set Group Description</MenuItem>
          <MenuItem value="pinMessage">Pin Message</MenuItem>
          <MenuItem value="unpinMessage">Unpin Message</MenuItem>
          <MenuItem value="starMessage">Star Message</MenuItem>
          <MenuItem value="unstarMessage">Unstar Message</MenuItem>
          <MenuItem value="reactToMessage">React to Message</MenuItem>
          <MenuItem value="removeReaction">Remove Reaction</MenuItem>
          <MenuItem value="deleteMessage">Delete Message</MenuItem>
          <MenuItem value="uploadFile">Upload File</MenuItem>
          <MenuItem value="searchMessages">Search Messages</MenuItem>
          <MenuItem value="getOnlineUsers">Get Online Users</MenuItem>
          <MenuItem value="getUserInfo">Get User Info</MenuItem>
          <MenuItem value="getUserPresence">Get User Presence</MenuItem>
          <MenuItem value="setUserStatus">Set User Status</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Channel/Room Name"
        value={data.channelName || ''}
        onChange={handleChange('channelName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Message"
        multiline
        rows={4}
        value={data.message || ''}
        onChange={handleChange('message')}
        placeholder="Message text with optional markdown"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Thread Message ID"
        value={data.threadMessageId || ''}
        onChange={handleChange('threadMessageId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Message ID"
        value={data.messageId || ''}
        onChange={handleChange('messageId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Reaction"
        value={data.reaction || ''}
        onChange={handleChange('reaction')}
        placeholder="Emoji reaction"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Topic"
        value={data.topic || ''}
        onChange={handleChange('topic')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Announcement"
        value={data.announcement || ''}
        onChange={handleChange('announcement')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Description"
        multiline
        rows={3}
        value={data.description || ''}
        onChange={handleChange('description')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Users"
        value={data.users || ''}
        onChange={handleChange('users')}
        placeholder="Comma-separated usernames"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="File URL"
        value={data.fileUrl || ''}
        onChange={handleChange('fileUrl')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="File Name"
        value={data.fileName || ''}
        onChange={handleChange('fileName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Search Query"
        value={data.searchQuery || ''}
        onChange={handleChange('searchQuery')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={data.status || 'online'}
          onChange={handleChange('status')}
          label="Status"
        >
          <MenuItem value="online">Online</MenuItem>
          <MenuItem value="busy">Busy</MenuItem>
          <MenuItem value="away">Away</MenuItem>
          <MenuItem value="offline">Offline</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Switch
            checked={data.readOnly || false}
            onChange={handleSwitchChange('readOnly')}
          />
        }
        label="Read Only"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.broadcast || false}
            onChange={handleSwitchChange('broadcast')}
          />
        }
        label="Broadcast Channel"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default RocketChatNode;
