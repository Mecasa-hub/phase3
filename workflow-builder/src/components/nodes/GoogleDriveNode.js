import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const GoogleDriveNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <GoogleIcon sx={{ color: '#1FA463' }} />
        <Typography variant="subtitle2">Google Drive</Typography>
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

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'upload'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="upload">Upload File</MenuItem>
          <MenuItem value="download">Download File</MenuItem>
          <MenuItem value="createFolder">Create Folder</MenuItem>
          <MenuItem value="list">List Files/Folders</MenuItem>
          <MenuItem value="delete">Delete File/Folder</MenuItem>
          <MenuItem value="copy">Copy File</MenuItem>
          <MenuItem value="move">Move File</MenuItem>
          <MenuItem value="rename">Rename File</MenuItem>
          <MenuItem value="share">Share File/Folder</MenuItem>
          <MenuItem value="getMetadata">Get Metadata</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="File ID"
        value={data.fileId || ''}
        onChange={handleChange('fileId')}
        placeholder="Google Drive file ID"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="File Name"
        value={data.fileName || ''}
        onChange={handleChange('fileName')}
        placeholder="Name for new or renamed file"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="File URL"
        value={data.fileUrl || ''}
        onChange={handleChange('fileUrl')}
        placeholder="URL of file to upload"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Folder ID"
        value={data.folderId || ''}
        onChange={handleChange('folderId')}
        placeholder="Parent folder ID"
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>MIME Type</InputLabel>
        <Select
          value={data.mimeType || ''}
          onChange={handleChange('mimeType')}
          label="MIME Type"
        >
          <MenuItem value="">Auto-detect</MenuItem>
          <MenuItem value="application/pdf">PDF</MenuItem>
          <MenuItem value="image/jpeg">JPEG Image</MenuItem>
          <MenuItem value="image/png">PNG Image</MenuItem>
          <MenuItem value="application/vnd.google-apps.document">Google Doc</MenuItem>
          <MenuItem value="application/vnd.google-apps.spreadsheet">Google Sheet</MenuItem>
          <MenuItem value="application/vnd.google-apps.presentation">Google Slides</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Share Permission</InputLabel>
        <Select
          value={data.sharePermission || 'reader'}
          onChange={handleChange('sharePermission')}
          label="Share Permission"
        >
          <MenuItem value="reader">Reader</MenuItem>
          <MenuItem value="commenter">Commenter</MenuItem>
          <MenuItem value="writer">Writer</MenuItem>
          <MenuItem value="owner">Owner</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Share With"
        value={data.shareWith || ''}
        onChange={handleChange('shareWith')}
        placeholder="Email addresses (comma-separated)"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.convertToGoogleFormat || false}
            onChange={handleSwitchChange('convertToGoogleFormat')}
          />
        }
        label="Convert to Google Format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Query"
        multiline
        rows={2}
        value={data.query || ''}
        onChange={handleChange('query')}
        placeholder="Search query for listing files"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default GoogleDriveNode;
