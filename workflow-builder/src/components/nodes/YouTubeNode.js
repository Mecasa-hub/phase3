import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const YouTubeNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>YouTube</Typography>

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
        label="OAuth Token"
        type="password"
        value={data.oauthToken || ''}
        onChange={handleChange('oauthToken')}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'uploadVideo'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="uploadVideo">Upload Video</MenuItem>
          <MenuItem value="updateVideo">Update Video</MenuItem>
          <MenuItem value="deleteVideo">Delete Video</MenuItem>
          <MenuItem value="getVideo">Get Video</MenuItem>
          <MenuItem value="listVideos">List Videos</MenuItem>
          <MenuItem value="searchVideos">Search Videos</MenuItem>
          <MenuItem value="rateVideo">Rate Video</MenuItem>
          <MenuItem value="getLikedVideos">Get Liked Videos</MenuItem>
          <MenuItem value="createPlaylist">Create Playlist</MenuItem>
          <MenuItem value="updatePlaylist">Update Playlist</MenuItem>
          <MenuItem value="deletePlaylist">Delete Playlist</MenuItem>
          <MenuItem value="getPlaylist">Get Playlist</MenuItem>
          <MenuItem value="listPlaylists">List Playlists</MenuItem>
          <MenuItem value="addToPlaylist">Add to Playlist</MenuItem>
          <MenuItem value="removeFromPlaylist">Remove from Playlist</MenuItem>
          <MenuItem value="createComment">Create Comment</MenuItem>
          <MenuItem value="updateComment">Update Comment</MenuItem>
          <MenuItem value="deleteComment">Delete Comment</MenuItem>
          <MenuItem value="listComments">List Comments</MenuItem>
          <MenuItem value="replyToComment">Reply to Comment</MenuItem>
          <MenuItem value="markAsSpam">Mark as Spam</MenuItem>
          <MenuItem value="setModerationStatus">Set Moderation Status</MenuItem>
          <MenuItem value="subscribe">Subscribe to Channel</MenuItem>
          <MenuItem value="unsubscribe">Unsubscribe from Channel</MenuItem>
          <MenuItem value="getSubscriptions">Get Subscriptions</MenuItem>
          <MenuItem value="getChannel">Get Channel</MenuItem>
          <MenuItem value="updateChannel">Update Channel</MenuItem>
          <MenuItem value="listChannels">List Channels</MenuItem>
          <MenuItem value="getCaptions">Get Captions</MenuItem>
          <MenuItem value="insertCaptions">Insert Captions</MenuItem>
          <MenuItem value="updateCaptions">Update Captions</MenuItem>
          <MenuItem value="deleteCaptions">Delete Captions</MenuItem>
          <MenuItem value="downloadCaptions">Download Captions</MenuItem>
          <MenuItem value="getLiveStreamingDetails">Get Live Streaming Details</MenuItem>
          <MenuItem value="updateLiveStream">Update Live Stream</MenuItem>
          <MenuItem value="listLiveBroadcasts">List Live Broadcasts</MenuItem>
          <MenuItem value="transitionLiveStream">Transition Live Stream</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Video ID"
        value={data.videoId || ''}
        onChange={handleChange('videoId')}
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
        label="Description"
        multiline
        rows={4}
        value={data.description || ''}
        onChange={handleChange('description')}
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

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Privacy Status</InputLabel>
        <Select
          value={data.privacyStatus || 'private'}
          onChange={handleChange('privacyStatus')}
          label="Privacy Status"
        >
          <MenuItem value="private">Private</MenuItem>
          <MenuItem value="unlisted">Unlisted</MenuItem>
          <MenuItem value="public">Public</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Category ID"
        value={data.categoryId || ''}
        onChange={handleChange('categoryId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Playlist ID"
        value={data.playlistId || ''}
        onChange={handleChange('playlistId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Channel ID"
        value={data.channelId || ''}
        onChange={handleChange('channelId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Comment ID"
        value={data.commentId || ''}
        onChange={handleChange('commentId')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Comment Text"
        multiline
        rows={2}
        value={data.commentText || ''}
        onChange={handleChange('commentText')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Caption Track"
        value={data.captionTrack || ''}
        onChange={handleChange('captionTrack')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Language"
        value={data.language || ''}
        onChange={handleChange('language')}
        placeholder="en, es, fr, etc."
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Search Query"
        value={data.searchQuery || ''}
        onChange={handleChange('searchQuery')}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.madeForKids || false}
            onChange={handleSwitchChange('madeForKids')}
          />
        }
        label="Made for Kids"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.embeddable || true}
            onChange={handleSwitchChange('embeddable')}
          />
        }
        label="Allow Embedding"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.publicStatsViewable || true}
            onChange={handleSwitchChange('publicStatsViewable')}
          />
        }
        label="Public Statistics"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default YouTubeNode;
