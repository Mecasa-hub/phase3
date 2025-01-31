import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { Chat as ChatIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const WhatsAppNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <ChatIcon sx={{ color: '#25D366' }} />
        <Typography variant="subtitle2">WhatsApp Business</Typography>
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
        label="Access Token"
        type="password"
        value={data.accessToken || ''}
        onChange={handleChange('accessToken')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Phone Number ID"
        value={data.phoneNumberId || ''}
        onChange={handleChange('phoneNumberId')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'sendMessage'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="sendMessage">Send Message</MenuItem>
          <MenuItem value="sendTemplate">Send Template Message</MenuItem>
          <MenuItem value="sendMedia">Send Media</MenuItem>
          <MenuItem value="sendLocation">Send Location</MenuItem>
          <MenuItem value="sendContact">Send Contact</MenuItem>
          <MenuItem value="sendReaction">Send Reaction</MenuItem>
          <MenuItem value="markMessageRead">Mark Message as Read</MenuItem>
          <MenuItem value="createTemplate">Create Message Template</MenuItem>
          <MenuItem value="deleteTemplate">Delete Message Template</MenuItem>
          <MenuItem value="getTemplates">Get Message Templates</MenuItem>
          <MenuItem value="getMedia">Get Media URL</MenuItem>
          <MenuItem value="downloadMedia">Download Media</MenuItem>
          <MenuItem value="uploadMedia">Upload Media</MenuItem>
          <MenuItem value="deleteMedia">Delete Media</MenuItem>
          <MenuItem value="getBusinessProfile">Get Business Profile</MenuItem>
          <MenuItem value="updateBusinessProfile">Update Business Profile</MenuItem>
          <MenuItem value="getPhoneNumbers">Get Phone Numbers</MenuItem>
          <MenuItem value="requestCode">Request Verification Code</MenuItem>
          <MenuItem value="verifyCode">Verify Code</MenuItem>
          <MenuItem value="registerPhone">Register Phone</MenuItem>
          <MenuItem value="deregisterPhone">Deregister Phone</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="To"
        value={data.to || ''}
        onChange={handleChange('to')}
        placeholder="WhatsApp number with country code"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Message"
        multiline
        rows={4}
        value={data.message || ''}
        onChange={handleChange('message')}
        placeholder="Message text"
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
        label="Template Language"
        value={data.templateLanguage || ''}
        onChange={handleChange('templateLanguage')}
        placeholder="en_US"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Template Components"
        multiline
        rows={4}
        value={data.templateComponents || ''}
        onChange={handleChange('templateComponents')}
        placeholder="Template components in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Media URL"
        value={data.mediaUrl || ''}
        onChange={handleChange('mediaUrl')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Media ID"
        value={data.mediaId || ''}
        onChange={handleChange('mediaId')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Media Type</InputLabel>
        <Select
          value={data.mediaType || 'image'}
          onChange={handleChange('mediaType')}
          label="Media Type"
        >
          <MenuItem value="image">Image</MenuItem>
          <MenuItem value="video">Video</MenuItem>
          <MenuItem value="audio">Audio</MenuItem>
          <MenuItem value="document">Document</MenuItem>
          <MenuItem value="sticker">Sticker</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Media Caption"
        value={data.mediaCaption || ''}
        onChange={handleChange('mediaCaption')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Latitude"
        type="number"
        value={data.latitude || ''}
        onChange={handleChange('latitude')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Longitude"
        type="number"
        value={data.longitude || ''}
        onChange={handleChange('longitude')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Location Name"
        value={data.locationName || ''}
        onChange={handleChange('locationName')}
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
        label="Message ID"
        value={data.messageId || ''}
        onChange={handleChange('messageId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Reaction Emoji"
        value={data.reactionEmoji || ''}
        onChange={handleChange('reactionEmoji')}
        placeholder="Unicode emoji"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.previewUrl || false}
            onChange={handleSwitchChange('previewUrl')}
          />
        }
        label="Preview URL"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default WhatsAppNode;
