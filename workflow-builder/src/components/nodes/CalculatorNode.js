import React, { memo } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { Box, TextField, Typography, IconButton, Stack } from '@mui/material';
import { Calculate as CalculateIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

const CalculatorNode = ({ id, data, isConnectable }) => {
  const { setNodes, setEdges } = useReactFlow();

  const onDelete = () => {
    setNodes((nodes) => nodes.filter(node => node.id !== id));
    setEdges((edges) => edges.filter(edge => edge.source !== id && edge.target !== id));
  };

  return (
    <Box
      sx={{
        background: '#fff',
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #ddd',
        minWidth: '200px',
        position: 'relative'
      }}
    >
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
        <CalculateIcon sx={{ color: '#1976d2' }} />
        <Typography variant="subtitle2">Calculator</Typography>
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

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Value 1"
          variant="outlined"
          defaultValue={data.value1 || ''}
          sx={{ flex: 1 }}
          type="number"
        />
        
        <TextField
          label="Operation"
          select
          SelectProps={{ native: true }}
          variant="outlined"
          defaultValue={data.operation || '+'}
          sx={{ width: 80 }}
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">×</option>
          <option value="/">÷</option>
          <option value="%">%</option>
          <option value="**">^</option>
        </TextField>

        <TextField
          label="Value 2"
          variant="outlined"
          defaultValue={data.value2 || ''}
          sx={{ flex: 1 }}
          type="number"
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          label="Round to Decimals"
          variant="outlined"
          defaultValue={data.decimals || '2'}
          type="number"
          inputProps={{ min: 0, max: 10 }}
        />
      </Box>

      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ background: '#1976d2' }}
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ background: '#1976d2' }}
      />
    </Box>
  );
};

export default memo(CalculatorNode);
