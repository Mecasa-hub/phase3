import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const SendGridNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <SendIcon sx={{ color: '#1A82E2' }} />
        <Typography variant="subtitle2">SendGrid</Typography>
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

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'sendEmail'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="sendEmail">Send Email</MenuItem>
          <MenuItem value="sendTemplate">Send Template Email</MenuItem>
          <MenuItem value="createContact">Create Contact</MenuItem>
          <MenuItem value="updateContact">Update Contact</MenuItem>
          <MenuItem value="deleteContact">Delete Contact</MenuItem>
          <MenuItem value="getContact">Get Contact</MenuItem>
          <MenuItem value="searchContacts">Search Contacts</MenuItem>
          <MenuItem value="createList">Create List</MenuItem>
          <MenuItem value="updateList">Update List</MenuItem>
          <MenuItem value="deleteList">Delete List</MenuItem>
          <MenuItem value="getList">Get List</MenuItem>
          <MenuItem value="addContactToList">Add Contact to List</MenuItem>
          <MenuItem value="removeContactFromList">Remove Contact from List</MenuItem>
          <MenuItem value="createSegment">Create Segment</MenuItem>
          <MenuItem value="updateSegment">Update Segment</MenuItem>
          <MenuItem value="deleteSegment">Delete Segment</MenuItem>
          <MenuItem value="getSegment">Get Segment</MenuItem>
          <MenuItem value="createCampaign">Create Campaign</MenuItem>
          <MenuItem value="updateCampaign">Update Campaign</MenuItem>
          <MenuItem value="deleteCampaign">Delete Campaign</MenuItem>
          <MenuItem value="getCampaign">Get Campaign</MenuItem>
          <MenuItem value="sendCampaign">Send Campaign</MenuItem>
          <MenuItem value="scheduleCampaign">Schedule Campaign</MenuItem>
          <MenuItem value="unscheduleCampaign">Unschedule Campaign</MenuItem>
          <MenuItem value="createTemplate">Create Template</MenuItem>
          <MenuItem value="updateTemplate">Update Template</MenuItem>
          <MenuItem value="deleteTemplate">Delete Template</MenuItem>
          <MenuItem value="getTemplate">Get Template</MenuItem>
          <MenuItem value="validateTemplate">Validate Template</MenuItem>
          <MenuItem value="getDomains">Get Domains</MenuItem>
          <MenuItem value="validateDomain">Validate Domain</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="From Email"
        value={data.fromEmail || ''}
        onChange={handleChange('fromEmail')}
        placeholder="Sender email address"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="From Name"
        value={data.fromName || ''}
        onChange={handleChange('fromName')}
        placeholder="Sender name"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="To Email"
        value={data.toEmail || ''}
        onChange={handleChange('toEmail')}
        placeholder="Recipient email address"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="To Name"
        value={data.toName || ''}
        onChange={handleChange('toName')}
        placeholder="Recipient name"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Subject"
        value={data.subject || ''}
        onChange={handleChange('subject')}
        placeholder="Email subject"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Content"
        multiline
        rows={4}
        value={data.content || ''}
        onChange={handleChange('content')}
        placeholder="Email content"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Template ID"
        value={data.templateId || ''}
        onChange={handleChange('templateId')}
        placeholder="SendGrid template ID"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Dynamic Template Data"
        multiline
        rows={4}
        value={data.templateData || ''}
        onChange={handleChange('templateData')}
        placeholder="Template variables in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Categories"
        value={data.categories || ''}
        onChange={handleChange('categories')}
        placeholder="Comma-separated categories"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Custom Args"
        multiline
        rows={2}
        value={data.customArgs || ''}
        onChange={handleChange('customArgs')}
        placeholder="Custom arguments in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Send At"
        type="datetime-local"
        value={data.sendAt || ''}
        onChange={handleChange('sendAt')}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.sandboxMode || false}
            onChange={handleSwitchChange('sandboxMode')}
          />
        }
        label="Sandbox Mode"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.clickTracking || false}
            onChange={handleSwitchChange('clickTracking')}
          />
        }
        label="Click Tracking"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.openTracking || false}
            onChange={handleSwitchChange('openTracking')}
          />
        }
        label="Open Tracking"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default SendGridNode;
