import React from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel, Stack, IconButton } from '@mui/material';
import { CloudQueue as CloudIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const DropboxNode = ({ id, data, isConnectable, updateNodeData }) => {
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
        <CloudIcon sx={{ color: '#0061FF' }} />
        <Typography variant="subtitle2">Dropbox</Typography>
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
        label="Access Token"
        type="password"
        value={data.accessToken || ''}
        onChange={handleChange('accessToken')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'upload'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="upload">Upload File</MenuItem>
          <MenuItem value="download">Download File</MenuItem>
          <MenuItem value="delete">Delete File/Folder</MenuItem>
          <MenuItem value="move">Move File/Folder</MenuItem>
          <MenuItem value="copy">Copy File/Folder</MenuItem>
          <MenuItem value="createFolder">Create Folder</MenuItem>
          <MenuItem value="listFolder">List Folder Contents</MenuItem>
          <MenuItem value="search">Search Files</MenuItem>
          <MenuItem value="getMetadata">Get Metadata</MenuItem>
          <MenuItem value="createSharedLink">Create Shared Link</MenuItem>
          <MenuItem value="revokeSharedLink">Revoke Shared Link</MenuItem>
          <MenuItem value="getSharedLinks">Get Shared Links</MenuItem>
          <MenuItem value="getThumbnail">Get Thumbnail</MenuItem>
          <MenuItem value="getPreview">Get Preview</MenuItem>
          <MenuItem value="saveUrl">Save URL to Dropbox</MenuItem>
          <MenuItem value="uploadSession">Upload Large File</MenuItem>
          <MenuItem value="getFileHistory">Get File History</MenuItem>
          <MenuItem value="restore">Restore File</MenuItem>
          <MenuItem value="getFolderPermissions">Get Folder Permissions</MenuItem>
          <MenuItem value="updateFolderPermissions">Update Folder Permissions</MenuItem>
          <MenuItem value="addFolderMember">Add Folder Member</MenuItem>
          <MenuItem value="removeFolderMember">Remove Folder Member</MenuItem>
          <MenuItem value="getAccountInfo">Get Account Info</MenuItem>
          <MenuItem value="getSpaceUsage">Get Space Usage</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Path"
        value={data.path || ''}
        onChange={handleChange('path')}
        placeholder="/folder/file.txt"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="New Path"
        value={data.newPath || ''}
        onChange={handleChange('newPath')}
        placeholder="For move/copy operations"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="File Content"
        multiline
        rows={4}
        value={data.fileContent || ''}
        onChange={handleChange('fileContent')}
        placeholder="Content for text files"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="File URL"
        value={data.fileUrl || ''}
        onChange={handleChange('fileUrl')}
        placeholder="URL to save to Dropbox"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Search Query"
        value={data.searchQuery || ''}
        onChange={handleChange('searchQuery')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Member Email"
        value={data.memberEmail || ''}
        onChange={handleChange('memberEmail')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Access Level</InputLabel>
        <Select
          value={data.accessLevel || 'viewer'}
          onChange={handleChange('accessLevel')}
          label="Access Level"
        >
          <MenuItem value="viewer">Viewer</MenuItem>
          <MenuItem value="editor">Editor</MenuItem>
          <MenuItem value="owner">Owner</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Batch Size"
        type="number"
        value={data.batchSize || ''}
        onChange={handleChange('batchSize')}
        placeholder="For large file uploads"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.recursive || false}
            onChange={handleSwitchChange('recursive')}
          />
        }
        label="Recursive Operation"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.autoRename || false}
            onChange={handleSwitchChange('autoRename')}
          />
        }
        label="Auto Rename"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.includeDeleted || false}
            onChange={handleSwitchChange('includeDeleted')}
          />
        }
        label="Include Deleted Files"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.includeMediaInfo || false}
            onChange={handleSwitchChange('includeMediaInfo')}
          />
        }
        label="Include Media Info"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.includeSharedLinks || false}
            onChange={handleSwitchChange('includeSharedLinks')}
          />
        }
        label="Include Shared Links"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default DropboxNode;
