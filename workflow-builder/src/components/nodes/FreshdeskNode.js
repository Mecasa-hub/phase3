import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const FreshdeskNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Freshdesk</Typography>

      <TextField
        fullWidth
        label="Domain"
        value={data.domain || ''}
        onChange={handleChange('domain')}
        placeholder="your-domain.freshdesk.com"
        sx={{ mb: 2 }}
      />

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
          value={data.operation || 'createTicket'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="createTicket">Create Ticket</MenuItem>
          <MenuItem value="updateTicket">Update Ticket</MenuItem>
          <MenuItem value="deleteTicket">Delete Ticket</MenuItem>
          <MenuItem value="getTicket">Get Ticket</MenuItem>
          <MenuItem value="listTickets">List Tickets</MenuItem>
          <MenuItem value="createContact">Create Contact</MenuItem>
          <MenuItem value="updateContact">Update Contact</MenuItem>
          <MenuItem value="deleteContact">Delete Contact</MenuItem>
          <MenuItem value="getContact">Get Contact</MenuItem>
          <MenuItem value="listContacts">List Contacts</MenuItem>
          <MenuItem value="createCompany">Create Company</MenuItem>
          <MenuItem value="updateCompany">Update Company</MenuItem>
          <MenuItem value="deleteCompany">Delete Company</MenuItem>
          <MenuItem value="getCompany">Get Company</MenuItem>
          <MenuItem value="listCompanies">List Companies</MenuItem>
          <MenuItem value="createGroup">Create Group</MenuItem>
          <MenuItem value="updateGroup">Update Group</MenuItem>
          <MenuItem value="deleteGroup">Delete Group</MenuItem>
          <MenuItem value="getGroup">Get Group</MenuItem>
          <MenuItem value="listGroups">List Groups</MenuItem>
          <MenuItem value="createAgent">Create Agent</MenuItem>
          <MenuItem value="updateAgent">Update Agent</MenuItem>
          <MenuItem value="deleteAgent">Delete Agent</MenuItem>
          <MenuItem value="getAgent">Get Agent</MenuItem>
          <MenuItem value="listAgents">List Agents</MenuItem>
          <MenuItem value="createNote">Create Note</MenuItem>
          <MenuItem value="updateNote">Update Note</MenuItem>
          <MenuItem value="deleteNote">Delete Note</MenuItem>
          <MenuItem value="getNote">Get Note</MenuItem>
          <MenuItem value="listNotes">List Notes</MenuItem>
          <MenuItem value="createTimeEntry">Create Time Entry</MenuItem>
          <MenuItem value="updateTimeEntry">Update Time Entry</MenuItem>
          <MenuItem value="deleteTimeEntry">Delete Time Entry</MenuItem>
          <MenuItem value="getTimeEntry">Get Time Entry</MenuItem>
          <MenuItem value="listTimeEntries">List Time Entries</MenuItem>
          <MenuItem value="createSolution">Create Solution Article</MenuItem>
          <MenuItem value="updateSolution">Update Solution Article</MenuItem>
          <MenuItem value="deleteSolution">Delete Solution Article</MenuItem>
          <MenuItem value="getSolution">Get Solution Article</MenuItem>
          <MenuItem value="listSolutions">List Solution Articles</MenuItem>
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
          value={data.priority || 2}
          onChange={handleChange('priority')}
          label="Priority"
        >
          <MenuItem value={1}>Low</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>High</MenuItem>
          <MenuItem value={4}>Urgent</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={data.status || 2}
          onChange={handleChange('status')}
          label="Status"
        >
          <MenuItem value={2}>Open</MenuItem>
          <MenuItem value={3}>Pending</MenuItem>
          <MenuItem value={4}>Resolved</MenuItem>
          <MenuItem value={5}>Closed</MenuItem>
        </Select>
      </FormControl>

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
        label="Company Name"
        value={data.companyName || ''}
        onChange={handleChange('companyName')}
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
        label="Tags"
        value={data.tags || ''}
        onChange={handleChange('tags')}
        placeholder="Comma-separated tags"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.isSpam || false}
            onChange={handleSwitchChange('isSpam')}
          />
        }
        label="Mark as Spam"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.includeStats || false}
            onChange={handleSwitchChange('includeStats')}
          />
        }
        label="Include Statistics"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default FreshdeskNode;
