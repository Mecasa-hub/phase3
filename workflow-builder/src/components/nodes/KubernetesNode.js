import React from 'react';
import { Handle } from 'reactflow';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Switch, FormControlLabel } from '@mui/material';

const KubernetesNode = ({ data, isConnectable, updateNodeData }) => {
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
      
      <Typography variant="subtitle2" sx={{ mb: 2 }}>Kubernetes</Typography>

      <TextField
        fullWidth
        label="API Server"
        value={data.apiServer || ''}
        onChange={handleChange('apiServer')}
        placeholder="https://kubernetes.example.com"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Bearer Token"
        type="password"
        value={data.token || ''}
        onChange={handleChange('token')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Namespace"
        value={data.namespace || ''}
        onChange={handleChange('namespace')}
        placeholder="default"
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Operation</InputLabel>
        <Select
          value={data.operation || 'getPod'}
          onChange={handleChange('operation')}
          label="Operation"
        >
          <MenuItem value="getPod">Get Pod</MenuItem>
          <MenuItem value="listPods">List Pods</MenuItem>
          <MenuItem value="createPod">Create Pod</MenuItem>
          <MenuItem value="updatePod">Update Pod</MenuItem>
          <MenuItem value="deletePod">Delete Pod</MenuItem>
          <MenuItem value="getDeployment">Get Deployment</MenuItem>
          <MenuItem value="listDeployments">List Deployments</MenuItem>
          <MenuItem value="createDeployment">Create Deployment</MenuItem>
          <MenuItem value="updateDeployment">Update Deployment</MenuItem>
          <MenuItem value="deleteDeployment">Delete Deployment</MenuItem>
          <MenuItem value="getService">Get Service</MenuItem>
          <MenuItem value="listServices">List Services</MenuItem>
          <MenuItem value="createService">Create Service</MenuItem>
          <MenuItem value="updateService">Update Service</MenuItem>
          <MenuItem value="deleteService">Delete Service</MenuItem>
          <MenuItem value="getConfigMap">Get ConfigMap</MenuItem>
          <MenuItem value="listConfigMaps">List ConfigMaps</MenuItem>
          <MenuItem value="createConfigMap">Create ConfigMap</MenuItem>
          <MenuItem value="updateConfigMap">Update ConfigMap</MenuItem>
          <MenuItem value="deleteConfigMap">Delete ConfigMap</MenuItem>
          <MenuItem value="getSecret">Get Secret</MenuItem>
          <MenuItem value="listSecrets">List Secrets</MenuItem>
          <MenuItem value="createSecret">Create Secret</MenuItem>
          <MenuItem value="updateSecret">Update Secret</MenuItem>
          <MenuItem value="deleteSecret">Delete Secret</MenuItem>
          <MenuItem value="getIngress">Get Ingress</MenuItem>
          <MenuItem value="listIngresses">List Ingresses</MenuItem>
          <MenuItem value="createIngress">Create Ingress</MenuItem>
          <MenuItem value="updateIngress">Update Ingress</MenuItem>
          <MenuItem value="deleteIngress">Delete Ingress</MenuItem>
          <MenuItem value="getPVC">Get PVC</MenuItem>
          <MenuItem value="listPVCs">List PVCs</MenuItem>
          <MenuItem value="createPVC">Create PVC</MenuItem>
          <MenuItem value="updatePVC">Update PVC</MenuItem>
          <MenuItem value="deletePVC">Delete PVC</MenuItem>
          <MenuItem value="getNode">Get Node</MenuItem>
          <MenuItem value="listNodes">List Nodes</MenuItem>
          <MenuItem value="getNamespace">Get Namespace</MenuItem>
          <MenuItem value="listNamespaces">List Namespaces</MenuItem>
          <MenuItem value="createNamespace">Create Namespace</MenuItem>
          <MenuItem value="deleteNamespace">Delete Namespace</MenuItem>
          <MenuItem value="getLogs">Get Pod Logs</MenuItem>
          <MenuItem value="execCommand">Execute Command</MenuItem>
          <MenuItem value="portForward">Port Forward</MenuItem>
          <MenuItem value="scaleDeployment">Scale Deployment</MenuItem>
          <MenuItem value="rolloutRestart">Rollout Restart</MenuItem>
          <MenuItem value="rolloutUndo">Rollout Undo</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Resource Name"
        value={data.resourceName || ''}
        onChange={handleChange('resourceName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Resource YAML"
        multiline
        rows={6}
        value={data.resourceYaml || ''}
        onChange={handleChange('resourceYaml')}
        placeholder="Resource configuration in YAML format"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Container Name"
        value={data.containerName || ''}
        onChange={handleChange('containerName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Command"
        value={data.command || ''}
        onChange={handleChange('command')}
        placeholder="Command to execute in container"
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Local Port"
        type="number"
        value={data.localPort || ''}
        onChange={handleChange('localPort')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Container Port"
        type="number"
        value={data.containerPort || ''}
        onChange={handleChange('containerPort')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Replicas"
        type="number"
        value={data.replicas || ''}
        onChange={handleChange('replicas')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Labels"
        value={data.labels || ''}
        onChange={handleChange('labels')}
        placeholder="app=nginx,environment=prod"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.follow || false}
            onChange={handleSwitchChange('follow')}
          />
        }
        label="Follow Logs"
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={data.previous || false}
            onChange={handleSwitchChange('previous')}
          />
        }
        label="Previous Container Logs"
        sx={{ mb: 2 }}
      />

      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </Box>
  );
};

export default KubernetesNode;
