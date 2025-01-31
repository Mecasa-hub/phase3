import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { Videocam as VideocamIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const ZoomNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <VideocamIcon sx={{ color: '#2D8CFF' }} />
        <Typography variant="subtitle2">Zoom</Typography>
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
        label="API Secret"
        type="password"
        value={data.apiSecret || ''}
        onChange={handleChange('apiSecret')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'createMeeting'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="createMeeting">Create Meeting</MenuItem>
          <MenuItem value="updateMeeting">Update Meeting</MenuItem>
          <MenuItem value="deleteMeeting">Delete Meeting</MenuItem>
          <MenuItem value="getMeeting">Get Meeting</MenuItem>
          <MenuItem value="listMeetings">List Meetings</MenuItem>
          <MenuItem value="createWebinar">Create Webinar</MenuItem>
          <MenuItem value="updateWebinar">Update Webinar</MenuItem>
          <MenuItem value="deleteWebinar">Delete Webinar</MenuItem>
          <MenuItem value="getWebinar">Get Webinar</MenuItem>
          <MenuItem value="listWebinars">List Webinars</MenuItem>
          <MenuItem value="createUser">Create User</MenuItem>
          <MenuItem value="updateUser">Update User</MenuItem>
          <MenuItem value="deleteUser">Delete User</MenuItem>
          <MenuItem value="getUser">Get User</MenuItem>
          <MenuItem value="listUsers">List Users</MenuItem>
          <MenuItem value="createGroup">Create Group</MenuItem>
          <MenuItem value="updateGroup">Update Group</MenuItem>
          <MenuItem value="deleteGroup">Delete Group</MenuItem>
          <MenuItem value="getGroup">Get Group</MenuItem>
          <MenuItem value="listGroups">List Groups</MenuItem>
          <MenuItem value="addGroupMembers">Add Group Members</MenuItem>
          <MenuItem value="removeGroupMembers">Remove Group Members</MenuItem>
          <MenuItem value="getRecording">Get Recording</MenuItem>
          <MenuItem value="listRecordings">List Recordings</MenuItem>
          <MenuItem value="deleteRecording">Delete Recording</MenuItem>
          <MenuItem value="getParticipants">Get Participants</MenuItem>
          <MenuItem value="getPastParticipants">Get Past Participants</MenuItem>
          <MenuItem value="getMetrics">Get Meeting Metrics</MenuItem>
          <MenuItem value="getWebinarMetrics">Get Webinar Metrics</MenuItem>
          <MenuItem value="createRegistrant">Create Registrant</MenuItem>
          <MenuItem value="updateRegistrant">Update Registrant</MenuItem>
          <MenuItem value="getRegistrant">Get Registrant</MenuItem>
          <MenuItem value="listRegistrants">List Registrants</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Meeting ID"
        value={data.meetingId || ''}
        onChange={handleChange('meetingId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Topic"
        value={data.topic || ''}
        onChange={handleChange('topic')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Agenda"
        multiline
        rows={4}
        value={data.agenda || ''}
        onChange={handleChange('agenda')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Start Time"
        type="datetime-local"
        value={data.startTime || ''}
        onChange={handleChange('startTime')}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Duration"
        type="number"
        value={data.duration || ''}
        onChange={handleChange('duration')}
        placeholder="Duration in minutes"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Password"
        value={data.password || ''}
        onChange={handleChange('password')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Host Email"
        value={data.hostEmail || ''}
        onChange={handleChange('hostEmail')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Alternative Hosts"
        value={data.alternativeHosts || ''}
        onChange={handleChange('alternativeHosts')}
        placeholder="Comma-separated email addresses"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Registration Type"
        type="number"
        value={data.registrationType || ''}
        onChange={handleChange('registrationType')}
        placeholder="1: Require registration, 2: Register once, 3: Register for each"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.joinBeforeHost || false}
            onChange={handleSwitchChange('joinBeforeHost')}
          />
        }
        label="Join Before Host"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.hostVideo || true}
            onChange={handleSwitchChange('hostVideo')}
          />
        }
        label="Host Video"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.participantVideo || true}
            onChange={handleSwitchChange('participantVideo')}
          />
        }
        label="Participant Video"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.mute || false}
            onChange={handleSwitchChange('mute')}
          />
        }
        label="Mute Upon Entry"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.autoRecording || false}
            onChange={handleSwitchChange('autoRecording')}
          />
        }
        label="Auto Recording"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default ZoomNode;
