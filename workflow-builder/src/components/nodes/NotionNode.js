import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Stack, IconButton } from '@mui/material';
import { Notes as NotesIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const NotionNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <NotesIcon sx={{ color: '#000000' }} />
        <Typography variant="subtitle2">Notion</Typography>
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
          value={data.operation || 'getPage'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="getPage">Get Page</MenuItem>
          <MenuItem value="getDatabase">Get Database</MenuItem>
          <MenuItem value="queryDatabase">Query Database</MenuItem>
          <MenuItem value="createPage">Create Page</MenuItem>
          <MenuItem value="updatePage">Update Page</MenuItem>
          <MenuItem value="appendBlock">Append Block</MenuItem>
          <MenuItem value="createDatabase">Create Database</MenuItem>
          <MenuItem value="updateDatabase">Update Database</MenuItem>
          <MenuItem value="getBlock">Get Block</MenuItem>
          <MenuItem value="updateBlock">Update Block</MenuItem>
          <MenuItem value="deleteBlock">Delete Block</MenuItem>
          <MenuItem value="getUser">Get User</MenuItem>
          <MenuItem value="listUsers">List Users</MenuItem>
          <MenuItem value="search">Search</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Page ID"
        value={data.pageId || ''}
        onChange={handleChange('pageId')}
        placeholder="Notion page ID"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Database ID"
        value={data.databaseId || ''}
        onChange={handleChange('databaseId')}
        placeholder="Notion database ID"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Block ID"
        value={data.blockId || ''}
        onChange={handleChange('blockId')}
        placeholder="Notion block ID"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Query Filter"
        multiline
        rows={3}
        value={data.filter || ''}
        onChange={handleChange('filter')}
        placeholder="Database query filter in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Sort"
        multiline
        rows={2}
        value={data.sort || ''}
        onChange={handleChange('sort')}
        placeholder="Sort criteria in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Properties"
        multiline
        rows={4}
        value={data.properties || ''}
        onChange={handleChange('properties')}
        placeholder="Page/database properties in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Content"
        multiline
        rows={4}
        value={data.content || ''}
        onChange={handleChange('content')}
        placeholder="Block content in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Search Query"
        value={data.query || ''}
        onChange={handleChange('query')}
        placeholder="Search query text"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default NotionNode;
