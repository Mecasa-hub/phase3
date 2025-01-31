import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

const GoogleContactsNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Google Contacts</Typography>

      <TextField
        fullWidth
        label="OAuth Token"
        type="password"
        value={data.oauthToken || ''}
        onChange={handleChange('oauthToken')}
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
          <MenuItem value="getContact">Get Contact</MenuItem>
          <MenuItem value="updateContact">Update Contact</MenuItem>
          <MenuItem value="deleteContact">Delete Contact</MenuItem>
          <MenuItem value="listContacts">List Contacts</MenuItem>
          <MenuItem value="searchContacts">Search Contacts</MenuItem>
          <MenuItem value="batchCreateContacts">Batch Create Contacts</MenuItem>
          <MenuItem value="batchUpdateContacts">Batch Update Contacts</MenuItem>
          <MenuItem value="batchDeleteContacts">Batch Delete Contacts</MenuItem>
          <MenuItem value="createContactGroup">Create Contact Group</MenuItem>
          <MenuItem value="getContactGroup">Get Contact Group</MenuItem>
          <MenuItem value="updateContactGroup">Update Contact Group</MenuItem>
          <MenuItem value="deleteContactGroup">Delete Contact Group</MenuItem>
          <MenuItem value="listContactGroups">List Contact Groups</MenuItem>
          <MenuItem value="addContactToGroup">Add Contact to Group</MenuItem>
          <MenuItem value="removeContactFromGroup">Remove Contact from Group</MenuItem>
          <MenuItem value="getContactPhoto">Get Contact Photo</MenuItem>
          <MenuItem value="updateContactPhoto">Update Contact Photo</MenuItem>
          <MenuItem value="deleteContactPhoto">Delete Contact Photo</MenuItem>
          <MenuItem value="getOtherContacts">Get Other Contacts</MenuItem>
          <MenuItem value="copyOtherContactToMyContacts">Copy Other Contact to My Contacts</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Resource Name"
        value={data.resourceName || ''}
        onChange={handleChange('resourceName')}
        placeholder="people/contact123"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Contact Data"
        multiline
        rows={4}
        value={data.contactData || ''}
        onChange={handleChange('contactData')}
        placeholder="Contact data in JSON format"
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
        label="Group Resource Name"
        value={data.groupResourceName || ''}
        onChange={handleChange('groupResourceName')}
        placeholder="contactGroups/group123"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Query"
        value={data.query || ''}
        onChange={handleChange('query')}
        placeholder="Search query"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Read Mask"
        value={data.readMask || ''}
        onChange={handleChange('readMask')}
        placeholder="names,emailAddresses,phoneNumbers"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Update Mask"
        value={data.updateMask || ''}
        onChange={handleChange('updateMask')}
        placeholder="names,emailAddresses,phoneNumbers"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Page Size"
        type="number"
        value={data.pageSize || ''}
        onChange={handleChange('pageSize')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Page Token"
        value={data.pageToken || ''}
        onChange={handleChange('pageToken')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Sources"
        value={data.sources || ''}
        onChange={handleChange('sources')}
        placeholder="Comma-separated list of sources"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Photo URL"
        value={data.photoUrl || ''}
        onChange={handleChange('photoUrl')}
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default GoogleContactsNode;
