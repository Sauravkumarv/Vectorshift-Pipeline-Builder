import React, { useState, useRef, useCallback, useMemo } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from '../store/pipelineStore';
import PipelineToolbar from './PipelineToolbar';

// Import all node types
import InputNode_temp from '../nodes/InputNode_temp';
import OutputNode from '../nodes/OutputNode';
import LLMNode from '../nodes/LLMNode';
import TextNode from '../nodes/TextNode';
import TransformNode from '../nodes/TransformNode';
import FilterNode from '../nodes/FilterNode';
import AggregateNode from '../nodes/AggregateNode';
import ConditionalNode from '../nodes/ConditionalNode';
import DelayNode from '../nodes/DelayNode';

import 'reactflow/dist/style.css';
import '../styles/reactflow.css';
import '../styles/global.css';

const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  const { 
    nodes, 
    edges, 
    getNodeID, 
    addNode, 
    onNodesChange, 
    onEdgesChange, 
    onConnect 
  } = useStore();

  const nodeTypes = useMemo(() => ({
    input: InputNode_temp,
    output: OutputNode,
    llm: LLMNode,
    text: TextNode,
    transform: TransformNode,
    filter: FilterNode,
    aggregate: AggregateNode,
    conditional: ConditionalNode,
    delay: DelayNode
  }), []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const type = appData?.nodeType;

      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);
      const newNode = {
        id: nodeID,
        type,
        position,
        data: { id: nodeID, nodeType: type },
      };

      addNode(newNode);
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="app-container">
      <PipelineToolbar />
      <div ref={reactFlowWrapper} className="pipeline-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          fitView
          proOptions={{ hideAttribution: true }}
          deleteKeyCode={['Backspace', 'Delete']}
          multiSelectionKeyCode="Shift"
        >
          <Background color="#475569" gap={20} size={1} />
          <Controls />
          <MiniMap 
            nodeColor={(node) => {
              const colors = {
                input: '#3b82f6',
                output: '#f59e0b',
                llm: '#8b5cf6',
                text: '#10b981',
                transform: '#ec4899',
                filter: '#06b6d4',
                aggregate: '#84cc16',
                conditional: '#f97316',
                delay: '#6366f1'
              };
              return colors[node.type] || '#8b5cf6';
            }}
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default PipelineUI;