import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const RabbitMQNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>RabbitMQ</Typography>

      <TextField
        fullWidth
        label="Host"
        value={data.host || ''}
        onChange={handleChange('host')}
        placeholder="localhost"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Port"
        value={data.port || ''}
        onChange={handleChange('port')}
        placeholder="5672"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Username"
        value={data.username || ''}
        onChange={handleChange('username')}
        placeholder="guest"
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
        label="Virtual Host"
        value={data.virtualHost || ''}
        onChange={handleChange('virtualHost')}
        placeholder="/"
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'publish'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="publish">Publish Message</MenuItem>
          <MenuItem value="consume">Consume Messages</MenuItem>
          <MenuItem value="createExchange">Create Exchange</MenuItem>
          <MenuItem value="deleteExchange">Delete Exchange</MenuItem>
          <MenuItem value="createQueue">Create Queue</MenuItem>
          <MenuItem value="deleteQueue">Delete Queue</MenuItem>
          <MenuItem value="bindQueue">Bind Queue</MenuItem>
          <MenuItem value="unbindQueue">Unbind Queue</MenuItem>
          <MenuItem value="purgeQueue">Purge Queue</MenuItem>
          <MenuItem value="getQueueInfo">Get Queue Info</MenuItem>
          <MenuItem value="listQueues">List Queues</MenuItem>
          <MenuItem value="listExchanges">List Exchanges</MenuItem>
          <MenuItem value="listBindings">List Bindings</MenuItem>
          <MenuItem value="listChannels">List Channels</MenuItem>
          <MenuItem value="listConnections">List Connections</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Exchange"
        value={data.exchange || ''}
        onChange={handleChange('exchange')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Exchange Type</InputLabel>
        <Select
          value={data.exchangeType || 'direct'}
          onChange={handleChange('exchangeType')}
          label="Exchange Type"
        >
          <MenuItem value="direct">Direct</MenuItem>
          <MenuItem value="fanout">Fanout</MenuItem>
          <MenuItem value="topic">Topic</MenuItem>
          <MenuItem value="headers">Headers</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Queue"
        value={data.queue || ''}
        onChange={handleChange('queue')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Routing Key"
        value={data.routingKey || ''}
        onChange={handleChange('routingKey')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Message"
        multiline
        rows={4}
        value={data.message || ''}
        onChange={handleChange('message')}
        placeholder="Message content"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Headers"
        multiline
        rows={4}
        value={data.headers || ''}
        onChange={handleChange('headers')}
        placeholder="Headers in JSON format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Arguments"
        multiline
        rows={4}
        value={data.arguments || ''}
        onChange={handleChange('arguments')}
        placeholder="Arguments in JSON format"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.durable || false}
            onChange={handleSwitchChange('durable')}
          />
        }
        label="Durable"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.autoDelete || false}
            onChange={handleSwitchChange('autoDelete')}
          />
        }
        label="Auto Delete"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.exclusive || false}
            onChange={handleSwitchChange('exclusive')}
          />
        }
        label="Exclusive"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.noWait || false}
            onChange={handleSwitchChange('noWait')}
          />
        }
        label="No Wait"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default RabbitMQNode;
