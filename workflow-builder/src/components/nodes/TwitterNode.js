import React, { useState } from 'react';
import { Handle, useReactFlow } from 'reactflow';
import { 
  Box, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Typography, 
  Switch, 
  FormControlLabel, 
  Divider, 
  ListSubheader, 
  Stack, 
  IconButton,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import XLogo from './XLogo';
import DeleteIcon from '@mui/icons-material/Delete';

const TwitterNode = ({ id, data, isConnectable }) => {
  const [expanded, setExpanded] = useState('authentication');
  const [mappingDialogOpen, setMappingDialogOpen] = useState(false);
  const [selectedField, setSelectedField] = useState('');
  const { setNodes, setEdges, getNode, getEdges } = useReactFlow();

  const getSourceNode = () => {
    const edges = getEdges();
    const targetEdge = edges.find(edge => edge.target === id);
    if (!targetEdge) return null;
    return getNode(targetEdge.source);
  };

  const handleOpenMapping = (field) => {
    setSelectedField(field);
    setMappingDialogOpen(true);
  };

  const handleCloseMapping = () => {
    setMappingDialogOpen(false);
    setSelectedField('');
  };

  const handleMapField = (sourceField) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              mappings: {
                ...node.data.mappings,
                [selectedField]: sourceField
              }
            }
          };
        }
        return node;
      })
    );
    handleCloseMapping();
  };

  const handleRemoveMapping = (field) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          const newMappings = { ...node.data.mappings };
          delete newMappings[field];
          return {
            ...node,
            data: {
              ...node.data,
              mappings: newMappings
            }
          };
        }
        return node;
      })
    );
  };

  const renderMappingButton = (field, label) => {
    const sourceNode = getSourceNode();
    const mapping = data.mappings?.[field];
    
    if (!sourceNode) return null;

    return (
      <Stack direction="row" spacing={1} alignItems="center">
        {mapping ? (
          <Chip
            icon={<LinkIcon />}
            label={`Mapped to: ${mapping}`}
            onDelete={() => handleRemoveMapping(field)}
            color="primary"
            size="small"
          />
        ) : (
          <Button
            startIcon={<LinkIcon />}
            size="small"
            onClick={() => handleOpenMapping(field)}
            sx={{ 
              fontSize: '0.75rem',
              textTransform: 'none',
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(29, 161, 242, 0.08)'
              }
            }}
          >
            Map from previous node
          </Button>
        )}
      </Stack>
    );
  };
  
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const validateField = (field, value) => {
    switch(field) {
      case 'apiKey':
      case 'apiSecret':
      case 'accessToken':
      case 'accessTokenSecret':
        return value?.length > 0;
      case 'tweetText':
        return value?.length > 0 && value?.length <= 280;
      case 'tweetId':
        return /^\d+$/.test(value) || value === '';
      case 'username':
        return /^[A-Za-z0-9_]{1,15}$/.test(value) || value === '';
      default:
        return true;
    }
  };

  const getFieldError = (field, value) => {
    if (!value) return '';
    switch(field) {
      case 'tweetText':
        if (value.length > 280) return 'Tweet exceeds 280 characters';
        break;
      case 'tweetId':
        if (!/^\d+$/.test(value)) return 'Invalid Tweet ID format';
        break;
      case 'username':
        if (!/^[A-Za-z0-9_]{1,15}$/.test(value)) return 'Invalid username format';
        break;
    }
    return '';
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          const newData = { ...node.data, [field]: value };
          if (field === 'operation') {
            newData.actionType = getActionType(value);
          }
          return { ...node, data: newData };
        }
        return node;
      })
    );
  };

  const getActionType = (operation) => {
    const actionMap = {
      'postTweet': 'TWITTER_POST_TWEET',
      'postReply': 'TWITTER_POST_REPLY',
      'deleteTweet': 'TWITTER_DELETE_TWEET',
      'retweet': 'TWITTER_RETWEET',
      'unretweet': 'TWITTER_UNRETWEET',
      'like': 'TWITTER_LIKE',
      'unlike': 'TWITTER_UNLIKE',
      'follow': 'TWITTER_FOLLOW',
      'unfollow': 'TWITTER_UNFOLLOW',
      'getUserInfo': 'TWITTER_GET_USER_INFO',
      'getTweet': 'TWITTER_GET_TWEET',
      'searchTweets': 'TWITTER_SEARCH_TWEETS'
    };
    return actionMap[operation] || '';
  };

  const handleSwitchChange = (field) => (event) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, [field]: event.target.checked } }
          : node
      )
    );
  };

  const onDelete = (e) => {
    e.stopPropagation();
    setNodes((nodes) => nodes.filter(node => node.id !== id));
    setEdges((edges) => edges.filter(edge => edge.source !== id && edge.target !== id));
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
        padding: '12px',
        borderRadius: '12px',
        border: '1px solid #e1e4e8',
        minWidth: '300px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Handle 
        type="target" 
        position="top" 
        isConnectable={isConnectable}
        style={{ background: '#1DA1F2' }}
      />
      
      <Stack 
        direction="row" 
        spacing={1} 
        alignItems="center" 
        sx={{ 
          mb: 1.5,
          pb: 1,
          borderBottom: '1px solid #e1e4e8',
          pr: 4
        }}
      >
        <XLogo sx={{ color: '#000000' }} />
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 600,
            color: '#14171A'
          }}
        >
          X (Twitter)
        </Typography>
        {(!data.apiKey || !data.apiSecret || !data.accessToken || !data.accessTokenSecret) && (
          <Tooltip title="Authentication credentials required">
            <ErrorOutlineIcon color="error" sx={{ ml: 1 }} />
          </Tooltip>
        )}
      </Stack>

      <IconButton 
        size="small" 
        onClick={onDelete}
        sx={{ 
          position: 'absolute',
          top: 12,
          right: 12,
          bgcolor: 'rgba(0,0,0,0.04)',
          '&:hover': { 
            bgcolor: 'rgba(244,33,46,0.1)',
            color: '#F4212E'
          },
          transition: 'all 0.2s ease'
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>

      <Dialog 
        open={mappingDialogOpen} 
        onClose={handleCloseMapping}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Map {selectedField} from Previous Node
        </DialogTitle>
        <DialogContent>
          <List>
            {getSourceNode()?.data && Object.keys(getSourceNode().data).map((field) => (
              <ListItem 
                key={field}
                button
                onClick={() => handleMapField(field)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(29, 161, 242, 0.08)'
                  }
                }}
              >
                <ListItemText 
                  primary={field}
                  secondary={`Value: ${getSourceNode().data[field]}`}
                />
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    size="small"
                    onClick={() => handleMapField(field)}
                  >
                    <LinkIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMapping}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Accordion 
        expanded={expanded === 'authentication'} 
        onChange={handleAccordionChange('authentication')}
        sx={{ mb: 1, boxShadow: 'none', '&:before': { display: 'none' } }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ 
            bgcolor: 'rgba(0,0,0,0.02)',
            borderRadius: 1,
            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
          }}
        >
          <Typography variant="subtitle2">Authentication</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="API Key"
              type="password"
              value={data.apiKey || ''}
              onChange={handleChange('apiKey')}
              error={!validateField('apiKey', data.apiKey)}
              helperText={!validateField('apiKey', data.apiKey) ? 'Required' : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Your X API Key from the Developer Portal">
                      <HelpOutlineIcon fontSize="small" sx={{ color: 'action.active' }} />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="API Secret"
              type="password"
              value={data.apiSecret || ''}
              onChange={handleChange('apiSecret')}
              error={!validateField('apiSecret', data.apiSecret)}
              helperText={!validateField('apiSecret', data.apiSecret) ? 'Required' : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Your X API Secret from the Developer Portal">
                      <HelpOutlineIcon fontSize="small" sx={{ color: 'action.active' }} />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Access Token"
              type="password"
              value={data.accessToken || ''}
              onChange={handleChange('accessToken')}
              error={!validateField('accessToken', data.accessToken)}
              helperText={!validateField('accessToken', data.accessToken) ? 'Required' : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Your X Access Token">
                      <HelpOutlineIcon fontSize="small" sx={{ color: 'action.active' }} />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Access Token Secret"
              type="password"
              value={data.accessTokenSecret || ''}
              onChange={handleChange('accessTokenSecret')}
              error={!validateField('accessTokenSecret', data.accessTokenSecret)}
              helperText={!validateField('accessTokenSecret', data.accessTokenSecret) ? 'Required' : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Your X Access Token Secret">
                      <HelpOutlineIcon fontSize="small" sx={{ color: 'action.active' }} />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      <FormControl 
        fullWidth 
        sx={{ 
          mb: 1.5,
          '& .MuiInputLabel-root': {
            color: '#1DA1F2',
            fontWeight: 500
          },
          '& .MuiSelect-select': {
            cursor: 'pointer'
          },
          '& .MuiOutlinedInput-root': {
            cursor: 'pointer',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1DA1F2'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1DA1F2'
            }
          }
        }}
      >
        <InputLabel>Select Operation ↓</InputLabel>
        <Select
          value={data.operation || 'postTweet'}
          onChange={handleChange('operation')}
          label="Operation"
          MenuProps={{
            disablePortal: false,
            PaperProps: {
              sx: {
                maxHeight: 'none',
                width: '250px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                zIndex: 9999,
                position: 'absolute',
                top: '100%',
                left: 0,
                '& .MuiMenuItem-root': {
                  padding: '8px 16px',
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  '&:hover': {
                    backgroundColor: '#f0f7ff'
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#e3f2fd',
                    '&:hover': {
                      backgroundColor: '#e3f2fd'
                    }
                  },
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                },
                '& .MuiListSubheader-root': {
                  backgroundColor: '#1DA1F2',
                  lineHeight: '32px',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  color: '#ffffff',
                  padding: '4px 16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                },
                '& .MuiDivider-root': {
                  margin: '4px 0',
                  borderColor: '#e0e0e0'
                }
              }
            }
          }}
        >
          <ListSubheader>Tweet Operations</ListSubheader>
          <MenuItem value="postTweet">📝 Post Tweet</MenuItem>
          <MenuItem value="postReply">↩️ Post Reply</MenuItem>
          <MenuItem value="postThread">🧵 Post Thread</MenuItem>
          <MenuItem value="deleteTweet">🗑️ Delete Tweet</MenuItem>
          <MenuItem value="retweet">🔄 Retweet</MenuItem>
          <MenuItem value="unretweet">🔙 Unretweet</MenuItem>
          <MenuItem value="like">❤️ Like Tweet</MenuItem>
          <MenuItem value="unlike">💔 Unlike Tweet</MenuItem>
          
          <Divider />
          <ListSubheader>User Operations</ListSubheader>
          <MenuItem value="follow">👥 Follow User</MenuItem>
          <MenuItem value="unfollow">👤 Unfollow User</MenuItem>
          <MenuItem value="getUserInfo">i️ Get User Info</MenuItem>
          <MenuItem value="getTweet">📄 Get Tweet</MenuItem>
          <MenuItem value="searchTweets">🔍 Search Tweets</MenuItem>
          <MenuItem value="getUserTimeline">📱 Get User Timeline</MenuItem>
          <MenuItem value="getFollowers">👥 Get Followers</MenuItem>
          <MenuItem value="getFollowing">👥 Get Following</MenuItem>
        </Select>
      </FormControl>

      <Accordion 
        expanded={expanded === 'mapping'} 
        onChange={handleAccordionChange('mapping')}
        sx={{ mb: 1, boxShadow: 'none', '&:before': { display: 'none' } }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ 
            bgcolor: 'rgba(29, 161, 242, 0.08)',
            borderRadius: 1,
            '&:hover': { bgcolor: 'rgba(29, 161, 242, 0.12)' }
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <LinkIcon sx={{ color: '#1DA1F2', fontSize: '1.2rem' }} />
            <Typography variant="subtitle2" sx={{ color: '#1DA1F2' }}>Data Mapping</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Map data from previous nodes (e.g., AI-generated content) to Twitter fields:
            </Typography>
            
            <Stack spacing={1}>
              <Typography variant="caption" color="text.secondary">Tweet Content</Typography>
              {renderMappingButton('tweetText', 'Tweet Text')}
            </Stack>

            <Stack spacing={1}>
              <Typography variant="caption" color="text.secondary">Media</Typography>
              {renderMappingButton('mediaUrls', 'Media URLs')}
            </Stack>

            <Stack spacing={1}>
              <Typography variant="caption" color="text.secondary">Interaction</Typography>
              {renderMappingButton('tweetId', 'Tweet ID')}
              {renderMappingButton('username', 'Username')}
            </Stack>

            <Stack spacing={1}>
              <Typography variant="caption" color="text.secondary">Search</Typography>
              {renderMappingButton('searchQuery', 'Search Query')}
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion 
        expanded={expanded === 'content'} 
        onChange={handleAccordionChange('content')}
        sx={{ mb: 1, boxShadow: 'none', '&:before': { display: 'none' } }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ 
            bgcolor: 'rgba(0,0,0,0.02)',
            borderRadius: 1,
            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
          }}
        >
          <Typography variant="subtitle2">Content</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <TextField
                  fullWidth
                  label="Tweet Text"
                  multiline
                  rows={2}
                  value={data.tweetText || ''}
                  onChange={handleChange('tweetText')}
                  placeholder="Enter tweet content or map from AI agent"
                  error={!validateField('tweetText', data.tweetText)}
                  helperText={
                    getFieldError('tweetText', data.tweetText) || 
                    `${(data.tweetText || '').length}/280 characters`
                  }
                  InputProps={{
                    endAdornment: data.mappings?.tweetText && (
                      <InputAdornment position="end">
                        <Chip
                          size="small"
                          icon={<LinkIcon />}
                          label={`Mapped: ${data.mappings.tweetText}`}
                          color="primary"
                          onDelete={() => handleRemoveMapping('tweetText')}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Stack spacing={1}>
                <TextField
                  fullWidth
                  label="Media URLs"
                  multiline
                  rows={2}
                  value={data.mediaUrls || ''}
                  onChange={handleChange('mediaUrls')}
                  placeholder="One URL per line (max 4 images, 1 video, or 1 GIF)"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {data.mappings?.mediaUrls ? (
                          <Chip
                            size="small"
                            icon={<LinkIcon />}
                            label={`Mapped: ${data.mappings.mediaUrls}`}
                            color="primary"
                            onDelete={() => handleRemoveMapping('mediaUrls')}
                          />
                        ) : (
                          <Tooltip title="Supported media: Images (PNG, JPEG), Videos (MP4), GIFs">
                            <HelpOutlineIcon fontSize="small" sx={{ color: 'action.active' }} />
                          </Tooltip>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion 
        expanded={expanded === 'interaction'} 
        onChange={handleAccordionChange('interaction')}
        sx={{ mb: 1, boxShadow: 'none', '&:before': { display: 'none' } }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ 
            bgcolor: 'rgba(0,0,0,0.02)',
            borderRadius: 1,
            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
          }}
        >
          <Typography variant="subtitle2">Interaction Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <TextField
                fullWidth
                label="Tweet ID"
                value={data.tweetId || ''}
                onChange={handleChange('tweetId')}
                placeholder="For replies/actions (e.g., 1234567890)"
                error={!validateField('tweetId', data.tweetId)}
                helperText={getFieldError('tweetId', data.tweetId)}
              />
              {renderMappingButton('tweetId', 'Tweet ID')}
            </Stack>

            <Stack spacing={1}>
              <TextField
                fullWidth
                label="Username"
                value={data.username || ''}
                onChange={handleChange('username')}
                placeholder="Without @ (e.g., elonmusk)"
                error={!validateField('username', data.username)}
                helperText={getFieldError('username', data.username)}
              />
              {renderMappingButton('username', 'Username')}
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion 
        expanded={expanded === 'search'} 
        onChange={handleAccordionChange('search')}
        sx={{ mb: 1, boxShadow: 'none', '&:before': { display: 'none' } }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ 
            bgcolor: 'rgba(0,0,0,0.02)',
            borderRadius: 1,
            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
          }}
        >
          <Typography variant="subtitle2">Search Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <TextField
                fullWidth
                label="Search Query"
                value={data.searchQuery || ''}
                onChange={handleChange('searchQuery')}
                placeholder="Search keywords or filters"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Use Twitter search operators for advanced filtering">
                        <HelpOutlineIcon fontSize="small" sx={{ color: 'action.active' }} />
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
              {renderMappingButton('searchQuery', 'Search Query')}
            </Stack>

            <Stack direction="row" spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={data.includeRetweets || false}
                    onChange={handleSwitchChange('includeRetweets')}
                    color="primary"
                  />
                }
                label="Include Retweets"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={data.includeReplies || false}
                    onChange={handleSwitchChange('includeReplies')}
                    color="primary"
                  />
                }
                label="Include Replies"
              />
            </Stack>

            <TextField
              fullWidth
              label="Max Results"
              type="number"
              value={data.maxResults || ''}
              onChange={handleChange('maxResults')}
              placeholder="Default: 10"
              InputProps={{
                inputProps: { min: 1, max: 100 }
              }}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Handle 
        type="source" 
        position="bottom" 
        isConnectable={isConnectable} 
        style={{ background: '#1DA1F2' }}
      />
    </Box>
  );
};

export default TwitterNode;
