import React, { memo } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { Box, TextField, Typography, IconButton, Stack } from '@mui/material';
import { Chat as ChatIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const ChatNode = ({ id, data, isConnectable }) => {
  const { setNodes, setEdges } = useReactFlow();

  const onDelete = () => {
    setNodes((nodes) => nodes.filter(node => node.id !== id));
    setEdges((edges) => edges.filter(edge => edge.source !== id && edge.target !== id));
  };

  return (
    <Box
      sx={{
        background: '#fff',
        padding: '4px',
        borderRadius: '3px',
        border: '1px solid #ddd',
        width: '130px',
        position: 'relative',
        fontSize: '0.75rem'
      }}
    >
      <Stack 
        direction="row" 
        spacing={1} 
        alignItems="center" 
        sx={{ 
          mb: 0.5,
          pb: 0.25,
          borderBottom: '1px solid #e0e0e0',
          pr: 2
        }}
      >
        <ChatIcon sx={{ color: '#1976d2', fontSize: '0.9rem' }} />
        <Typography variant="subtitle2" sx={{ fontSize: '0.7rem', fontWeight: 500 }}>Chat Output</Typography>
      </Stack>
      
      <IconButton 
        size="small" 
        onClick={onDelete}
        sx={{ 
          position: 'absolute',
          top: 4,
          right: 4,
          padding: '2px',
          bgcolor: 'rgba(0,0,0,0.05)',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' }
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <TextField
          fullWidth
          multiline
          rows={2}
          label="Message"
          variant="outlined"
          size="small"
          sx={{ 
            '& .MuiInputBase-input': { 
              fontSize: '0.7rem', 
              py: 0.25,
              px: 1,
              lineHeight: 1.2
            },
            '& .MuiInputLabel-root': {
              fontSize: '0.7rem',
              transform: 'translate(8px, 6px) scale(1)'
            },
            '& .MuiInputLabel-shrink': {
              transform: 'translate(8px, -6px) scale(0.7)'
            }
          }}
          defaultValue={data.message || ''}
          placeholder="Enter chat message or template..."
        />

        <TextField
          fullWidth
          label="Role"
          variant="outlined"
          size="small"
          sx={{ 
            '& .MuiInputBase-input': { 
              fontSize: '0.7rem', 
              py: 0.5,
              px: 1
            },
            '& .MuiInputLabel-root': {
              fontSize: '0.7rem',
              transform: 'translate(8px, 6px) scale(1)'
            },
            '& .MuiInputLabel-shrink': {
              transform: 'translate(8px, -6px) scale(0.7)'
            }
          }}
          defaultValue={data.role || 'assistant'}
          select
          SelectProps={{ native: true }}
        >
          <option value="assistant">Assistant</option>
          <option value="user">User</option>
          <option value="system">System</option>
        </TextField>
      </Box>

      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ background: '#1976d2' }}
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ background: '#1976d2' }}
      />
    </Box>
  );
};

export default memo(ChatNode);
