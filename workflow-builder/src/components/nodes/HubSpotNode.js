import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const HubSpotNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>HubSpot</Typography>

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
          value={data.operation || 'createContact'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="createContact">Create Contact</MenuItem>
          <MenuItem value="updateContact">Update Contact</MenuItem>
          <MenuItem value="deleteContact">Delete Contact</MenuItem>
          <MenuItem value="getContact">Get Contact</MenuItem>
          <MenuItem value="searchContacts">Search Contacts</MenuItem>
          <MenuItem value="createCompany">Create Company</MenuItem>
          <MenuItem value="updateCompany">Update Company</MenuItem>
          <MenuItem value="deleteCompany">Delete Company</MenuItem>
          <MenuItem value="getCompany">Get Company</MenuItem>
          <MenuItem value="searchCompanies">Search Companies</MenuItem>
          <MenuItem value="createDeal">Create Deal</MenuItem>
          <MenuItem value="updateDeal">Update Deal</MenuItem>
          <MenuItem value="deleteDeal">Delete Deal</MenuItem>
          <MenuItem value="getDeal">Get Deal</MenuItem>
          <MenuItem value="searchDeals">Search Deals</MenuItem>
          <MenuItem value="createTicket">Create Ticket</MenuItem>
          <MenuItem value="updateTicket">Update Ticket</MenuItem>
          <MenuItem value="deleteTicket">Delete Ticket</MenuItem>
          <MenuItem value="getTicket">Get Ticket</MenuItem>
          <MenuItem value="searchTickets">Search Tickets</MenuItem>
          <MenuItem value="createEngagement">Create Engagement</MenuItem>
          <MenuItem value="updateEngagement">Update Engagement</MenuItem>
          <MenuItem value="deleteEngagement">Delete Engagement</MenuItem>
          <MenuItem value="getEngagement">Get Engagement</MenuItem>
          <MenuItem value="createNote">Create Note</MenuItem>
          <MenuItem value="updateNote">Update Note</MenuItem>
          <MenuItem value="deleteNote">Delete Note</MenuItem>
          <MenuItem value="getNote">Get Note</MenuItem>
          <MenuItem value="createTask">Create Task</MenuItem>
          <MenuItem value="updateTask">Update Task</MenuItem>
          <MenuItem value="deleteTask">Delete Task</MenuItem>
          <MenuItem value="getTask">Get Task</MenuItem>
          <MenuItem value="createMeeting">Create Meeting</MenuItem>
          <MenuItem value="updateMeeting">Update Meeting</MenuItem>
          <MenuItem value="deleteMeeting">Delete Meeting</MenuItem>
          <MenuItem value="getMeeting">Get Meeting</MenuItem>
          <MenuItem value="createEmail">Create Email</MenuItem>
          <MenuItem value="updateEmail">Update Email</MenuItem>
          <MenuItem value="deleteEmail">Delete Email</MenuItem>
          <MenuItem value="getEmail">Get Email</MenuItem>
          <MenuItem value="createForm">Create Form</MenuItem>
          <MenuItem value="updateForm">Update Form</MenuItem>
          <MenuItem value="deleteForm">Delete Form</MenuItem>
          <MenuItem value="getForm">Get Form</MenuItem>
          <MenuItem value="getFormSubmissions">Get Form Submissions</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Record ID"
        value={data.recordId || ''}
        onChange={handleChange('recordId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Properties"
        multiline
        rows={4}
        value={data.properties || ''}
        onChange={handleChange('properties')}
        placeholder="Properties in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Associations"
        multiline
        rows={4}
        value={data.associations || ''}
        onChange={handleChange('associations')}
        placeholder="Associations in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Search Query"
        value={data.searchQuery || ''}
        onChange={handleChange('searchQuery')}
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
        label="Subject"
        value={data.subject || ''}
        onChange={handleChange('subject')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Content"
        multiline
        rows={4}
        value={data.content || ''}
        onChange={handleChange('content')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Deal Stage"
        value={data.dealStage || ''}
        onChange={handleChange('dealStage')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Deal Amount"
        type="number"
        value={data.dealAmount || ''}
        onChange={handleChange('dealAmount')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Pipeline"
        value={data.pipeline || ''}
        onChange={handleChange('pipeline')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Owner ID"
        value={data.ownerId || ''}
        onChange={handleChange('ownerId')}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.createAssociations || false}
            onChange={handleSwitchChange('createAssociations')}
          />
        }
        label="Create Associations"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.doNotCreate || false}
            onChange={handleSwitchChange('doNotCreate')}
          />
        }
        label="Do Not Create if Not Exists"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default HubSpotNode;
