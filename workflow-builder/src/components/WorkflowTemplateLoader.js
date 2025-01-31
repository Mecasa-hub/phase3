import React, { useEffect, useCallback } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Tooltip } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import twitterReplyAgent from '../templates/twitter-reply-agent.json';
import xaiAgent from '../templates/xai-agent-2.json';

const WorkflowTemplateLoader = ({ onLoadTemplate }) => {
  useEffect(() => {
    console.log('WorkflowTemplateLoader mounted, onLoadTemplate:', !!onLoadTemplate);
  }, [onLoadTemplate]);

  const handleLoadTemplate = useCallback((template) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      console.log('Loading template...');
      console.log('Template data:', template);
      console.log('onLoadTemplate function:', !!onLoadTemplate);
      
      if (onLoadTemplate) {
        onLoadTemplate(template);
        console.log('Template loaded successfully');
      } else {
        console.error('onLoadTemplate function not provided');
      }
    } catch (error) {
      console.error('Error loading template:', error);
    }
  }, [onLoadTemplate]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <AutoFixHighIcon color="primary" />
        Pre-made Workflows
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              cursor: 'pointer',
              '&:hover': { 
                boxShadow: 6,
                transform: 'translateY(-2px)',
                transition: 'all 0.2s'
              }
            }}
          >
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Twitter Reply Agent
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Automated workflow to process and reply to tweets using AI
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" component="div">
                  <strong>Features:</strong>
                  <Box component="ul" sx={{ m: 1, pl: 2 }}>
                    <li>Automated tweet response generation using AI</li>
                    <li>Customizable response templates</li>
                    <li>Webhook integration for real-time processing</li>
                    <li>Configurable AI parameters</li>
                  </Box>
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button 
                  variant="contained"
                  size="large"
                  onClick={handleLoadTemplate(twitterReplyAgent)}
                  startIcon={<PlayArrowIcon />}
                  sx={{ 
                    minWidth: '200px',
                    py: 2,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                      transform: 'scale(1.05)',
                      transition: 'all 0.2s'
                    },
                    boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                    fontWeight: 'bold',
                    position: 'relative',
                    zIndex: 10
                  }}
                >
                  Load Template
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              cursor: 'pointer',
              '&:hover': { 
                boxShadow: 6,
                transform: 'translateY(-2px)',
                transition: 'all 0.2s'
              }
            }}
          >
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                XAI Agent 2.0
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Advanced AI agent for automated tweet responses with enhanced capabilities
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" component="div">
                  <strong>Features:</strong>
                  <Box component="ul" sx={{ m: 1, pl: 2 }}>
                    <li>OpenAI-powered response generation</li>
                    <li>SerpAPI integration for real-time data</li>
                    <li>Scheduled tweet monitoring</li>
                    <li>Advanced error handling and retries</li>
                  </Box>
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button 
                  variant="contained"
                  size="large"
                  onClick={handleLoadTemplate(xaiAgent)}
                  startIcon={<PlayArrowIcon />}
                  sx={{ 
                    minWidth: '200px',
                    py: 2,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                      transform: 'scale(1.05)',
                      transition: 'all 0.2s'
                    },
                    boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                    fontWeight: 'bold',
                    position: 'relative',
                    zIndex: 10
                  }}
                >
                  Load Template
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkflowTemplateLoader;
