import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { Groups as GroupsIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const MicrosoftTeamsNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <GroupsIcon sx={{ color: '#6264A7' }} />
        <Typography variant="subtitle2">Microsoft Teams</Typography>
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
        label="Tenant ID"
        value={data.tenantId || ''}
        onChange={handleChange('tenantId')}
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

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'sendMessage'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="sendMessage">Send Message</MenuItem>
          <MenuItem value="createChannel">Create Channel</MenuItem>
          <MenuItem value="updateChannel">Update Channel</MenuItem>
          <MenuItem value="deleteChannel">Delete Channel</MenuItem>
          <MenuItem value="getChannel">Get Channel</MenuItem>
          <MenuItem value="listChannels">List Channels</MenuItem>
          <MenuItem value="createTeam">Create Team</MenuItem>
          <MenuItem value="updateTeam">Update Team</MenuItem>
          <MenuItem value="deleteTeam">Delete Team</MenuItem>
          <MenuItem value="getTeam">Get Team</MenuItem>
          <MenuItem value="listTeams">List Teams</MenuItem>
          <MenuItem value="addMember">Add Member</MenuItem>
          <MenuItem value="removeMember">Remove Member</MenuItem>
          <MenuItem value="getMember">Get Member</MenuItem>
          <MenuItem value="listMembers">List Members</MenuItem>
          <MenuItem value="createTab">Create Tab</MenuItem>
          <MenuItem value="updateTab">Update Tab</MenuItem>
          <MenuItem value="deleteTab">Delete Tab</MenuItem>
          <MenuItem value="getTab">Get Tab</MenuItem>
          <MenuItem value="listTabs">List Tabs</MenuItem>
          <MenuItem value="createMeeting">Create Meeting</MenuItem>
          <MenuItem value="updateMeeting">Update Meeting</MenuItem>
          <MenuItem value="deleteMeeting">Delete Meeting</MenuItem>
          <MenuItem value="getMeeting">Get Meeting</MenuItem>
          <MenuItem value="listMeetings">List Meetings</MenuItem>
          <MenuItem value="createWebhook">Create Webhook</MenuItem>
          <MenuItem value="deleteWebhook">Delete Webhook</MenuItem>
          <MenuItem value="listWebhooks">List Webhooks</MenuItem>
          <MenuItem value="sendAdaptiveCard">Send Adaptive Card</MenuItem>
          <MenuItem value="reactToMessage">React to Message</MenuItem>
          <MenuItem value="replyToMessage">Reply to Message</MenuItem>
          <MenuItem value="pinMessage">Pin Message</MenuItem>
          <MenuItem value="unpinMessage">Unpin Message</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Team ID"
        value={data.teamId || ''}
        onChange={handleChange('teamId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Channel ID"
        value={data.channelId || ''}
        onChange={handleChange('channelId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Message"
        multiline
        rows={4}
        value={data.message || ''}
        onChange={handleChange('message')}
        placeholder="Message text with optional markdown"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Adaptive Card"
        multiline
        rows={4}
        value={data.adaptiveCard || ''}
        onChange={handleChange('adaptiveCard')}
        placeholder="Adaptive Card JSON"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="User ID"
        value={data.userId || ''}
        onChange={handleChange('userId')}
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
        label="Reaction"
        value={data.reaction || ''}
        onChange={handleChange('reaction')}
        placeholder="like, heart, laugh, surprised, sad, angry"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Meeting Title"
        value={data.meetingTitle || ''}
        onChange={handleChange('meetingTitle')}
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
        label="End Time"
        type="datetime-local"
        value={data.endTime || ''}
        onChange={handleChange('endTime')}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Webhook URL"
        value={data.webhookUrl || ''}
        onChange={handleChange('webhookUrl')}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.important || false}
            onChange={handleSwitchChange('important')}
          />
        }
        label="Important Message"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.notify || false}
            onChange={handleSwitchChange('notify')}
          />
        }
        label="Notify Members"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default MicrosoftTeamsNode;
