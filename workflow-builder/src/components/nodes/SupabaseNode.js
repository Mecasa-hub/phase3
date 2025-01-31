import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

const SupabaseNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Supabase</Typography>

      <TextField
        fullWidth
        label="Project URL"
        value={data.projectUrl || ''}
        onChange={handleChange('projectUrl')}
        sx={{ mb: 2 }}
      />

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
          value={data.operation || 'select'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="select">Select Data</MenuItem>
          <MenuItem value="insert">Insert Data</MenuItem>
          <MenuItem value="update">Update Data</MenuItem>
          <MenuItem value="upsert">Upsert Data</MenuItem>
          <MenuItem value="delete">Delete Data</MenuItem>
          <MenuItem value="rpc">Call RPC Function</MenuItem>
          <MenuItem value="signUp">Sign Up User</MenuItem>
          <MenuItem value="signIn">Sign In User</MenuItem>
          <MenuItem value="signOut">Sign Out User</MenuItem>
          <MenuItem value="resetPassword">Reset Password</MenuItem>
          <MenuItem value="updateUser">Update User</MenuItem>
          <MenuItem value="deleteUser">Delete User</MenuItem>
          <MenuItem value="uploadFile">Upload File</MenuItem>
          <MenuItem value="downloadFile">Download File</MenuItem>
          <MenuItem value="deleteFile">Delete File</MenuItem>
          <MenuItem value="listBuckets">List Storage Buckets</MenuItem>
          <MenuItem value="createBucket">Create Storage Bucket</MenuItem>
          <MenuItem value="deleteBucket">Delete Storage Bucket</MenuItem>
          <MenuItem value="listFiles">List Files</MenuItem>
          <MenuItem value="moveFile">Move File</MenuItem>
          <MenuItem value="copyFile">Copy File</MenuItem>
          <MenuItem value="createSignedUrl">Create Signed URL</MenuItem>
          <MenuItem value="downloadPublicUrl">Get Public Download URL</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Table"
        value={data.table || ''}
        onChange={handleChange('table')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Select Columns"
        value={data.select || ''}
        onChange={handleChange('select')}
        placeholder="*,column1,column2"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Filter"
        multiline
        rows={3}
        value={data.filter || ''}
        onChange={handleChange('filter')}
        placeholder="Filter criteria in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Data"
        multiline
        rows={4}
        value={data.data || ''}
        onChange={handleChange('data')}
        placeholder="Data in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Function Name"
        value={data.functionName || ''}
        onChange={handleChange('functionName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Function Arguments"
        multiline
        rows={3}
        value={data.functionArgs || ''}
        onChange={handleChange('functionArgs')}
        placeholder="Function arguments in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Email"
        value={data.email || ''}
        onChange={handleChange('email')}
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

      <TextField
        fullWidth
        label="User Data"
        multiline
        rows={3}
        value={data.userData || ''}
        onChange={handleChange('userData')}
        placeholder="User data in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Bucket"
        value={data.bucket || ''}
        onChange={handleChange('bucket')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="File Path"
        value={data.filePath || ''}
        onChange={handleChange('filePath')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="File Content"
        multiline
        rows={3}
        value={data.fileContent || ''}
        onChange={handleChange('fileContent')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Content Type"
        value={data.contentType || ''}
        onChange={handleChange('contentType')}
        placeholder="application/json"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Expiry Time"
        type="number"
        value={data.expirySeconds || ''}
        onChange={handleChange('expirySeconds')}
        placeholder="URL expiry time in seconds"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default SupabaseNode;
