import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Stack, IconButton } from '@mui/material';
import { Storage as StorageIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const PostgresNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <StorageIcon sx={{ color: '#336791' }} />
        <Typography variant="subtitle2">PostgreSQL Database</Typography>
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
        label="Host"
        value={data.host || ''}
        onChange={handleChange('host')}
        placeholder="localhost"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Port"
        value={data.port || ''}
        onChange={handleChange('port')}
        placeholder="5432"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Database"
        value={data.database || ''}
        onChange={handleChange('database')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Schema"
        value={data.schema || ''}
        onChange={handleChange('schema')}
        placeholder="public"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Username"
        value={data.username || ''}
        onChange={handleChange('username')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        value={data.password || ''}
        onChange={handleChange('password')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'query'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="query">Execute Query</MenuItem>
          <MenuItem value="insert">Insert Data</MenuItem>
          <MenuItem value="update">Update Data</MenuItem>
          <MenuItem value="delete">Delete Data</MenuItem>
          <MenuItem value="table">Create/Alter Table</MenuItem>
          <MenuItem value="function">Create Function</MenuItem>
          <MenuItem value="trigger">Create Trigger</MenuItem>
          <MenuItem value="index">Create Index</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="SQL Query"
        multiline
        rows={4}
        value={data.query || ''}
        onChange={handleChange('query')}
        placeholder="Enter SQL query"
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Query Type</InputLabel>
        <Select
          value={data.queryType || 'single'}
          onChange={handleChange('queryType')}
          label="Query Type"
        >
          <MenuItem value="single">Single Query</MenuItem>
          <MenuItem value="transaction">Transaction</MenuItem>
          <MenuItem value="batch">Batch Operation</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Parameters"
        multiline
        rows={2}
        value={data.parameters || ''}
        onChange={handleChange('parameters')}
        placeholder="Query parameters in JSON format"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default PostgresNode;
