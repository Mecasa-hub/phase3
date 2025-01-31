import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Stack, IconButton } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const GoogleSheetsNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #ddd',
        minWidth: '200px',
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
        <GoogleIcon sx={{ color: '#34A853' }} />
        <Typography variant="subtitle2">Google Sheets</Typography>
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
        label="Spreadsheet ID"
        value={data.spreadsheetId || ''}
        onChange={handleChange('spreadsheetId')}
        placeholder="Enter spreadsheet ID"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Sheet Name"
        value={data.sheetName || ''}
        onChange={handleChange('sheetName')}
        placeholder="Enter sheet name"
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'read'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="read">Read Data</MenuItem>
          <MenuItem value="append">Append Row</MenuItem>
          <MenuItem value="update">Update Range</MenuItem>
          <MenuItem value="clear">Clear Range</MenuItem>
          <MenuItem value="create">Create Sheet</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Range"
        value={data.range || ''}
        onChange={handleChange('range')}
        placeholder="e.g., A1:D10"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Values"
        multiline
        rows={3}
        value={data.values || ''}
        onChange={handleChange('values')}
        placeholder="Enter values in JSON array format"
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Value Input Option</InputLabel>
        <Select
          value={data.valueInputOption || 'RAW'}
          onChange={handleChange('valueInputOption')}
          label="Value Input Option"
        >
          <MenuItem value="RAW">Raw</MenuItem>
          <MenuItem value="USER_ENTERED">User Entered</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Major Dimension"
        select
        value={data.majorDimension || 'ROWS'}
        onChange={handleChange('majorDimension')}
        sx={{ mb: 2 }}
      >
        <MenuItem value="ROWS">Rows</MenuItem>
        <MenuItem value="COLUMNS">Columns</MenuItem>
      </TextField>

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default GoogleSheetsNode;
