import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { Api as ApiIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const GraphQLNode = ({ id, data, isConnectable }) => {
  const { setNodes, setEdges } = useReactFlow();

  const onDelete = () => {
    setNodes((nodes) => nodes.filter(node => node.id !== id));
    setEdges((edges) => edges.filter(edge => edge.source !== id && edge.target !== id));
  };

  const handleChange = (field) => (event) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, [field]: event.target.value } }
          : node
      )
    );
  };

  const handleSwitchChange = (field) => (event) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, [field]: event.target.checked } }
          : node
      )
    );
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
        <ApiIcon sx={{ color: '#E535AB' }} />
        <Typography variant="subtitle2">GraphQL</Typography>
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
        label="Endpoint URL"
        value={data.endpoint || ''}
        onChange={handleChange('endpoint')}
        placeholder="https://api.example.com/graphql"
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation Type</InputLabel>
        <Select
          value={data.operationType || 'query'}
          onChange={handleChange('operationType')}
          label="Operation Type"
        >
          <MenuItem value="query">Query</MenuItem>
          <MenuItem value="mutation">Mutation</MenuItem>
          <MenuItem value="subscription">Subscription</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Operation Name"
        value={data.operationName || ''}
        onChange={handleChange('operationName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Query/Mutation"
        value={data.query || ''}
        onChange={handleChange('query')}
        placeholder="query { ... }"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Variables"
        value={data.variables || ''}
        onChange={handleChange('variables')}
        placeholder="{ &#34;key&#34;: &#34;value&#34; }"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Headers"
        multiline
        rows={2}
        value={data.headers || ''}
        onChange={handleChange('headers')}
        placeholder="{ &#34;Authorization&#34;: &#34;Bearer token&#34; }"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.includeIntrospection || false}
            onChange={handleSwitchChange('includeIntrospection')}
          />
        }
        label="Include Introspection"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.useVariables || false}
            onChange={handleSwitchChange('useVariables')}
          />
        }
        label="Use Variables"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default GraphQLNode;
