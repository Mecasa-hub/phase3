import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

const AirtableNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Airtable</Typography>

      <TextField
        fullWidth
        label="API Key"
        type="password"
        value={data.apiKey || ''}
        onChange={handleChange('apiKey')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Base ID"
        value={data.baseId || ''}
        onChange={handleChange('baseId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Table Name"
        value={data.tableName || ''}
        onChange={handleChange('tableName')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'listRecords'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="listRecords">List Records</MenuItem>
          <MenuItem value="getRecord">Get Record</MenuItem>
          <MenuItem value="createRecord">Create Record</MenuItem>
          <MenuItem value="updateRecord">Update Record</MenuItem>
          <MenuItem value="deleteRecord">Delete Record</MenuItem>
          <MenuItem value="replaceRecord">Replace Record</MenuItem>
          <MenuItem value="listBases">List Bases</MenuItem>
          <MenuItem value="getBase">Get Base</MenuItem>
          <MenuItem value="listTables">List Tables</MenuItem>
          <MenuItem value="getTable">Get Table</MenuItem>
          <MenuItem value="listFields">List Fields</MenuItem>
          <MenuItem value="getField">Get Field</MenuItem>
          <MenuItem value="createField">Create Field</MenuItem>
          <MenuItem value="updateField">Update Field</MenuItem>
          <MenuItem value="deleteField">Delete Field</MenuItem>
          <MenuItem value="listViews">List Views</MenuItem>
          <MenuItem value="getView">Get View</MenuItem>
          <MenuItem value="createView">Create View</MenuItem>
          <MenuItem value="updateView">Update View</MenuItem>
          <MenuItem value="deleteView">Delete View</MenuItem>
          <MenuItem value="bulkCreate">Bulk Create Records</MenuItem>
          <MenuItem value="bulkUpdate">Bulk Update Records</MenuItem>
          <MenuItem value="bulkDelete">Bulk Delete Records</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Record ID"
        value={data.recordId || ''}
        onChange={handleChange('recordId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Fields"
        multiline
        rows={4}
        value={data.fields || ''}
        onChange={handleChange('fields')}
        placeholder="Record fields in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Filter Formula"
        multiline
        rows={2}
        value={data.filterFormula || ''}
        onChange={handleChange('filterFormula')}
        placeholder="Airtable formula for filtering records"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Sort Field"
        value={data.sortField || ''}
        onChange={handleChange('sortField')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Sort Direction</InputLabel>
        <Select
          value={data.sortDirection || 'asc'}
          onChange={handleChange('sortDirection')}
          label="Sort Direction"
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="View Name"
        value={data.viewName || ''}
        onChange={handleChange('viewName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Field Name"
        value={data.fieldName || ''}
        onChange={handleChange('fieldName')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Field Type</InputLabel>
        <Select
          value={data.fieldType || 'singleLineText'}
          onChange={handleChange('fieldType')}
          label="Field Type"
        >
          <MenuItem value="singleLineText">Single Line Text</MenuItem>
          <MenuItem value="multilineText">Multiline Text</MenuItem>
          <MenuItem value="number">Number</MenuItem>
          <MenuItem value="singleSelect">Single Select</MenuItem>
          <MenuItem value="multipleSelect">Multiple Select</MenuItem>
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="dateTime">Date Time</MenuItem>
          <MenuItem value="checkbox">Checkbox</MenuItem>
          <MenuItem value="formula">Formula</MenuItem>
          <MenuItem value="rollup">Rollup</MenuItem>
          <MenuItem value="count">Count</MenuItem>
          <MenuItem value="lookup">Lookup</MenuItem>
          <MenuItem value="currency">Currency</MenuItem>
          <MenuItem value="percent">Percent</MenuItem>
          <MenuItem value="duration">Duration</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="url">URL</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="phone">Phone</MenuItem>
          <MenuItem value="attachment">Attachment</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Field Options"
        multiline
        rows={4}
        value={data.fieldOptions || ''}
        onChange={handleChange('fieldOptions')}
        placeholder="Field configuration in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Max Records"
        type="number"
        value={data.maxRecords || ''}
        onChange={handleChange('maxRecords')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Page Size"
        type="number"
        value={data.pageSize || ''}
        onChange={handleChange('pageSize')}
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default AirtableNode;
