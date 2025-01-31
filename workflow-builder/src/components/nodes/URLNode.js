import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Handle, Position, useReactFlow } from 'reactflow';
import { Box, TextField, Typography, IconButton, Stack, CircularProgress } from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';

const URLNode = ({ id, data, isConnectable }) => {
  const [loading, setLoading] = useState(false);
  const { setNodes, setEdges } = useReactFlow();

  const handleURLChange = (event) => {
    const newUrl = event.target.value;
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, url: newUrl, error: validateURL(newUrl) } }
          : node
      )
    );
  };

  const handleFormatChange = (event) => {
    const newFormat = event.target.value;
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, outputFormat: newFormat } }
          : node
      )
    );
  };

  const validateURL = (url) => {
    if (!url) return 'URL is required';
    try {
      new URL(url);
      return '';
    } catch (error) {
      return 'Invalid URL format';
    }
  };

  const onDelete = () => {
    setNodes((nodes) => nodes.filter(node => node.id !== id));
    setEdges((edges) => edges.filter(edge => edge.source !== id && edge.target !== id));
  };

  return (
    <Box
      sx={{
        background: '#fff',
        padding: '8px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        borderLeft: '3px solid #4CAF50',
        width: '250px',
        fontSize: '12px'
      }}
    >
      <Stack 
        direction="row" 
        spacing={1} 
        alignItems="center" 
        sx={{ 
          mb: 1,
          pb: 1,
          borderBottom: '1px solid #f0f0f0'
        }}
      >
        <LinkIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontSize: '12px',
            fontWeight: 500,
            flex: 1
          }}
        >
          URL Fetch
        </Typography>
        <IconButton 
          size="small" 
          onClick={onDelete}
          sx={{ 
            padding: '2px',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
          }}
        >
          <DeleteIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Stack>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, position: 'relative' }}>
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 1,
            }}
          >
            <CircularProgress size={20} />
          </Box>
        )}
        
        <TextField
          size="small"
          placeholder="Enter URL..."
          value={data.url || ''}
          onChange={handleURLChange}
          error={Boolean(data.error)}
          helperText={data.error}
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: '12px',
              backgroundColor: '#f5f5f5'
            },
            '& .MuiFormHelperText-root': {
              fontSize: '10px',
              marginTop: '2px'
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                size="small"
                onClick={async () => {
                  if (!data.url || data.error) return;
                  setLoading(true);
                  try {
                    const response = await fetch(data.url);
                    let content;
                    switch (data.outputFormat) {
                      case 'json':
                        content = await response.json();
                        break;
                      case 'html':
                        content = await response.text();
                        break;
                      default:
                        content = await response.text();
                    }
                    setNodes((nodes) =>
                      nodes.map((node) =>
                        node.id === id
                          ? {
                              ...node,
                              data: {
                                ...node.data,
                                content,
                                fetchError: null,
                              },
                            }
                          : node
                      )
                    );
                  } catch (error) {
                    setNodes((nodes) =>
                      nodes.map((node) =>
                        node.id === id
                          ? {
                              ...node,
                              data: {
                                ...node.data,
                                fetchError: error.message,
                              },
                            }
                          : node
                      )
                    );
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={!data.url || Boolean(data.error)}
                sx={{ 
                  padding: '2px',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                }}
              >
                <RefreshIcon sx={{ fontSize: 16 }} />
              </IconButton>
            ),
          }}
        />

        <TextField
          select
          size="small"
          SelectProps={{ native: true }}
          value={data.outputFormat || 'text'}
          onChange={handleFormatChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: '12px',
              backgroundColor: '#f5f5f5'
            }
          }}
        >
          <option value="text">Text</option>
          <option value="json">JSON</option>
          <option value="html">HTML</option>
        </TextField>

        {data.fetchError && (
          <Typography 
            color="error" 
            sx={{ 
              fontSize: '10px',
              mt: 0.5 
            }}
          >
            Error: {data.fetchError}
          </Typography>
        )}

        {data.content && !data.fetchError && (
          <Box sx={{ mt: 0.5 }}>
            <Typography sx={{ fontSize: '10px', color: 'text.secondary' }}>
              Preview:
            </Typography>
            <Box
              sx={{
                mt: 0.5,
                p: 1,
                borderRadius: 1,
                bgcolor: '#f5f5f5',
                fontSize: '11px',
                maxHeight: '80px',
                overflow: 'auto',
                wordBreak: 'break-word',
                '& pre': { margin: 0, fontSize: '11px' }
              }}
            >
              {data.outputFormat === 'json' ? (
                <pre>{JSON.stringify(data.content, null, 2)}</pre>
              ) : (
                data.content.toString().substring(0, 200) + 
                (data.content.toString().length > 200 ? '...' : '')
              )}
            </Box>
          </Box>
        )}
      </Box>

      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ background: '#4CAF50', width: 8, height: 8 }}
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ background: '#4CAF50', width: 8, height: 8 }}
      />
    </Box>
  );
};

URLNode.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    url: PropTypes.string,
    outputFormat: PropTypes.oneOf(['text', 'json', 'html']),
    error: PropTypes.string,
    content: PropTypes.any,
    fetchError: PropTypes.string,
  }).isRequired,
  isConnectable: PropTypes.bool,
};

URLNode.defaultProps = {
  isConnectable: true,
};

export default memo(URLNode);
