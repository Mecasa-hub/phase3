import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton, ListSubheader, Divider } from '@mui/material';
import { Forum as ForumIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const DiscordNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <ForumIcon sx={{ color: '#5865F2' }} />
        <Typography variant="subtitle2">Discord</Typography>
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
        label="Bot Token"
        value={data.botToken || ''}
        onChange={handleChange('botToken')}
        type="password"
        sx={{ mb: 2 }}
      />

      <FormControl 
        fullWidth 
        sx={{ 
          mb: 2,
          '& .MuiInputLabel-root': {
            color: '#5865F2',
            fontWeight: 500
          },
          '& .MuiSelect-select': {
            cursor: 'pointer'
          }
        }}
      >
        <InputLabel>Select Operation ↓</InputLabel>
        <Select
          value={data.operation || 'sendMessage'}
          onChange={handleChange('operation')}
          label="Operation"
          MenuProps={{
            disablePortal: false,
            PaperProps: {
              sx: {
                maxHeight: 450,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                '& .MuiMenuItem-root': {
                  padding: '8px 14px',
                  fontSize: '0.875rem',
                  '&:hover': {
                    backgroundColor: '#f0f7ff'
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#e3f2fd',
                    '&:hover': {
                      backgroundColor: '#e3f2fd'
                    }
                  },
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                },
                '& .MuiListSubheader-root': {
                  backgroundColor: '#5865F2',
                  lineHeight: '28px',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#ffffff',
                  padding: '4px 14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                },
                '& .MuiDivider-root': {
                  margin: '4px 0',
                  borderColor: '#e0e0e0'
                }
              }
            }
          }}
        >
          <ListSubheader>Message Operations</ListSubheader>
          <MenuItem value="sendMessage">💬 Send Message</MenuItem>
          <MenuItem value="sendEmbed">📊 Send Embed</MenuItem>
          <MenuItem value="editMessage">✏️ Edit Message</MenuItem>
          <MenuItem value="deleteMessage">🗑️ Delete Message</MenuItem>
          <MenuItem value="pinMessage">📌 Pin Message</MenuItem>
          <MenuItem value="unpinMessage">📍 Unpin Message</MenuItem>
          
          <Divider />
          <ListSubheader>Channel Operations</ListSubheader>
          <MenuItem value="createChannel">➕ Create Channel</MenuItem>
          <MenuItem value="deleteChannel">➖ Delete Channel</MenuItem>
          <MenuItem value="editChannel">✏️ Edit Channel</MenuItem>
          <MenuItem value="getChannels">📋 Get Channels</MenuItem>
          <MenuItem value="setChannelTopic">📝 Set Channel Topic</MenuItem>
          <MenuItem value="setChannelNSFW">🔞 Set Channel NSFW</MenuItem>
          
          <Divider />
          <ListSubheader>Member Operations</ListSubheader>
          <MenuItem value="addRole">👤 Add Role</MenuItem>
          <MenuItem value="removeRole">🚫 Remove Role</MenuItem>
          <MenuItem value="kickMember">👢 Kick Member</MenuItem>
          <MenuItem value="banMember">🔨 Ban Member</MenuItem>
          <MenuItem value="unbanMember">✅ Unban Member</MenuItem>
          <MenuItem value="timeoutMember">⏰ Timeout Member</MenuItem>
          
          <Divider />
          <ListSubheader>Server Operations</ListSubheader>
          <MenuItem value="createRole">➕ Create Role</MenuItem>
          <MenuItem value="deleteRole">➖ Delete Role</MenuItem>
          <MenuItem value="editRole">✏️ Edit Role</MenuItem>
          <MenuItem value="getRoles">📋 Get Roles</MenuItem>
          <MenuItem value="getMembers">👥 Get Members</MenuItem>
          <MenuItem value="getBans">🔨 Get Bans</MenuItem>
          
          <Divider />
          <ListSubheader>Voice Operations</ListSubheader>
          <MenuItem value="joinVoice">🎙️ Join Voice Channel</MenuItem>
          <MenuItem value="leaveVoice">🚪 Leave Voice Channel</MenuItem>
          <MenuItem value="moveMembers">↔️ Move Members</MenuItem>
          <MenuItem value="muteMembers">🔇 Mute Members</MenuItem>
          <MenuItem value="unmuteMembers">🔊 Unmute Members</MenuItem>
          
          <Divider />
          <ListSubheader>Webhook Operations</ListSubheader>
          <MenuItem value="createWebhook">🔗 Create Webhook</MenuItem>
          <MenuItem value="deleteWebhook">❌ Delete Webhook</MenuItem>
          <MenuItem value="editWebhook">✏️ Edit Webhook</MenuItem>
          <MenuItem value="getWebhooks">📋 Get Webhooks</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Channel ID"
        value={data.channelId || ''}
        onChange={handleChange('channelId')}
        placeholder="Discord channel ID"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Message Content"
        multiline
        rows={3}
        value={data.messageContent || ''}
        onChange={handleChange('messageContent')}
        placeholder="Enter message content"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.tts || false}
            onChange={handleSwitchChange('tts')}
          />
        }
        label="Text-to-Speech"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Embed Title"
        value={data.embedTitle || ''}
        onChange={handleChange('embedTitle')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Embed Description"
        multiline
        rows={2}
        value={data.embedDescription || ''}
        onChange={handleChange('embedDescription')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Embed Color"
        value={data.embedColor || ''}
        onChange={handleChange('embedColor')}
        placeholder="#000000"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Embed Image URL"
        value={data.embedImageUrl || ''}
        onChange={handleChange('embedImageUrl')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="User ID"
        value={data.userId || ''}
        onChange={handleChange('userId')}
        placeholder="For user-specific operations"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Role ID"
        value={data.roleId || ''}
        onChange={handleChange('roleId')}
        placeholder="For role operations"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Reason"
        value={data.reason || ''}
        onChange={handleChange('reason')}
        placeholder="Reason for moderation actions"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default DiscordNode;
