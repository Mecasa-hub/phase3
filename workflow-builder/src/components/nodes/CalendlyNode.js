import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

const CalendlyNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Calendly</Typography>

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
          value={data.operation || 'listEvents'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="listEvents">List Events</MenuItem>
          <MenuItem value="getEvent">Get Event</MenuItem>
          <MenuItem value="createEvent">Create Event</MenuItem>
          <MenuItem value="cancelEvent">Cancel Event</MenuItem>
          <MenuItem value="listEventTypes">List Event Types</MenuItem>
          <MenuItem value="getEventType">Get Event Type</MenuItem>
          <MenuItem value="createEventType">Create Event Type</MenuItem>
          <MenuItem value="updateEventType">Update Event Type</MenuItem>
          <MenuItem value="deleteEventType">Delete Event Type</MenuItem>
          <MenuItem value="listScheduledEvents">List Scheduled Events</MenuItem>
          <MenuItem value="getScheduledEvent">Get Scheduled Event</MenuItem>
          <MenuItem value="listInvitees">List Invitees</MenuItem>
          <MenuItem value="getInvitee">Get Invitee</MenuItem>
          <MenuItem value="listUsers">List Users</MenuItem>
          <MenuItem value="getUser">Get User</MenuItem>
          <MenuItem value="getUserAvailability">Get User Availability</MenuItem>
          <MenuItem value="listUserBusyTimes">List User Busy Times</MenuItem>
          <MenuItem value="listWebhooks">List Webhooks</MenuItem>
          <MenuItem value="createWebhook">Create Webhook</MenuItem>
          <MenuItem value="deleteWebhook">Delete Webhook</MenuItem>
          <MenuItem value="listOrganizations">List Organizations</MenuItem>
          <MenuItem value="getOrganization">Get Organization</MenuItem>
          <MenuItem value="listMemberships">List Memberships</MenuItem>
          <MenuItem value="getMembership">Get Membership</MenuItem>
          <MenuItem value="listSchedulingLinks">List Scheduling Links</MenuItem>
          <MenuItem value="createSchedulingLink">Create Scheduling Link</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Event UUID"
        value={data.eventUuid || ''}
        onChange={handleChange('eventUuid')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Event Type UUID"
        value={data.eventTypeUuid || ''}
        onChange={handleChange('eventTypeUuid')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="User URI"
        value={data.userUri || ''}
        onChange={handleChange('userUri')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Organization URI"
        value={data.organizationUri || ''}
        onChange={handleChange('organizationUri')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Start Time"
        type="datetime-local"
        value={data.startTime || ''}
        onChange={handleChange('startTime')}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="End Time"
        type="datetime-local"
        value={data.endTime || ''}
        onChange={handleChange('endTime')}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Event Name"
        value={data.eventName || ''}
        onChange={handleChange('eventName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Event Description"
        multiline
        rows={3}
        value={data.eventDescription || ''}
        onChange={handleChange('eventDescription')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Location"
        value={data.location || ''}
        onChange={handleChange('location')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Duration"
        type="number"
        value={data.duration || ''}
        onChange={handleChange('duration')}
        placeholder="Duration in minutes"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Invitee Email"
        value={data.inviteeEmail || ''}
        onChange={handleChange('inviteeEmail')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Invitee Name"
        value={data.inviteeName || ''}
        onChange={handleChange('inviteeName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Webhook URL"
        value={data.webhookUrl || ''}
        onChange={handleChange('webhookUrl')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Webhook Events"
        value={data.webhookEvents || ''}
        onChange={handleChange('webhookEvents')}
        placeholder="Comma-separated event types"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Scheduling Link Data"
        multiline
        rows={4}
        value={data.schedulingLinkData || ''}
        onChange={handleChange('schedulingLinkData')}
        placeholder="Scheduling link configuration in JSON format"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default CalendlyNode;
