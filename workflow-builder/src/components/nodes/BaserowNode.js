import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

const BaserowNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Baserow</Typography>

      <TextField
        fullWidth
        label="API Token"
        type="password"
        value={data.apiToken || ''}
        onChange={handleChange('apiToken')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Base URL"
        value={data.baseUrl || ''}
        onChange={handleChange('baseUrl')}
        placeholder="Your Baserow instance URL"
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'listRows'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="listRows">List Rows</MenuItem>
          <MenuItem value="getRow">Get Row</MenuItem>
          <MenuItem value="createRow">Create Row</MenuItem>
          <MenuItem value="updateRow">Update Row</MenuItem>
          <MenuItem value="deleteRow">Delete Row</MenuItem>
          <MenuItem value="listTables">List Tables</MenuItem>
          <MenuItem value="getTable">Get Table</MenuItem>
          <MenuItem value="createTable">Create Table</MenuItem>
          <MenuItem value="updateTable">Update Table</MenuItem>
          <MenuItem value="deleteTable">Delete Table</MenuItem>
          <MenuItem value="listFields">List Fields</MenuItem>
          <MenuItem value="getField">Get Field</MenuItem>
          <MenuItem value="createField">Create Field</MenuItem>
          <MenuItem value="updateField">Update Field</MenuItem>
          <MenuItem value="deleteField">Delete Field</MenuItem>
          <MenuItem value="listDatabases">List Databases</MenuItem>
          <MenuItem value="getDatabase">Get Database</MenuItem>
          <MenuItem value="createDatabase">Create Database</MenuItem>
          <MenuItem value="updateDatabase">Update Database</MenuItem>
          <MenuItem value="deleteDatabase">Delete Database</MenuItem>
          <MenuItem value="listViews">List Views</MenuItem>
          <MenuItem value="getView">Get View</MenuItem>
          <MenuItem value="createView">Create View</MenuItem>
          <MenuItem value="updateView">Update View</MenuItem>
          <MenuItem value="deleteView">Delete View</MenuItem>
          <MenuItem value="filterRows">Filter Rows</MenuItem>
          <MenuItem value="sortRows">Sort Rows</MenuItem>
          <MenuItem value="importCSV">Import CSV</MenuItem>
          <MenuItem value="exportCSV">Export CSV</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Database ID"
        value={data.databaseId || ''}
        onChange={handleChange('databaseId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Table ID"
        value={data.tableId || ''}
        onChange={handleChange('tableId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Row ID"
        value={data.rowId || ''}
        onChange={handleChange('rowId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Field ID"
        value={data.fieldId || ''}
        onChange={handleChange('fieldId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="View ID"
        value={data.viewId || ''}
        onChange={handleChange('viewId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Row Data"
        multiline
        rows={4}
        value={data.rowData || ''}
        onChange={handleChange('rowData')}
        placeholder="Row data in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Field Data"
        multiline
        rows={4}
        value={data.fieldData || ''}
        onChange={handleChange('fieldData')}
        placeholder="Field configuration in JSON format"
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
        label="CSV URL"
        value={data.csvUrl || ''}
        onChange={handleChange('csvUrl')}
        placeholder="URL of CSV file to import"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default BaserowNode;
