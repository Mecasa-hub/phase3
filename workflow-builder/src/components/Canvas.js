import React, { useCallback, useImperativeHandle, forwardRef, useEffect, useState } from 'react';
import ReactFlow, { 
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
  getBezierPath,
  useReactFlow,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { nodeTypes } from './nodes';

const CustomEdge = React.memo(({ id, sourceX, sourceY, targetX, targetY, style = {} }) => {
  const { setEdges } = useReactFlow();
  const [isHovered, setIsHovered] = useState(false);
  const foreignObjectSize = 20;

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    curvature: 0.3
  });

  const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  const edgeCenter = {
    x: (sourceX + targetX) / 2,
    y: (sourceY + targetY) / 2
  };

  return (
    <>
      <path
        id={id}
        style={{ ...style, strokeWidth: 1.5 }}
        className="react-flow__edge-path"
        d={edgePath}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      {isHovered && (
        <foreignObject
          width={foreignObjectSize}
          height={foreignObjectSize}
          x={edgeCenter.x - foreignObjectSize / 2}
          y={edgeCenter.y - foreignObjectSize / 2}
          className="edgebutton-foreignobject"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <IconButton
            onClick={(event) => onEdgeClick(event, id)}
            size="small"
            sx={{
              width: '20px',
              height: '20px',
              bgcolor: 'white',
              border: '1px solid #ddd',
              '&:hover': {
                bgcolor: '#ffebee'
              }
            }}
          >
            <DeleteIcon sx={{ fontSize: 14, color: '#f44336' }} />
          </IconButton>
        </foreignObject>
      )}
    </>
  );
});

CustomEdge.displayName = 'CustomEdge';

const edgeTypes = {
  custom: CustomEdge,
};

const Canvas = forwardRef(({ onSimulate }, ref) => {
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.2 });
    }
  }, [nodes, edges, reactFlowInstance]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ 
      ...params, 
      type: 'custom', 
      animated: true, 
      style: { stroke: '#1976d2', strokeWidth: 1.5 }
    }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const getNodeOffset = (nodes) => {
    const nodeWidth = 250;
    const nodeHeight = 100;
    const padding = 20;
    const existingPositions = nodes.map(n => ({ x: n.position.x, y: n.position.y }));
    
    let offset = { x: 0, y: 0 };
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      let hasOverlap = false;
      for (const pos of existingPositions) {
        if (Math.abs(pos.x - offset.x) < nodeWidth + padding && 
            Math.abs(pos.y - offset.y) < nodeHeight + padding) {
          hasOverlap = true;
          break;
        }
      }

      if (!hasOverlap) {
        return offset;
      }

      offset.x += nodeWidth + padding;
      if (offset.x > (nodeWidth + padding) * 3) {
        offset.x = 0;
        offset.y += nodeHeight + padding;
      }
      attempts++;
    }

    return { x: Math.random() * 100, y: Math.random() * 100 };
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const reactFlowBounds = reactFlowInstance.getViewport();
      const basePosition = {
        x: (event.clientX - reactFlowBounds.x) / reactFlowBounds.zoom,
        y: (event.clientY - reactFlowBounds.y) / reactFlowBounds.zoom
      };

      const offset = getNodeOffset(reactFlowInstance.getNodes());
      const position = {
        x: basePosition.x + offset.x,
        y: basePosition.y + offset.y
      };

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
          ...(type === 'webhook' && {
            method: 'POST',
            endpoint: '/webhook/endpoint',
            description: 'Receives incoming data'
          }),
          ...(type === 'agent' && {
            provider: 'openai',
            model: 'gpt-4-turbo-preview',
            temperature: 0.7,
            instructions: 'Process the input and generate a response'
          }),
          ...(type === 'twitter' && {
            operation: 'postTweet',
            description: 'Interacts with Twitter API'
          })
        }
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const clearCanvas = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  const loadTemplate = useCallback((template) => {
    if (!template || !template.nodes || !template.edges) {
      console.error('Invalid template format');
      return;
    }

    // Clear existing canvas
    clearCanvas();

    // Load template nodes and edges
    const newNodes = template.nodes.map(node => ({
      ...node,
      id: `${node.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` // Ensure unique IDs
    }));

    const nodeIdMap = {};
    newNodes.forEach(node => {
      nodeIdMap[node.id.split('-')[0]] = node.id;
    });

    const newEdges = template.edges.map(edge => ({
      ...edge,
      id: `${edge.source}-${edge.target}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      source: nodeIdMap[edge.source.split('-')[0]],
      target: nodeIdMap[edge.target.split('-')[0]]
    }));

    setNodes(newNodes);
    setEdges(newEdges);

    // Fit view after a short delay to ensure nodes are rendered
    setTimeout(() => {
      if (reactFlowInstance) {
        reactFlowInstance.fitView({ padding: 0.2 });
      }
    }, 100);
  }, [clearCanvas, setNodes, setEdges, reactFlowInstance]);

  useImperativeHandle(ref, () => ({
    clearCanvas,
    loadTemplate
  }), [clearCanvas, loadTemplate]);

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%', 
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#fafafa',
    }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        deleteKeyCode="Delete"
        nodesDraggable={true}
        nodesConnectable={true}
        snapToGrid={true}
        snapGrid={[20, 20]}
        fitView
        minZoom={0.1}
        maxZoom={4}
        style={{ width: '100%', height: '100%' }}
      >
        <Controls />
        <Panel position="top-right">
          <IconButton 
            onClick={clearCanvas}
            sx={{ 
              bgcolor: 'white',
              '&:hover': { bgcolor: '#ffebee' }
            }}
          >
            <DeleteIcon sx={{ color: '#f44336' }} />
          </IconButton>
        </Panel>
      </ReactFlow>
    </Box>
  );
});

const WrappedCanvas = forwardRef((props, ref) => (
  <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
    <ReactFlowProvider>
      <Canvas {...props} ref={ref} />
    </ReactFlowProvider>
  </Box>
));

WrappedCanvas.displayName = 'WrappedCanvas';
Canvas.displayName = 'Canvas';

export default WrappedCanvas;
