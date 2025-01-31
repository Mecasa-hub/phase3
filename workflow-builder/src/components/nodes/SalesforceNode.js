import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

const SalesforceNode = ({ data, isConnectable, updateNodeData }) => {
  const handleChange = (field) => (event) => {
    updateNodeData({ ...data, [field]: event.target.value });
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Salesforce</Typography>

      <TextField
        fullWidth
        label="Instance URL"
        value={data.instanceUrl || ''}
        onChange={handleChange('instanceUrl')}
        placeholder="https://yourinstance.salesforce.com"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Client ID"
        value={data.clientId || ''}
        onChange={handleChange('clientId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Client Secret"
        type="password"
        value={data.clientSecret || ''}
        onChange={handleChange('clientSecret')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Username"
        value={data.username || ''}
        onChange={handleChange('username')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        value={data.password || ''}
        onChange={handleChange('password')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'query'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="query">SOQL Query</MenuItem>
          <MenuItem value="create">Create Record</MenuItem>
          <MenuItem value="update">Update Record</MenuItem>
          <MenuItem value="upsert">Upsert Record</MenuItem>
          <MenuItem value="delete">Delete Record</MenuItem>
          <MenuItem value="retrieve">Retrieve Record</MenuItem>
          <MenuItem value="describe">Describe Object</MenuItem>
          <MenuItem value="describeGlobal">Describe Global</MenuItem>
          <MenuItem value="createBulk">Create Bulk Job</MenuItem>
          <MenuItem value="updateBulk">Update Bulk Job</MenuItem>
          <MenuItem value="deleteBulk">Delete Bulk Job</MenuItem>
          <MenuItem value="queryBulk">Query Bulk Job</MenuItem>
          <MenuItem value="createChatter">Create Chatter Post</MenuItem>
          <MenuItem value="updateChatter">Update Chatter Post</MenuItem>
          <MenuItem value="deleteChatter">Delete Chatter Post</MenuItem>
          <MenuItem value="createAttachment">Create Attachment</MenuItem>
          <MenuItem value="deleteAttachment">Delete Attachment</MenuItem>
          <MenuItem value="createNote">Create Note</MenuItem>
          <MenuItem value="updateNote">Update Note</MenuItem>
          <MenuItem value="deleteNote">Delete Note</MenuItem>
          <MenuItem value="createTask">Create Task</MenuItem>
          <MenuItem value="updateTask">Update Task</MenuItem>
          <MenuItem value="deleteTask">Delete Task</MenuItem>
          <MenuItem value="createEvent">Create Event</MenuItem>
          <MenuItem value="updateEvent">Update Event</MenuItem>
          <MenuItem value="deleteEvent">Delete Event</MenuItem>
          <MenuItem value="createCase">Create Case</MenuItem>
          <MenuItem value="updateCase">Update Case</MenuItem>
          <MenuItem value="deleteCase">Delete Case</MenuItem>
          <MenuItem value="createLead">Create Lead</MenuItem>
          <MenuItem value="updateLead">Update Lead</MenuItem>
          <MenuItem value="deleteLead">Delete Lead</MenuItem>
          <MenuItem value="convertLead">Convert Lead</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Object Type"
        value={data.objectType || ''}
        onChange={handleChange('objectType')}
        placeholder="Account, Contact, Lead, etc."
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Record ID"
        value={data.recordId || ''}
        onChange={handleChange('recordId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="SOQL Query"
        multiline
        rows={4}
        value={data.query || ''}
        onChange={handleChange('query')}
        placeholder="SELECT Id, Name FROM Account"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Record Data"
        multiline
        rows={4}
        value={data.recordData || ''}
        onChange={handleChange('recordData')}
        placeholder="Record data in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="External ID Field"
        value={data.externalIdField || ''}
        onChange={handleChange('externalIdField')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="External ID Value"
        value={data.externalIdValue || ''}
        onChange={handleChange('externalIdValue')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Bulk Data"
        multiline
        rows={4}
        value={data.bulkData || ''}
        onChange={handleChange('bulkData')}
        placeholder="Bulk operation data in CSV format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Chatter Message"
        multiline
        rows={3}
        value={data.chatterMessage || ''}
        onChange={handleChange('chatterMessage')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="File Content"
        multiline
        rows={3}
        value={data.fileContent || ''}
        onChange={handleChange('fileContent')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="File Name"
        value={data.fileName || ''}
        onChange={handleChange('fileName')}
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default SalesforceNode;
