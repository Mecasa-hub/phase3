import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const ZendeskNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Zendesk</Typography>

      <TextField
        fullWidth
        label="Subdomain"
        value={data.subdomain || ''}
        onChange={handleChange('subdomain')}
        placeholder="your-subdomain"
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
        label="API Token"
        type="password"
        value={data.apiToken || ''}
        onChange={handleChange('apiToken')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'createTicket'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="createTicket">Create Ticket</MenuItem>
          <MenuItem value="updateTicket">Update Ticket</MenuItem>
          <MenuItem value="deleteTicket">Delete Ticket</MenuItem>
          <MenuItem value="getTicket">Get Ticket</MenuItem>
          <MenuItem value="searchTickets">Search Tickets</MenuItem>
          <MenuItem value="listTickets">List Tickets</MenuItem>
          <MenuItem value="createUser">Create User</MenuItem>
          <MenuItem value="updateUser">Update User</MenuItem>
          <MenuItem value="deleteUser">Delete User</MenuItem>
          <MenuItem value="getUser">Get User</MenuItem>
          <MenuItem value="searchUsers">Search Users</MenuItem>
          <MenuItem value="listUsers">List Users</MenuItem>
          <MenuItem value="createGroup">Create Group</MenuItem>
          <MenuItem value="updateGroup">Update Group</MenuItem>
          <MenuItem value="deleteGroup">Delete Group</MenuItem>
          <MenuItem value="getGroup">Get Group</MenuItem>
          <MenuItem value="listGroups">List Groups</MenuItem>
          <MenuItem value="createOrganization">Create Organization</MenuItem>
          <MenuItem value="updateOrganization">Update Organization</MenuItem>
          <MenuItem value="deleteOrganization">Delete Organization</MenuItem>
          <MenuItem value="getOrganization">Get Organization</MenuItem>
          <MenuItem value="listOrganizations">List Organizations</MenuItem>
          <MenuItem value="addComment">Add Comment</MenuItem>
          <MenuItem value="getComments">Get Comments</MenuItem>
          <MenuItem value="uploadAttachment">Upload Attachment</MenuItem>
          <MenuItem value="deleteAttachment">Delete Attachment</MenuItem>
          <MenuItem value="getAttachments">Get Attachments</MenuItem>
          <MenuItem value="createMacro">Create Macro</MenuItem>
          <MenuItem value="updateMacro">Update Macro</MenuItem>
          <MenuItem value="deleteMacro">Delete Macro</MenuItem>
          <MenuItem value="getMacro">Get Macro</MenuItem>
          <MenuItem value="listMacros">List Macros</MenuItem>
          <MenuItem value="createTrigger">Create Trigger</MenuItem>
          <MenuItem value="updateTrigger">Update Trigger</MenuItem>
          <MenuItem value="deleteTrigger">Delete Trigger</MenuItem>
          <MenuItem value="getTrigger">Get Trigger</MenuItem>
          <MenuItem value="listTriggers">List Triggers</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Ticket ID"
        value={data.ticketId || ''}
        onChange={handleChange('ticketId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Subject"
        value={data.subject || ''}
        onChange={handleChange('subject')}
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

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          value={data.priority || 'normal'}
          onChange={handleChange('priority')}
          label="Priority"
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="normal">Normal</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="urgent">Urgent</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Type</InputLabel>
        <Select
          value={data.type || 'problem'}
          onChange={handleChange('type')}
          label="Type"
        >
          <MenuItem value="problem">Problem</MenuItem>
          <MenuItem value="incident">Incident</MenuItem>
          <MenuItem value="question">Question</MenuItem>
          <MenuItem value="task">Task</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={data.status || 'new'}
          onChange={handleChange('status')}
          label="Status"
        >
          <MenuItem value="new">New</MenuItem>
          <MenuItem value="open">Open</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="hold">Hold</MenuItem>
          <MenuItem value="solved">Solved</MenuItem>
          <MenuItem value="closed">Closed</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Requester ID"
        value={data.requesterId || ''}
        onChange={handleChange('requesterId')}
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
        label="Group ID"
        value={data.groupId || ''}
        onChange={handleChange('groupId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Organization ID"
        value={data.organizationId || ''}
        onChange={handleChange('organizationId')}
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
            checked={data.isPublic || true}
            onChange={handleSwitchChange('isPublic')}
          />
        }
        label="Public Comment"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default ZendeskNode;
