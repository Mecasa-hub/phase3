import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const ElasticsearchNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Elasticsearch</Typography>

      <TextField
        fullWidth
        label="Host"
        value={data.host || ''}
        onChange={handleChange('host')}
        placeholder="http://localhost:9200"
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
          value={data.operation || 'search'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="search">Search Documents</MenuItem>
          <MenuItem value="index">Index Document</MenuItem>
          <MenuItem value="update">Update Document</MenuItem>
          <MenuItem value="delete">Delete Document</MenuItem>
          <MenuItem value="get">Get Document</MenuItem>
          <MenuItem value="bulk">Bulk Operation</MenuItem>
          <MenuItem value="createIndex">Create Index</MenuItem>
          <MenuItem value="deleteIndex">Delete Index</MenuItem>
          <MenuItem value="indexExists">Check Index Exists</MenuItem>
          <MenuItem value="updateMapping">Update Mapping</MenuItem>
          <MenuItem value="getMapping">Get Mapping</MenuItem>
          <MenuItem value="putSettings">Update Settings</MenuItem>
          <MenuItem value="getSettings">Get Settings</MenuItem>
          <MenuItem value="createTemplate">Create Template</MenuItem>
          <MenuItem value="deleteTemplate">Delete Template</MenuItem>
          <MenuItem value="getTemplate">Get Template</MenuItem>
          <MenuItem value="createAlias">Create Alias</MenuItem>
          <MenuItem value="deleteAlias">Delete Alias</MenuItem>
          <MenuItem value="getAlias">Get Alias</MenuItem>
          <MenuItem value="reindex">Reindex</MenuItem>
          <MenuItem value="count">Count Documents</MenuItem>
          <MenuItem value="scroll">Scroll Search</MenuItem>
          <MenuItem value="clearScroll">Clear Scroll</MenuItem>
          <MenuItem value="analyze">Analyze Text</MenuItem>
          <MenuItem value="clusterHealth">Get Cluster Health</MenuItem>
          <MenuItem value="clusterStats">Get Cluster Stats</MenuItem>
          <MenuItem value="nodeStats">Get Node Stats</MenuItem>
          <MenuItem value="indicesStats">Get Indices Stats</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Index"
        value={data.index || ''}
        onChange={handleChange('index')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Document ID"
        value={data.documentId || ''}
        onChange={handleChange('documentId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Document Body"
        multiline
        rows={4}
        value={data.body || ''}
        onChange={handleChange('body')}
        placeholder="Document data in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Query"
        multiline
        rows={4}
        value={data.query || ''}
        onChange={handleChange('query')}
        placeholder="Elasticsearch query in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Mapping"
        multiline
        rows={4}
        value={data.mapping || ''}
        onChange={handleChange('mapping')}
        placeholder="Mapping configuration in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Settings"
        multiline
        rows={4}
        value={data.settings || ''}
        onChange={handleChange('settings')}
        placeholder="Settings configuration in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Scroll ID"
        value={data.scrollId || ''}
        onChange={handleChange('scrollId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Scroll Time"
        value={data.scrollTime || ''}
        onChange={handleChange('scrollTime')}
        placeholder="1m"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Batch Size"
        type="number"
        value={data.batchSize || ''}
        onChange={handleChange('batchSize')}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.refresh || false}
            onChange={handleSwitchChange('refresh')}
          />
        }
        label="Refresh Index"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.waitForCompletion || false}
            onChange={handleSwitchChange('waitForCompletion')}
          />
        }
        label="Wait for Completion"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default ElasticsearchNode;
