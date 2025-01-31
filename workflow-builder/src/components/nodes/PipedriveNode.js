import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const PipedriveNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Pipedrive</Typography>

      <TextField
        fullWidth
        label="API Token"
        type="password"
        value={data.apiToken || ''}
        onChange={handleChange('apiToken')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'createDeal'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="createDeal">Create Deal</MenuItem>
          <MenuItem value="updateDeal">Update Deal</MenuItem>
          <MenuItem value="deleteDeal">Delete Deal</MenuItem>
          <MenuItem value="getDeal">Get Deal</MenuItem>
          <MenuItem value="listDeals">List Deals</MenuItem>
          <MenuItem value="searchDeals">Search Deals</MenuItem>
          <MenuItem value="createPerson">Create Person</MenuItem>
          <MenuItem value="updatePerson">Update Person</MenuItem>
          <MenuItem value="deletePerson">Delete Person</MenuItem>
          <MenuItem value="getPerson">Get Person</MenuItem>
          <MenuItem value="listPersons">List Persons</MenuItem>
          <MenuItem value="searchPersons">Search Persons</MenuItem>
          <MenuItem value="createOrganization">Create Organization</MenuItem>
          <MenuItem value="updateOrganization">Update Organization</MenuItem>
          <MenuItem value="deleteOrganization">Delete Organization</MenuItem>
          <MenuItem value="getOrganization">Get Organization</MenuItem>
          <MenuItem value="listOrganizations">List Organizations</MenuItem>
          <MenuItem value="searchOrganizations">Search Organizations</MenuItem>
          <MenuItem value="createActivity">Create Activity</MenuItem>
          <MenuItem value="updateActivity">Update Activity</MenuItem>
          <MenuItem value="deleteActivity">Delete Activity</MenuItem>
          <MenuItem value="getActivity">Get Activity</MenuItem>
          <MenuItem value="listActivities">List Activities</MenuItem>
          <MenuItem value="createNote">Create Note</MenuItem>
          <MenuItem value="updateNote">Update Note</MenuItem>
          <MenuItem value="deleteNote">Delete Note</MenuItem>
          <MenuItem value="getNote">Get Note</MenuItem>
          <MenuItem value="listNotes">List Notes</MenuItem>
          <MenuItem value="createProduct">Create Product</MenuItem>
          <MenuItem value="updateProduct">Update Product</MenuItem>
          <MenuItem value="deleteProduct">Delete Product</MenuItem>
          <MenuItem value="getProduct">Get Product</MenuItem>
          <MenuItem value="listProducts">List Products</MenuItem>
          <MenuItem value="createPipeline">Create Pipeline</MenuItem>
          <MenuItem value="updatePipeline">Update Pipeline</MenuItem>
          <MenuItem value="deletePipeline">Delete Pipeline</MenuItem>
          <MenuItem value="getPipeline">Get Pipeline</MenuItem>
          <MenuItem value="listPipelines">List Pipelines</MenuItem>
          <MenuItem value="createStage">Create Stage</MenuItem>
          <MenuItem value="updateStage">Update Stage</MenuItem>
          <MenuItem value="deleteStage">Delete Stage</MenuItem>
          <MenuItem value="getStage">Get Stage</MenuItem>
          <MenuItem value="listStages">List Stages</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="ID"
        value={data.id || ''}
        onChange={handleChange('id')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Title"
        value={data.title || ''}
        onChange={handleChange('title')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Value"
        type="number"
        value={data.value || ''}
        onChange={handleChange('value')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Currency"
        value={data.currency || ''}
        onChange={handleChange('currency')}
        placeholder="USD, EUR, etc."
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Pipeline ID"
        value={data.pipelineId || ''}
        onChange={handleChange('pipelineId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Stage ID"
        value={data.stageId || ''}
        onChange={handleChange('stageId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Person Name"
        value={data.personName || ''}
        onChange={handleChange('personName')}
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
        label="Phone"
        value={data.phone || ''}
        onChange={handleChange('phone')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Organization Name"
        value={data.organizationName || ''}
        onChange={handleChange('organizationName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Activity Type"
        value={data.activityType || ''}
        onChange={handleChange('activityType')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Due Date"
        type="date"
        value={data.dueDate || ''}
        onChange={handleChange('dueDate')}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Note Content"
        multiline
        rows={4}
        value={data.noteContent || ''}
        onChange={handleChange('noteContent')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Custom Fields"
        multiline
        rows={4}
        value={data.customFields || ''}
        onChange={handleChange('customFields')}
        placeholder="Custom fields in JSON format"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.visible || true}
            onChange={handleSwitchChange('visible')}
          />
        }
        label="Visible to Everyone"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.done || false}
            onChange={handleSwitchChange('done')}
          />
        }
        label="Mark as Done"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default PipedriveNode;
