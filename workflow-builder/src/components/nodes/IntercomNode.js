import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const IntercomNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Intercom</Typography>

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
          value={data.operation || 'createContact'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="createContact">Create Contact</MenuItem>
          <MenuItem value="updateContact">Update Contact</MenuItem>
          <MenuItem value="deleteContact">Delete Contact</MenuItem>
          <MenuItem value="getContact">Get Contact</MenuItem>
          <MenuItem value="listContacts">List Contacts</MenuItem>
          <MenuItem value="searchContacts">Search Contacts</MenuItem>
          <MenuItem value="createConversation">Create Conversation</MenuItem>
          <MenuItem value="getConversation">Get Conversation</MenuItem>
          <MenuItem value="listConversations">List Conversations</MenuItem>
          <MenuItem value="replyToConversation">Reply to Conversation</MenuItem>
          <MenuItem value="closeConversation">Close Conversation</MenuItem>
          <MenuItem value="reopenConversation">Reopen Conversation</MenuItem>
          <MenuItem value="assignConversation">Assign Conversation</MenuItem>
          <MenuItem value="tagConversation">Tag Conversation</MenuItem>
          <MenuItem value="untagConversation">Untag Conversation</MenuItem>
          <MenuItem value="createNote">Create Note</MenuItem>
          <MenuItem value="listNotes">List Notes</MenuItem>
          <MenuItem value="createTag">Create Tag</MenuItem>
          <MenuItem value="deleteTag">Delete Tag</MenuItem>
          <MenuItem value="listTags">List Tags</MenuItem>
          <MenuItem value="createEvent">Create Event</MenuItem>
          <MenuItem value="listEvents">List Events</MenuItem>
          <MenuItem value="createArticle">Create Article</MenuItem>
          <MenuItem value="updateArticle">Update Article</MenuItem>
          <MenuItem value="deleteArticle">Delete Article</MenuItem>
          <MenuItem value="getArticle">Get Article</MenuItem>
          <MenuItem value="listArticles">List Articles</MenuItem>
          <MenuItem value="createCollection">Create Collection</MenuItem>
          <MenuItem value="updateCollection">Update Collection</MenuItem>
          <MenuItem value="deleteCollection">Delete Collection</MenuItem>
          <MenuItem value="getCollection">Get Collection</MenuItem>
          <MenuItem value="listCollections">List Collections</MenuItem>
          <MenuItem value="createTeam">Create Team</MenuItem>
          <MenuItem value="updateTeam">Update Team</MenuItem>
          <MenuItem value="deleteTeam">Delete Team</MenuItem>
          <MenuItem value="getTeam">Get Team</MenuItem>
          <MenuItem value="listTeams">List Teams</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Contact ID"
        value={data.contactId || ''}
        onChange={handleChange('contactId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Email"
        value={data.email || ''}
        onChange={handleChange('email')}
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
        label="Phone"
        value={data.phone || ''}
        onChange={handleChange('phone')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Custom Attributes"
        multiline
        rows={4}
        value={data.customAttributes || ''}
        onChange={handleChange('customAttributes')}
        placeholder="Custom attributes in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Conversation ID"
        value={data.conversationId || ''}
        onChange={handleChange('conversationId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Message"
        multiline
        rows={4}
        value={data.message || ''}
        onChange={handleChange('message')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Assignee ID"
        value={data.assigneeId || ''}
        onChange={handleChange('assigneeId')}
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
        label="Tag Name"
        value={data.tagName || ''}
        onChange={handleChange('tagName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Article Title"
        value={data.articleTitle || ''}
        onChange={handleChange('articleTitle')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Article Content"
        multiline
        rows={4}
        value={data.articleContent || ''}
        onChange={handleChange('articleContent')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Collection Name"
        value={data.collectionName || ''}
        onChange={handleChange('collectionName')}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.markAsRead || false}
            onChange={handleSwitchChange('markAsRead')}
          />
        }
        label="Mark as Read"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.isPublished || false}
            onChange={handleSwitchChange('isPublished')}
          />
        }
        label="Published"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default IntercomNode;
