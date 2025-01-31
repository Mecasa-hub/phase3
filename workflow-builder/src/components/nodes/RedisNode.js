import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const RedisNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Redis</Typography>

      <TextField
        fullWidth
        label="Host"
        value={data.host || ''}
        onChange={handleChange('host')}
        placeholder="Redis server host"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Port"
        value={data.port || ''}
        onChange={handleChange('port')}
        placeholder="6379"
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
        label="Database"
        type="number"
        value={data.database || ''}
        onChange={handleChange('database')}
        placeholder="0"
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'get'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="get">Get</MenuItem>
          <MenuItem value="set">Set</MenuItem>
          <MenuItem value="del">Delete</MenuItem>
          <MenuItem value="exists">Exists</MenuItem>
          <MenuItem value="incr">Increment</MenuItem>
          <MenuItem value="decr">Decrement</MenuItem>
          <MenuItem value="expire">Set Expiry</MenuItem>
          <MenuItem value="ttl">Get TTL</MenuItem>
          <MenuItem value="persist">Remove Expiry</MenuItem>
          <MenuItem value="keys">Get Keys</MenuItem>
          <MenuItem value="scan">Scan Keys</MenuItem>
          <MenuItem value="hget">Hash Get</MenuItem>
          <MenuItem value="hset">Hash Set</MenuItem>
          <MenuItem value="hdel">Hash Delete</MenuItem>
          <MenuItem value="hgetall">Hash Get All</MenuItem>
          <MenuItem value="hincrby">Hash Increment</MenuItem>
          <MenuItem value="lpush">List Push Left</MenuItem>
          <MenuItem value="rpush">List Push Right</MenuItem>
          <MenuItem value="lpop">List Pop Left</MenuItem>
          <MenuItem value="rpop">List Pop Right</MenuItem>
          <MenuItem value="lrange">List Range</MenuItem>
          <MenuItem value="llen">List Length</MenuItem>
          <MenuItem value="sadd">Set Add</MenuItem>
          <MenuItem value="srem">Set Remove</MenuItem>
          <MenuItem value="smembers">Set Members</MenuItem>
          <MenuItem value="sismember">Set Is Member</MenuItem>
          <MenuItem value="scard">Set Card</MenuItem>
          <MenuItem value="zadd">Sorted Set Add</MenuItem>
          <MenuItem value="zrem">Sorted Set Remove</MenuItem>
          <MenuItem value="zrange">Sorted Set Range</MenuItem>
          <MenuItem value="zrank">Sorted Set Rank</MenuItem>
          <MenuItem value="zscore">Sorted Set Score</MenuItem>
          <MenuItem value="publish">Publish Message</MenuItem>
          <MenuItem value="subscribe">Subscribe Channel</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Key"
        value={data.key || ''}
        onChange={handleChange('key')}
        placeholder="Redis key"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Value"
        multiline
        rows={3}
        value={data.value || ''}
        onChange={handleChange('value')}
        placeholder="Value to store"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Field"
        value={data.field || ''}
        onChange={handleChange('field')}
        placeholder="Hash field name"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Score"
        type="number"
        value={data.score || ''}
        onChange={handleChange('score')}
        placeholder="Sorted set score"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Channel"
        value={data.channel || ''}
        onChange={handleChange('channel')}
        placeholder="Pub/Sub channel name"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Pattern"
        value={data.pattern || ''}
        onChange={handleChange('pattern')}
        placeholder="Key pattern for scan/keys"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="TTL (seconds)"
        type="number"
        value={data.ttl || ''}
        onChange={handleChange('ttl')}
        placeholder="Time to live in seconds"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.nx || false}
            onChange={handleSwitchChange('nx')}
          />
        }
        label="Only Set if Not Exists (NX)"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.xx || false}
            onChange={handleSwitchChange('xx')}
          />
        }
        label="Only Set if Exists (XX)"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default RedisNode;
