import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const MauticNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Mautic</Typography>

      <TextField
        fullWidth
        label="Base URL"
        value={data.baseUrl || ''}
        onChange={handleChange('baseUrl')}
        placeholder="Your Mautic instance URL"
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
          value={data.operation || 'createContact'}
          onChange={handleChange('operation')}
          label="Operation"
        >
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
          <MenuItem value="createCampaign">Create Campaign</MenuItem>
          <MenuItem value="updateCampaign">Update Campaign</MenuItem>
          <MenuItem value="deleteCampaign">Delete Campaign</MenuItem>
          <MenuItem value="getCampaign">Get Campaign</MenuItem>
          <MenuItem value="listCampaigns">List Campaigns</MenuItem>
          <MenuItem value="addContactToCampaign">Add Contact to Campaign</MenuItem>
          <MenuItem value="removeContactFromCampaign">Remove Contact from Campaign</MenuItem>
          <MenuItem value="createSegment">Create Segment</MenuItem>
          <MenuItem value="updateSegment">Update Segment</MenuItem>
          <MenuItem value="deleteSegment">Delete Segment</MenuItem>
          <MenuItem value="getSegment">Get Segment</MenuItem>
          <MenuItem value="listSegments">List Segments</MenuItem>
          <MenuItem value="addContactToSegment">Add Contact to Segment</MenuItem>
          <MenuItem value="removeContactFromSegment">Remove Contact from Segment</MenuItem>
          <MenuItem value="createEmail">Create Email</MenuItem>
          <MenuItem value="sendEmail">Send Email</MenuItem>
          <MenuItem value="createForm">Create Form</MenuItem>
          <MenuItem value="submitForm">Submit Form</MenuItem>
          <MenuItem value="getFormSubmissions">Get Form Submissions</MenuItem>
          <MenuItem value="createAsset">Create Asset</MenuItem>
          <MenuItem value="getAsset">Get Asset</MenuItem>
          <MenuItem value="listAssets">List Assets</MenuItem>
          <MenuItem value="trackEvent">Track Event</MenuItem>
          <MenuItem value="getContactPoints">Get Contact Points</MenuItem>
          <MenuItem value="addContactPoints">Add Contact Points</MenuItem>
          <MenuItem value="subtractContactPoints">Subtract Contact Points</MenuItem>
        </Select>
      </FormControl>

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
        label="Company Data"
        multiline
        rows={4}
        value={data.companyData || ''}
        onChange={handleChange('companyData')}
        placeholder="Company data in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Campaign Data"
        multiline
        rows={4}
        value={data.campaignData || ''}
        onChange={handleChange('campaignData')}
        placeholder="Campaign data in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Email Data"
        multiline
        rows={4}
        value={data.emailData || ''}
        onChange={handleChange('emailData')}
        placeholder="Email data in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Form Data"
        multiline
        rows={4}
        value={data.formData || ''}
        onChange={handleChange('formData')}
        placeholder="Form data in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Event Data"
        multiline
        rows={4}
        value={data.eventData || ''}
        onChange={handleChange('eventData')}
        placeholder="Event data in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Points"
        type="number"
        value={data.points || ''}
        onChange={handleChange('points')}
        placeholder="Number of points"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.overwriteWithBlank || false}
            onChange={handleSwitchChange('overwriteWithBlank')}
          />
        }
        label="Overwrite with Blank Values"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default MauticNode;
