import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Stack, IconButton, ListSubheader, Divider } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const TelegramNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <SendIcon sx={{ color: '#0088cc' }} />
        <Typography variant="subtitle2">Telegram</Typography>
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

      <TextField
        fullWidth
        label="Chat ID"
        value={data.chatId || ''}
        onChange={handleChange('chatId')}
        placeholder="Enter chat/channel ID"
        sx={{ mb: 2 }}
      />

      <FormControl 
        fullWidth 
        sx={{ 
          mb: 2,
          '& .MuiInputLabel-root': {
            color: '#0088cc',
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
                  backgroundColor: '#0088cc',
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
          <MenuItem value="editMessage">✏️ Edit Message</MenuItem>
          <MenuItem value="deleteMessage">🗑️ Delete Message</MenuItem>
          <MenuItem value="pinMessage">📌 Pin Message</MenuItem>
          <MenuItem value="unpinMessage">📍 Unpin Message</MenuItem>
          
          <Divider />
          <ListSubheader>Media Operations</ListSubheader>
          <MenuItem value="sendPhoto">📷 Send Photo</MenuItem>
          <MenuItem value="sendDocument">📄 Send Document</MenuItem>
          <MenuItem value="sendVideo">🎥 Send Video</MenuItem>
          <MenuItem value="sendAudio">🎵 Send Audio</MenuItem>
          <MenuItem value="sendVoice">🎤 Send Voice Message</MenuItem>
          <MenuItem value="sendMediaGroup">🖼️ Send Media Group</MenuItem>
          
          <Divider />
          <ListSubheader>Interactive Content</ListSubheader>
          <MenuItem value="sendPoll">📊 Send Poll</MenuItem>
          <MenuItem value="sendQuiz">❓ Send Quiz</MenuItem>
          <MenuItem value="sendLocation">📍 Send Location</MenuItem>
          <MenuItem value="sendVenue">🏢 Send Venue</MenuItem>
          <MenuItem value="sendContact">👤 Send Contact</MenuItem>
          
          <Divider />
          <ListSubheader>Chat Operations</ListSubheader>
          <MenuItem value="getChat">ℹ️ Get Chat Info</MenuItem>
          <MenuItem value="leaveChat">🚪 Leave Chat</MenuItem>
          <MenuItem value="getChatMember">👥 Get Chat Member</MenuItem>
          <MenuItem value="getChatAdministrators">👑 Get Chat Admins</MenuItem>
          <MenuItem value="getChatMembersCount">🔢 Get Members Count</MenuItem>
          
          <Divider />
          <ListSubheader>Bot Operations</ListSubheader>
          <MenuItem value="getMe">🤖 Get Bot Info</MenuItem>
          <MenuItem value="setWebhook">🔗 Set Webhook</MenuItem>
          <MenuItem value="deleteWebhook">❌ Delete Webhook</MenuItem>
          <MenuItem value="getWebhookInfo">ℹ️ Get Webhook Info</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Message Text"
        multiline
        rows={3}
        value={data.messageText || ''}
        onChange={handleChange('messageText')}
        placeholder="Enter message text"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Parse Mode"
        select
        value={data.parseMode || 'HTML'}
        onChange={handleChange('parseMode')}
        sx={{ mb: 2 }}
      >
        <MenuItem value="HTML">HTML</MenuItem>
        <MenuItem value="Markdown">Markdown</MenuItem>
        <MenuItem value="MarkdownV2">Markdown V2</MenuItem>
      </TextField>

      <TextField
        fullWidth
        label="File URL"
        value={data.fileUrl || ''}
        onChange={handleChange('fileUrl')}
        placeholder="URL for photo/document"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Caption"
        value={data.caption || ''}
        onChange={handleChange('caption')}
        placeholder="Caption for media"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default TelegramNode;
