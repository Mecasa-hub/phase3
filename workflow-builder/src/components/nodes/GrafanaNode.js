import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const GrafanaNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Grafana</Typography>

      <TextField
        fullWidth
        label="URL"
        value={data.url || ''}
        onChange={handleChange('url')}
        placeholder="http://grafana.example.com"
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
          value={data.operation || 'createDashboard'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="createDashboard">Create Dashboard</MenuItem>
          <MenuItem value="updateDashboard">Update Dashboard</MenuItem>
          <MenuItem value="deleteDashboard">Delete Dashboard</MenuItem>
          <MenuItem value="getDashboard">Get Dashboard</MenuItem>
          <MenuItem value="listDashboards">List Dashboards</MenuItem>
          <MenuItem value="createFolder">Create Folder</MenuItem>
          <MenuItem value="updateFolder">Update Folder</MenuItem>
          <MenuItem value="deleteFolder">Delete Folder</MenuItem>
          <MenuItem value="getFolder">Get Folder</MenuItem>
          <MenuItem value="listFolders">List Folders</MenuItem>
          <MenuItem value="createAlert">Create Alert</MenuItem>
          <MenuItem value="updateAlert">Update Alert</MenuItem>
          <MenuItem value="deleteAlert">Delete Alert</MenuItem>
          <MenuItem value="getAlert">Get Alert</MenuItem>
          <MenuItem value="listAlerts">List Alerts</MenuItem>
          <MenuItem value="pauseAlert">Pause Alert</MenuItem>
          <MenuItem value="unpauseAlert">Unpause Alert</MenuItem>
          <MenuItem value="createDataSource">Create Data Source</MenuItem>
          <MenuItem value="updateDataSource">Update Data Source</MenuItem>
          <MenuItem value="deleteDataSource">Delete Data Source</MenuItem>
          <MenuItem value="getDataSource">Get Data Source</MenuItem>
          <MenuItem value="listDataSources">List Data Sources</MenuItem>
          <MenuItem value="createTeam">Create Team</MenuItem>
          <MenuItem value="updateTeam">Update Team</MenuItem>
          <MenuItem value="deleteTeam">Delete Team</MenuItem>
          <MenuItem value="getTeam">Get Team</MenuItem>
          <MenuItem value="listTeams">List Teams</MenuItem>
          <MenuItem value="addTeamMember">Add Team Member</MenuItem>
          <MenuItem value="removeTeamMember">Remove Team Member</MenuItem>
          <MenuItem value="createAnnotation">Create Annotation</MenuItem>
          <MenuItem value="updateAnnotation">Update Annotation</MenuItem>
          <MenuItem value="deleteAnnotation">Delete Annotation</MenuItem>
          <MenuItem value="getAnnotation">Get Annotation</MenuItem>
          <MenuItem value="listAnnotations">List Annotations</MenuItem>
          <MenuItem value="createPlaylist">Create Playlist</MenuItem>
          <MenuItem value="updatePlaylist">Update Playlist</MenuItem>
          <MenuItem value="deletePlaylist">Delete Playlist</MenuItem>
          <MenuItem value="getPlaylist">Get Playlist</MenuItem>
          <MenuItem value="listPlaylists">List Playlists</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Dashboard UID"
        value={data.dashboardUid || ''}
        onChange={handleChange('dashboardUid')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Dashboard JSON"
        multiline
        rows={4}
        value={data.dashboardJson || ''}
        onChange={handleChange('dashboardJson')}
        placeholder="Dashboard configuration in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Folder ID"
        value={data.folderId || ''}
        onChange={handleChange('folderId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Folder Title"
        value={data.folderTitle || ''}
        onChange={handleChange('folderTitle')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Alert Name"
        value={data.alertName || ''}
        onChange={handleChange('alertName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Alert Rule"
        multiline
        rows={4}
        value={data.alertRule || ''}
        onChange={handleChange('alertRule')}
        placeholder="Alert rule configuration in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Data Source Name"
        value={data.dataSourceName || ''}
        onChange={handleChange('dataSourceName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Data Source Type"
        value={data.dataSourceType || ''}
        onChange={handleChange('dataSourceType')}
        placeholder="prometheus, elasticsearch, etc."
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Team Name"
        value={data.teamName || ''}
        onChange={handleChange('teamName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Email"
        value={data.email || ''}
        onChange={handleChange('email')}
        placeholder="For team member operations"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Annotation Text"
        multiline
        rows={2}
        value={data.annotationText || ''}
        onChange={handleChange('annotationText')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Tags"
        value={data.tags || ''}
        onChange={handleChange('tags')}
        placeholder="Comma-separated tags"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.overwrite || false}
            onChange={handleSwitchChange('overwrite')}
          />
        }
        label="Overwrite Existing"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.isPublic || false}
            onChange={handleSwitchChange('isPublic')}
          />
        }
        label="Public Access"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default GrafanaNode;
