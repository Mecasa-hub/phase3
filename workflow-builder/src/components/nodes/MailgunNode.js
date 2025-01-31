import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const MailgunNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <EmailIcon sx={{ color: '#F0615F' }} />
        <Typography variant="subtitle2">Mailgun</Typography>
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

      <TextField
        fullWidth
        label="Domain"
        value={data.domain || ''}
        onChange={handleChange('domain')}
        placeholder="mg.yourdomain.com"
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
          <MenuItem value="createTemplate">Create Template</MenuItem>
          <MenuItem value="updateTemplate">Update Template</MenuItem>
          <MenuItem value="deleteTemplate">Delete Template</MenuItem>
          <MenuItem value="getTemplate">Get Template</MenuItem>
          <MenuItem value="listTemplates">List Templates</MenuItem>
          <MenuItem value="validateEmail">Validate Email</MenuItem>
          <MenuItem value="parseEmail">Parse Email</MenuItem>
          <MenuItem value="createMailingList">Create Mailing List</MenuItem>
          <MenuItem value="updateMailingList">Update Mailing List</MenuItem>
          <MenuItem value="deleteMailingList">Delete Mailing List</MenuItem>
          <MenuItem value="getMailingList">Get Mailing List</MenuItem>
          <MenuItem value="listMailingLists">List Mailing Lists</MenuItem>
          <MenuItem value="addListMember">Add List Member</MenuItem>
          <MenuItem value="updateListMember">Update List Member</MenuItem>
          <MenuItem value="removeListMember">Remove List Member</MenuItem>
          <MenuItem value="getListMember">Get List Member</MenuItem>
          <MenuItem value="listMembers">List Members</MenuItem>
          <MenuItem value="getDomainStats">Get Domain Stats</MenuItem>
          <MenuItem value="getEvents">Get Events</MenuItem>
          <MenuItem value="getTags">Get Tags</MenuItem>
          <MenuItem value="getRoutes">Get Routes</MenuItem>
          <MenuItem value="createRoute">Create Route</MenuItem>
          <MenuItem value="updateRoute">Update Route</MenuItem>
          <MenuItem value="deleteRoute">Delete Route</MenuItem>
          <MenuItem value="getWebhooks">Get Webhooks</MenuItem>
          <MenuItem value="createWebhook">Create Webhook</MenuItem>
          <MenuItem value="deleteWebhook">Delete Webhook</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="From Email"
        value={data.fromEmail || ''}
        onChange={handleChange('fromEmail')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="From Name"
        value={data.fromName || ''}
        onChange={handleChange('fromName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="To"
        value={data.to || ''}
        onChange={handleChange('to')}
        placeholder="Comma-separated email addresses"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="CC"
        value={data.cc || ''}
        onChange={handleChange('cc')}
        placeholder="Comma-separated email addresses"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="BCC"
        value={data.bcc || ''}
        onChange={handleChange('bcc')}
        placeholder="Comma-separated email addresses"
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
        label="Text Content"
        multiline
        rows={4}
        value={data.text || ''}
        onChange={handleChange('text')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="HTML Content"
        multiline
        rows={4}
        value={data.html || ''}
        onChange={handleChange('html')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Template Name"
        value={data.templateName || ''}
        onChange={handleChange('templateName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Template Variables"
        multiline
        rows={4}
        value={data.templateVariables || ''}
        onChange={handleChange('templateVariables')}
        placeholder="Template variables in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="List Address"
        value={data.listAddress || ''}
        onChange={handleChange('listAddress')}
        placeholder="list@yourdomain.com"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Member Email"
        value={data.memberEmail || ''}
        onChange={handleChange('memberEmail')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Member Variables"
        multiline
        rows={4}
        value={data.memberVariables || ''}
        onChange={handleChange('memberVariables')}
        placeholder="Member variables in JSON format"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.tracking || true}
            onChange={handleSwitchChange('tracking')}
          />
        }
        label="Enable Tracking"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.testMode || false}
            onChange={handleSwitchChange('testMode')}
          />
        }
        label="Test Mode"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default MailgunNode;
