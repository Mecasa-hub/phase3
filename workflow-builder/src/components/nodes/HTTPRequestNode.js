import React, { useState, useEffect } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import './HTTPRequestNode.css';

const HTTPRequestNode = ({ id, data }) => {
  const [config, setConfig] = useState({
    method: 'GET',
    url: '',
    timeout: 30000,
    auth: {
      type: 'none',
      username: '',
      password: '',
      token: '',
      apiKey: '',
      apiKeyName: 'X-API-Key'
    },
    headers: [{ key: '', value: '' }],
    queryParams: [{ key: '', value: '' }],
    body: {
      type: 'none',
      content: ''
    },
    advanced: {
      followRedirects: true,
      validateStatus: true,
      transformResponse: false,
      transformScript: ''
    }
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [showPreview, setShowPreview] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    validateConfig();
  }, [config]);

  const validateConfig = () => {
    const errors = [];
    if (!config.url) errors.push('URL is required');
    if (!isValidUrl(config.url)) errors.push('Invalid URL format');
    if (config.auth.type === 'basic' && (!config.auth.username || !config.auth.password)) {
      errors.push('Username and password required for Basic auth');
    }
    if (config.auth.type === 'bearer' && !config.auth.token) {
      errors.push('Token required for Bearer auth');
    }
    if (config.auth.type === 'apiKey' && (!config.auth.apiKey || !config.auth.apiKeyName)) {
      errors.push('API key and name required');
    }
    setValidationErrors(errors);
    setIsValid(errors.length === 0);
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleConfigChange = (section, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const handleAuthChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      auth: {
        ...prev.auth,
        [field]: value
      }
    }));
  };

  const addKeyValuePair = (section) => {
    setConfig(prev => ({
      ...prev,
      [section]: [...prev[section], { key: '', value: '' }]
    }));
  };

  const updateKeyValuePair = (section, index, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeKeyValuePair = (section, index) => {
    setConfig(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const renderKeyValuePairs = (section, title) => (
    <div className="key-value-section">
      <div className="section-header">
        <h4>{title}</h4>
        <button 
          className="add-button"
          onClick={() => addKeyValuePair(section)}
        >
          + Add
        </button>
      </div>
      {config[section].map((item, index) => (
        <div key={index} className="key-value-pair">
          <input
            type="text"
            placeholder="Key"
            value={item.key}
            onChange={(e) => updateKeyValuePair(section, index, 'key', e.target.value)}
          />
          <input
            type="text"
            placeholder="Value"
            value={item.value}
            onChange={(e) => updateKeyValuePair(section, index, 'value', e.target.value)}
          />
          <button 
            className="remove-button"
            onClick={() => removeKeyValuePair(section, index)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );

  const renderAuthSection = () => (
    <div className="auth-section">
      <select
        value={config.auth.type}
        onChange={(e) => handleAuthChange('type', e.target.value)}
      >
        <option value="none">No Auth</option>
        <option value="basic">Basic Auth</option>
        <option value="bearer">Bearer Token</option>
        <option value="apiKey">API Key</option>
      </select>

      {config.auth.type === 'basic' && (
        <div className="auth-inputs">
          <input
            type="text"
            placeholder="Username"
            value={config.auth.username}
            onChange={(e) => handleAuthChange('username', e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={config.auth.password}
            onChange={(e) => handleAuthChange('password', e.target.value)}
          />
        </div>
      )}

      {config.auth.type === 'bearer' && (
        <div className="auth-inputs">
          <input
            type="text"
            placeholder="Bearer Token"
            value={config.auth.token}
            onChange={(e) => handleAuthChange('token', e.target.value)}
          />
        </div>
      )}

      {config.auth.type === 'apiKey' && (
        <div className="auth-inputs">
          <input
            type="text"
            placeholder="API Key Name"
            value={config.auth.apiKeyName}
            onChange={(e) => handleAuthChange('apiKeyName', e.target.value)}
          />
          <input
            type="text"
            placeholder="API Key"
            value={config.auth.apiKey}
            onChange={(e) => handleAuthChange('apiKey', e.target.value)}
          />
        </div>
      )}
    </div>
  );

  const renderTabs = () => (
    <div className="tabs">
      <button
        className={`tab ${activeTab === 'basic' ? 'active' : ''}`}
        onClick={() => setActiveTab('basic')}
      >
        Basic
      </button>
      <button
        className={`tab ${activeTab === 'headers' ? 'active' : ''}`}
        onClick={() => setActiveTab('headers')}
      >
        Headers
      </button>
      <button
        className={`tab ${activeTab === 'params' ? 'active' : ''}`}
        onClick={() => setActiveTab('params')}
      >
        Params
      </button>
      <button
        className={`tab ${activeTab === 'body' ? 'active' : ''}`}
        onClick={() => setActiveTab('body')}
      >
        Body
      </button>
      <button
        className={`tab ${activeTab === 'advanced' ? 'active' : ''}`}
        onClick={() => setActiveTab('advanced')}
      >
        Advanced
      </button>
    </div>
  );

  const { setNodes, setEdges } = useReactFlow();

  const onDelete = (e) => {
    e.stopPropagation();
    setNodes((nodes) => nodes.filter(node => node.id !== id));
    setEdges((edges) => edges.filter(edge => edge.source !== id && edge.target !== id));
  };

  return (
    <div className={`http-request-node ${isValid ? '' : 'invalid'} ${showPreview ? 'preview-active' : ''}`}>
      <Handle type="target" position={Position.Top} />
      
      <div className="node-title">
        <div className="node-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
          </svg>
        </div>
        <span>HTTP Request</span>
        <button 
          className="delete-button" 
          onClick={onDelete}
          title="Delete node"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" />
            <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>

      <div className="node-header">
        <select
          value={config.method}
          onChange={(e) => handleConfigChange('method', e.target.value)}
          className={`method-select ${config.method.toLowerCase()}`}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
          <option value="HEAD">HEAD</option>
          <option value="OPTIONS">OPTIONS</option>
        </select>

        <input
          type="text"
          className="url-input"
          placeholder="https://api.example.com/v1/resource"
          value={config.url}
          onChange={(e) => handleConfigChange('url', e.target.value)}
        />
      </div>

      {validationErrors.length > 0 && (
        <div className="validation-errors">
          {validationErrors.map((error, index) => (
            <div key={index} className="error-message">{error}</div>
          ))}
        </div>
      )}

      {renderTabs()}

      <div className="tab-content">
        {activeTab === 'basic' && (
          <div className="basic-tab">
            {renderAuthSection()}
            <div className="timeout-section">
              <label>Timeout (ms):</label>
              <input
                type="number"
                value={config.timeout}
                onChange={(e) => handleConfigChange('timeout', parseInt(e.target.value))}
                min="0"
              />
            </div>
          </div>
        )}

        {activeTab === 'headers' && renderKeyValuePairs('headers', 'Headers')}
        {activeTab === 'params' && renderKeyValuePairs('queryParams', 'Query Parameters')}

        {activeTab === 'body' && (
          <div className="body-tab">
            <select
              value={config.body.type}
              onChange={(e) => handleConfigChange('body', { ...config.body, type: e.target.value })}
            >
              <option value="none">None</option>
              <option value="json">JSON</option>
              <option value="form">Form Data</option>
              <option value="raw">Raw</option>
            </select>
            {config.body.type !== 'none' && (
              <textarea
                className="body-editor"
                value={config.body.content}
                onChange={(e) => handleConfigChange('body', { ...config.body, content: e.target.value })}
                placeholder={config.body.type === 'json' ? '{\n  "key": "value"\n}' : ''}
              />
            )}
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="advanced-tab">
            <div className="advanced-options">
              <label>
                <input
                  type="checkbox"
                  checked={config.advanced.followRedirects}
                  onChange={(e) => handleConfigChange('advanced', { ...config.advanced, followRedirects: e.target.checked })}
                />
                Follow Redirects
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={config.advanced.validateStatus}
                  onChange={(e) => handleConfigChange('advanced', { ...config.advanced, validateStatus: e.target.checked })}
                />
                Validate Status
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={config.advanced.transformResponse}
                  onChange={(e) => handleConfigChange('advanced', { ...config.advanced, transformResponse: e.target.checked })}
                />
                Transform Response
              </label>
            </div>
            {config.advanced.transformResponse && (
              <textarea
                className="transform-editor"
                value={config.advanced.transformScript}
                onChange={(e) => handleConfigChange('advanced', { ...config.advanced, transformScript: e.target.value })}
                placeholder="// JavaScript transform function
function transform(response) {
  return response;
}"
              />
            )}
          </div>
        )}
      </div>

      <div className="node-footer">
        <button
          className="preview-button"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>

      {showPreview && (
        <div className="request-preview">
          <div className="preview-header">
            <span>Preview</span>
            <button
              className="copy-button"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(config, null, 2));
              }}
              title="Copy to clipboard"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            </button>
          </div>
          <pre>{JSON.stringify(config, null, 2)}</pre>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default HTTPRequestNode;
