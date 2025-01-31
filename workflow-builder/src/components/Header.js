import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import beingAiLogo from '../assets/being-ai-logo.svg';
import { useNavigate } from 'react-router-dom';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useWorkflow } from '../context/WorkflowContext';

const Header = () => {
  const navigate = useNavigate();
  const { canvasRef, setShowSimulation } = useWorkflow();

  const handleLogoClick = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
    setShowSimulation(false);
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box 
          component="img"
          src={beingAiLogo}
          alt="Being AI Logo"
          sx={{ 
            height: 40,
            width: 40,
            marginRight: 2,
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8
            }
          }}
          onClick={handleLogoClick}
        />
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1
          }}
        >
          Workflow Builder
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            startIcon={<AutoFixHighIcon />}
            onClick={() => navigate('/templates')}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Pre-made Workflows
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
