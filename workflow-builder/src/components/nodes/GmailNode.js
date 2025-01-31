import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const GmailNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <EmailIcon sx={{ color: '#EA4335' }} />
        <Typography variant="subtitle2">Gmail</Typography>
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

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'sendEmail'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="sendEmail">Send Email</MenuItem>
          <MenuItem value="readEmails">Read Emails</MenuItem>
          <MenuItem value="createDraft">Create Draft</MenuItem>
          <MenuItem value="sendDraft">Send Draft</MenuItem>
          <MenuItem value="addLabel">Add Label</MenuItem>
          <MenuItem value="removeLabel">Remove Label</MenuItem>
          <MenuItem value="moveToTrash">Move to Trash</MenuItem>
          <MenuItem value="markAsRead">Mark as Read</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="To"
        value={data.to || ''}
        onChange={handleChange('to')}
        placeholder="Recipient email address"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="CC"
        value={data.cc || ''}
        onChange={handleChange('cc')}
        placeholder="CC email addresses"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="BCC"
        value={data.bcc || ''}
        onChange={handleChange('bcc')}
        placeholder="BCC email addresses"
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
        label="Body"
        multiline
        rows={4}
        value={data.body || ''}
        onChange={handleChange('body')}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.isHtml || false}
            onChange={handleSwitchChange('isHtml')}
          />
        }
        label="HTML Content"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Attachments"
        multiline
        rows={2}
        value={data.attachments || ''}
        onChange={handleChange('attachments')}
        placeholder="File URLs (one per line)"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Query"
        value={data.query || ''}
        onChange={handleChange('query')}
        placeholder="Search query for reading emails"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Label"
        value={data.label || ''}
        onChange={handleChange('label')}
        placeholder="Gmail label name"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.markImportant || false}
            onChange={handleSwitchChange('markImportant')}
          />
        }
        label="Mark as Important"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default GmailNode;
