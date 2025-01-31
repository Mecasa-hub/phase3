import React, { memo, useState, useEffect } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { Box, TextField, Typography, IconButton, Stack, CircularProgress, Tooltip } from '@mui/material';
import { SmartToy as SmartToyIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const AgentNode = ({ id, data, isConnectable }) => {
  const { setNodes, setEdges, getNode, getEdges } = useReactFlow();
  const [selectedProvider, setSelectedProvider] = useState(data.provider || 'openai');
  const [modelOptions, setModelOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [runError, setRunError] = useState('');

  const openRouterModels = [
    // Premium Models
    { value: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet (via OpenRouter)' },
    { value: 'anthropic/claude-3-opus', label: 'Claude 3 Opus (via OpenRouter)' },
    { value: 'google/gemini-1.5-pro', label: 'Gemini 1.5 Pro (via OpenRouter)' },
    { value: 'google/gemini-1.5-flash', label: 'Gemini 1.5 Flash (via OpenRouter)' },
    { value: 'openai/gpt-4o', label: 'GPT-4 Omni (via OpenRouter)' },
    { value: 'meta-llama/llama-3-70b', label: 'Llama 3 70B (via OpenRouter)' },
    { value: 'mistralai/mistral-large-2', label: 'Mistral Large 2 (via OpenRouter)' },
    { value: 'cohere/command-r-plus', label: 'Command R+ (via OpenRouter)' },
    { value: 'deepseek/deepseek-r1', label: 'DeepSeek-R1 (via OpenRouter)' },
    { value: 'deepseek/deepseek-coder-33b', label: 'DeepSeek Coder 33B (via OpenRouter)' },
    { value: 'perplexity/pplx-7b-online', label: 'Perplexity 7B Online (via OpenRouter)' },
    { value: 'databricks/dbrx-instruct', label: 'DBRX Instruct (via OpenRouter)' },
    
    // Free Models
    { value: 'google/gemini-2.0-flash-thinking', label: 'Gemini 2.0 Flash Thinking (Free)' },
    { value: 'mistral/mixtral-8x7b', label: 'Mixtral 8x7B (Free)' },
    { value: 'mistral/mistral-7b', label: 'Mistral 7B (Free)' },
    { value: 'openchat/openchat-7b', label: 'OpenChat 7B (Free)' },
    { value: 'phind/phind-34b', label: 'Phind 34B (Free)' },
    { value: 'nousresearch/nous-capybara-7b', label: 'Nous Capybara 7B (Free)' },
    { value: 'gryphe/mythomist-7b', label: 'MythoMist 7B (Free)' },
    { value: 'meta-llama/codellama-34b', label: 'CodeLlama 34B (Free)' }
  ];

  const providerModels = {
    openai: [
      // GPT-4 Next Generation
      { value: 'gpt-4o', label: 'GPT-4o (Great for most questions)' },
      { value: 'gpt-4o-scheduled', label: 'GPT-4o with scheduled tasks (BETA)' },
      { value: 'gpt-4o-mini', label: 'GPT-4o mini (Faster for most questions)' },
      // Advanced Reasoning Models
      { value: 'o1', label: 'o1 (Uses advanced reasoning)' },
      { value: 'o1-mini', label: 'o1-mini (Faster at reasoning)' },
      // GPT-4 Models
      { value: 'gpt-4-0125-preview', label: 'GPT-4 Turbo (Latest)' },
      { value: 'gpt-4-1106-preview', label: 'GPT-4 Turbo (Previous)' },
      { value: 'gpt-4-vision-preview', label: 'GPT-4 Vision' },
      { value: 'gpt-4', label: 'GPT-4 Base' },
      // GPT-3.5 Models
      { value: 'gpt-3.5-turbo-0125', label: 'GPT-3.5 Turbo (Latest)' },
      { value: 'gpt-3.5-turbo-1106', label: 'GPT-3.5 Turbo (Previous)' },
      { value: 'gpt-3.5-turbo-instruct', label: 'GPT-3.5 Turbo Instruct' }
    ],
    anthropic: [
      { value: 'claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' },
      { value: 'claude-3-opus', label: 'Claude 3 Opus' },
      { value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
      { value: 'claude-2.1', label: 'Claude 2.1' }
    ],
    google: [
      // Latest Models
      { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
      { value: 'gemini-1.5-flash-8b', label: 'Gemini 1.5 Flash-8B' },
      { value: 'gemini-2.0-flash-exp', label: 'Gemini 2.0 Flash Experimental (NEW)' },
      { value: 'gemini-exp-1206', label: 'Gemini Experimental 1206 (NEW)' },
      { value: 'gemini-2.0-flash-thinking-exp-01-21', label: 'Gemini 2.0 Flash Thinking (NEW)' },
      // Stable Models
      { value: 'gemini-1.0-pro', label: 'Gemini Pro' },
      { value: 'gemini-1.0-pro-vision', label: 'Gemini Pro Vision' },
      { value: 'gemini-1.0-ultra', label: 'Gemini Ultra' },
      { value: 'gemini-1.0-ultra-vision', label: 'Gemini Ultra Vision' }
    ],
    openrouter: openRouterModels
  };

  useEffect(() => {
    const loadModelOptions = async () => {
      setIsLoading(true);
      setError('');
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        setModelOptions(providerModels[selectedProvider] || []);
      } catch (err) {
        setError('Failed to load models');
        console.error('Error loading models:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadModelOptions();
  }, [selectedProvider]);

  const handleProviderChange = (event) => {
    const newProvider = event.target.value;
    setSelectedProvider(newProvider);
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { 
              ...node, 
              data: { 
                ...node.data, 
                provider: newProvider,
                model: '',
                apiKey: ''
              } 
            }
          : node
      )
    );
  };

  const handleModelChange = (event) => {
    const newModel = event.target.value;
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, model: newModel } }
          : node
      )
    );
  };

  const onDelete = () => {
    setNodes((nodes) => nodes.filter(node => node.id !== id));
    setEdges((edges) => edges.filter(edge => edge.source !== id && edge.target !== id));
  };

  const getInputData = () => {
    const edges = getEdges();
    const inputData = {};

    edges.forEach(edge => {
      if (edge.target === id && edge.targetHandle?.startsWith('input')) {
        const sourceNode = getNode(edge.source);
        if (sourceNode && sourceNode.data.output) {
          inputData[edge.targetHandle] = sourceNode.data.output;
        }
      }
    });

    return inputData;
  };

  const formatOutput = (content) => {
    switch (data.outputFormat) {
      case 'json':
        try {
          JSON.parse(content);
          return content;
        } catch {
          return JSON.stringify({ content });
        }
      case 'markdown':
        return content.startsWith('#') || content.includes('\n```') 
          ? content 
          : `\`\`\`\n${content}\n\`\`\``;
      case 'text':
        return content.replace(/[`*_#]/g, '').trim();
      default:
        return content;
    }
  };

  const makeOpenAIRequest = async (instructions) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.apiKey}`
        },
        body: JSON.stringify({
          model: data.model,
          messages: [{ role: 'user', content: instructions }],
          temperature: parseFloat(data.temperature) || 0.7
        })
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result.error?.message || result.error?.code || response.statusText;
        if (errorMessage.includes('API key')) {
          throw new Error('Invalid API key. Please check your credentials.');
        } else if (errorMessage.includes('quota') || errorMessage.includes('rate limit')) {
          throw new Error('API quota exceeded. Please try again later.');
        } else {
          throw new Error(`OpenAI API error: ${errorMessage}`);
        }
      }

      if (!result.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format from OpenAI API');
      }

      return result.choices[0].message.content;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw error;
    }
  };

  const makeAnthropicRequest = async (instructions) => {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': data.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: data.model,
          messages: [{ role: 'user', content: instructions }],
          max_tokens: 1024
        })
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result.error?.message || response.statusText;
        if (errorMessage.includes('API key') || errorMessage.includes('authentication')) {
          throw new Error('Invalid API key. Please check your credentials.');
        } else if (errorMessage.includes('quota') || errorMessage.includes('rate limit')) {
          throw new Error('API quota exceeded. Please try again later.');
        } else {
          throw new Error(`Anthropic API error: ${errorMessage}`);
        }
      }

      if (!result.content?.[0]?.text) {
        throw new Error('Invalid response format from Anthropic API');
      }

      return result.content[0].text;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw error;
    }
  };

  const makeGoogleRequest = async (instructions) => {
    try {
      const apiEndpoint = 'https://generativelanguage.googleapis.com/v1/models/';
      const response = await fetch(`${apiEndpoint}${data.model}:generateContent?key=${data.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{
              text: instructions
            }]
          }],
          generationConfig: {
            temperature: parseFloat(data.temperature) || 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024
          }
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || 'Failed to generate content');
      }

      if (result.error) {
        const errorMessage = result.error.message || 'Unknown error';
        if (errorMessage.includes('API key')) {
          throw new Error('Invalid API key. Please check your credentials.');
        } else if (errorMessage.includes('quota')) {
          throw new Error('API quota exceeded. Please try again later.');
        } else {
          throw new Error(`Google AI API error: ${errorMessage}`);
        }
      }

      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        return result.candidates[0].content.parts[0].text;
      } else if (result.candidates?.[0]?.output) {
        return result.candidates[0].output;
      } else if (result.text) {
        return result.text;
      } else {
        throw new Error('Unexpected response format from Google AI API');
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your internet connection.');
      }
      
      if (error.message.includes('API key')) {
        throw new Error('Invalid API key. Please check your credentials.');
      }
      
      if (error.message.includes('quota')) {
        throw new Error('API quota exceeded. Please try again later.');
      }
      
      throw new Error(error.message || 'Failed to connect to Google AI API');
    }
  };

  const makeOpenRouterRequest = async (instructions) => {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Workflow Builder'
        },
        body: JSON.stringify({
          model: data.model,
          messages: [{ role: 'user', content: instructions }],
          temperature: parseFloat(data.temperature) || 0.7
        })
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result.error?.message || response.statusText;
        if (errorMessage.includes('API key') || errorMessage.includes('authentication')) {
          throw new Error('Invalid API key. Please check your credentials.');
        } else if (errorMessage.includes('quota') || errorMessage.includes('rate limit')) {
          throw new Error('API quota exceeded. Please try again later.');
        } else {
          throw new Error(`OpenRouter API error: ${errorMessage}`);
        }
      }

      if (!result.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format from OpenRouter API');
      }

      return result.choices[0].message.content;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw error;
    }
  };

  const validateInputs = () => {
    if (!data.instructions?.trim()) {
      throw new Error('Please enter instructions');
    }
    if (!data.model) {
      throw new Error('Please select a model');
    }
    if (!data.apiKey?.trim()) {
      throw new Error('Please enter an API key');
    }
    if (data.temperature && (isNaN(data.temperature) || data.temperature < 0 || data.temperature > 2)) {
      throw new Error('Temperature must be between 0 and 2');
    }
  };

  const runAgent = async () => {
    setIsRunning(true);
    setRunError('');
    
    try {
      validateInputs();
      const inputData = getInputData();
      
      let processedInstructions = data.instructions;
      Object.entries(inputData).forEach(([key, value]) => {
        processedInstructions = processedInstructions.replace(
          new RegExp(`{${key}}`, 'g'), 
          value
        );
      });

      let response;
      switch (selectedProvider) {
        case 'openai':
          response = await makeOpenAIRequest(processedInstructions);
          break;
        case 'anthropic':
          response = await makeAnthropicRequest(processedInstructions);
          break;
        case 'google':
          response = await makeGoogleRequest(processedInstructions);
          break;
        case 'openrouter':
          response = await makeOpenRouterRequest(processedInstructions);
          break;
        default:
          throw new Error('Invalid provider selected');
      }

      const formattedResponse = formatOutput(response);
      
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, output: formattedResponse } }
            : node
        )
      );
    } catch (err) {
      const errorMessage = err.message.includes('API key not valid') 
        ? 'Invalid API key. Please check your credentials.'
        : err.message || 'Failed to run agent';
      setRunError(errorMessage);
      console.error('Error running agent:', err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Box
      sx={{
        background: '#fff',
        padding: '8px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        borderLeft: '3px solid #2196F3',
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
        <SmartToyIcon sx={{ color: '#2196F3', fontSize: 20 }} />
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontSize: '12px',
            fontWeight: 500,
            flex: 1
          }}
        >
          Agent
        </Typography>
        <Stack direction="row" spacing={0.5}>
          <Tooltip title={runError || 'Run agent'}>
            <IconButton
              size="small"
              onClick={runAgent}
              disabled={isRunning}
              color="primary"
              sx={{
                padding: '2px',
                '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.08)' }
              }}
            >
              {isRunning ? (
                <CircularProgress size={16} color="primary" />
              ) : (
                <PlayArrowIcon sx={{ fontSize: 16 }} />
              )}
            </IconButton>
          </Tooltip>
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
      </Stack>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mb: 0.5,
              color: 'text.secondary',
              fontSize: '11px'
            }}
          >
            Input Configuration
          </Typography>
          
          <TextField
            size="small"
            multiline
            rows={2}
            placeholder="Enter instructions with variables like {input1}, {input2}..."
            value={data.instructions || ''}
            onChange={(event) => {
              setNodes((nodes) =>
                nodes.map((node) =>
                  node.id === id
                    ? { ...node, data: { ...node.data, instructions: event.target.value } }
                    : node
                )
              );
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: '12px',
                backgroundColor: '#f5f5f5'
              }
            }}
          />

          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 0.5,
              color: 'text.secondary',
              fontSize: '10px'
            }}
          >
            Use {'{input1}'}, {'{input2}'} variables to map data from connected input nodes
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mb: 0.5,
              color: 'text.secondary',
              fontSize: '11px'
            }}
          >
            Agent Configuration
          </Typography>

          <Stack spacing={1}>
            <TextField
              select
              size="small"
              SelectProps={{ 
                native: true,
                MenuProps: {
                  PaperProps: {
                    style: { maxHeight: 300 }
                  }
                }
              }}
              value={selectedProvider}
              onChange={handleProviderChange}
              disabled={isLoading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '12px',
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              <optgroup label="AI Providers">
                <option value="openai">OpenAI</option>
                <option value="anthropic">Anthropic</option>
                <option value="google">Google AI</option>
                <option value="openrouter">OpenRouter (Multi-Provider)</option>
              </optgroup>
            </TextField>

            <TextField
              select
              size="small"
              SelectProps={{ 
                native: true,
                MenuProps: {
                  PaperProps: {
                    style: { maxHeight: 300 }
                  }
                }
              }}
              value={data.model || ''}
              onChange={handleModelChange}
              disabled={isLoading}
              placeholder={isLoading ? 'Loading models...' : 'Select a model'}
              error={!!error}
              helperText={
                error ? (
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <ErrorOutlineIcon sx={{ fontSize: 14, color: 'error.main' }} />
                    <Typography variant="caption" color="error">
                      {error}
                    </Typography>
                  </Stack>
                ) : null
              }
              InputProps={{
                endAdornment: isLoading ? (
                  <CircularProgress size={16} sx={{ mr: 1 }} />
                ) : null
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '12px',
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              <option value="" disabled>Select a model</option>
              {selectedProvider === 'openrouter' ? (
                <>
                  <optgroup label="Premium Models">
                    {modelOptions.filter(m => !m.label.includes('Free')).map((model) => (
                      <option key={model.value} value={model.value}>
                        {model.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Free Models">
                    {modelOptions.filter(m => m.label.includes('Free')).map((model) => (
                      <option key={model.value} value={model.value}>
                        {model.label}
                      </option>
                    ))}
                  </optgroup>
                </>
              ) : (
                modelOptions.map((model) => (
                  <option key={model.value} value={model.value}>
                    {model.label}
                  </option>
                ))
              )}
            </TextField>

            <TextField
              size="small"
              type="password"
              placeholder="API Key"
              value={data.apiKey || ''}
              onChange={(event) => {
                setNodes((nodes) =>
                  nodes.map((node) =>
                    node.id === id
                      ? { ...node, data: { ...node.data, apiKey: event.target.value } }
                      : node
                  )
                );
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '12px',
                  backgroundColor: '#f5f5f5'
                }
              }}
            />

            <TextField
              size="small"
              type="number"
              placeholder="Temperature"
              value={data.temperature || '0.7'}
              onChange={(event) => {
                setNodes((nodes) =>
                  nodes.map((node) =>
                    node.id === id
                      ? { ...node, data: { ...node.data, temperature: event.target.value } }
                      : node
                  )
                );
              }}
              inputProps={{ min: 0, max: 2, step: 0.1 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '12px',
                  backgroundColor: '#f5f5f5'
                }
              }}
            />
          </Stack>
        </Box>

        <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid #f0f0f0' }}>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mb: 0.5,
              color: 'text.secondary',
              fontSize: '11px'
            }}
          >
            Output Configuration
          </Typography>

          <Stack spacing={1}>
            <TextField
              size="small"
              select
              SelectProps={{ native: true }}
              value={data.outputFormat || 'raw'}
              onChange={(event) => {
                setNodes((nodes) =>
                  nodes.map((node) =>
                    node.id === id
                      ? { ...node, data: { ...node.data, outputFormat: event.target.value } }
                      : node
                  )
                );
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '12px',
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              <option value="raw">Raw Response</option>
              <option value="json">JSON</option>
              <option value="markdown">Markdown</option>
              <option value="text">Plain Text</option>
            </TextField>

            <TextField
              size="small"
              multiline
              rows={3}
              placeholder={isRunning ? "Generating response..." : "Click the play button above to generate content..."}
              value={data.output || ''}
              disabled={isRunning}
              InputProps={{
                readOnly: true,
                sx: {
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isRunning ? '#fafafa' : '#f8f8f8',
                    '&.Mui-focused': {
                      backgroundColor: '#f8f8f8'
                    }
                  }
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '12px',
                  backgroundColor: '#f8f8f8',
                  fontFamily: 'monospace',
                  transition: 'background-color 0.2s'
                },
                '& .MuiOutlinedInput-input': {
                  color: isRunning ? '#999' : 'inherit'
                }
              }}
            />

            {runError ? (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <ErrorOutlineIcon sx={{ fontSize: 12, color: 'error.main' }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: 'error.main',
                    fontSize: '10px'
                  }}
                >
                  {runError}
                </Typography>
              </Stack>
            ) : (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '10px'
                  }}
                >
                  Output will be formatted as {data.outputFormat || 'raw'} response
                </Typography>
              </Stack>
            )}
          </Stack>
        </Box>
      </Box>

      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ background: '#2196F3', width: 8, height: 8 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="input1"
        isConnectable={isConnectable}
        style={{ background: '#4CAF50', width: 8, height: 8, left: -4 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="input2"
        isConnectable={isConnectable}
        style={{ background: '#4CAF50', width: 8, height: 8, left: -4, top: '75%' }}
      />
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ background: '#2196F3', width: 8, height: 8 }}
      />
    </Box>
  );
};

export default memo(AgentNode);
