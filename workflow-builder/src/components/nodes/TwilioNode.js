import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Stack, IconButton } from '@mui/material';
import { Phone as PhoneIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const TwilioNode = ({ id, data, isConnectable, updateNodeData }) => {
  const { setNodes, setEdges } = useReactFlow();

  const onDelete = () => {
    setNodes((nodes) => nodes.filter(node => node.id !== id));
    setEdges((edges) => edges.filter(edge => edge.source !== id && edge.target !== id));
  };

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
        <PhoneIcon sx={{ color: '#F22F46' }} />
        <Typography variant="subtitle2">Twilio</Typography>
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
        label="Account SID"
        type="password"
        value={data.accountSid || ''}
        onChange={handleChange('accountSid')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Auth Token"
        type="password"
        value={data.authToken || ''}
        onChange={handleChange('authToken')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'sendSMS'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="sendSMS">Send SMS</MenuItem>
          <MenuItem value="makeCall">Make Call</MenuItem>
          <MenuItem value="sendWhatsApp">Send WhatsApp Message</MenuItem>
          <MenuItem value="sendMMS">Send MMS</MenuItem>
          <MenuItem value="createVerification">Create Verification</MenuItem>
          <MenuItem value="checkVerification">Check Verification</MenuItem>
          <MenuItem value="lookupNumber">Lookup Phone Number</MenuItem>
          <MenuItem value="buyNumber">Buy Phone Number</MenuItem>
          <MenuItem value="releaseNumber">Release Phone Number</MenuItem>
          <MenuItem value="listNumbers">List Phone Numbers</MenuItem>
          <MenuItem value="updateNumber">Update Phone Number</MenuItem>
          <MenuItem value="createMessage">Create Message</MenuItem>
          <MenuItem value="getMessage">Get Message</MenuItem>
          <MenuItem value="listMessages">List Messages</MenuItem>
          <MenuItem value="createCall">Create Call</MenuItem>
          <MenuItem value="getCall">Get Call</MenuItem>
          <MenuItem value="listCalls">List Calls</MenuItem>
          <MenuItem value="modifyCall">Modify Live Call</MenuItem>
          <MenuItem value="createConference">Create Conference</MenuItem>
          <MenuItem value="getConference">Get Conference</MenuItem>
          <MenuItem value="listConferences">List Conferences</MenuItem>
          <MenuItem value="updateConference">Update Conference</MenuItem>
          <MenuItem value="createParticipant">Add Conference Participant</MenuItem>
          <MenuItem value="removeParticipant">Remove Conference Participant</MenuItem>
          <MenuItem value="createRecording">Create Recording</MenuItem>
          <MenuItem value="getRecording">Get Recording</MenuItem>
          <MenuItem value="listRecordings">List Recordings</MenuItem>
          <MenuItem value="deleteRecording">Delete Recording</MenuItem>
          <MenuItem value="createQueue">Create Queue</MenuItem>
          <MenuItem value="updateQueue">Update Queue</MenuItem>
          <MenuItem value="deleteQueue">Delete Queue</MenuItem>
          <MenuItem value="listQueues">List Queues</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="From"
        value={data.from || ''}
        onChange={handleChange('from')}
        placeholder="Your Twilio phone number"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="To"
        value={data.to || ''}
        onChange={handleChange('to')}
        placeholder="Recipient's phone number"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Message"
        multiline
        rows={4}
        value={data.message || ''}
        onChange={handleChange('message')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Media URL"
        value={data.mediaUrl || ''}
        onChange={handleChange('mediaUrl')}
        placeholder="URL for MMS media"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="TwiML"
        multiline
        rows={4}
        value={data.twiml || ''}
        onChange={handleChange('twiml')}
        placeholder="TwiML instructions for calls"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Status Callback URL"
        value={data.statusCallback || ''}
        onChange={handleChange('statusCallback')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Record SID"
        value={data.recordSid || ''}
        onChange={handleChange('recordSid')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Conference SID"
        value={data.conferenceSid || ''}
        onChange={handleChange('conferenceSid')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Call SID"
        value={data.callSid || ''}
        onChange={handleChange('callSid')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Queue Name"
        value={data.queueName || ''}
        onChange={handleChange('queueName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Area Code"
        value={data.areaCode || ''}
        onChange={handleChange('areaCode')}
        placeholder="For buying numbers"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Country Code"
        value={data.countryCode || ''}
        onChange={handleChange('countryCode')}
        placeholder="US, GB, etc."
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Verification Code"
        value={data.verificationCode || ''}
        onChange={handleChange('verificationCode')}
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default TwilioNode;
