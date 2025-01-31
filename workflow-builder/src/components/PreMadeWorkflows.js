import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import WorkflowTemplateLoader from './WorkflowTemplateLoader';
import { useNavigate } from 'react-router-dom';

const PreMadeWorkflows = () => {
  const navigate = useNavigate();

  const handleLoadTemplate = (template) => {
    // Navigate to workflow builder with template data
    navigate('/builder', { state: { template } });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Pre-made Workflows
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Choose from our collection of pre-built workflows to get started quickly. Each template is fully customizable to meet your specific needs.
        </Typography>
      </Box>
      
      <WorkflowTemplateLoader onLoadTemplate={handleLoadTemplate} />
    </Container>
  );
};

export default PreMadeWorkflows;
