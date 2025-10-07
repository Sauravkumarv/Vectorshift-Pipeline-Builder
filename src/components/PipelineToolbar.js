import React from 'react';
import DraggableNode from './DraggableNode';
import { useStore } from '../store/pipelineStore';
import '../styles/toolbar.css';

const PipelineToolbar = () => {
  const { nodes, edges } = useStore();

  const nodeList = [
    { type: 'input', label: 'Input', icon: '📥', color: '#3b82f6', colorDark: '#2563eb' },
    { type: 'output', label: 'Output', icon: '📤', color: '#f59e0b', colorDark: '#d97706' },
    { type: 'llm', label: 'LLM', icon: '🤖', color: '#8b5cf6', colorDark: '#7c3aed' },
    { type: 'text', label: 'Text', icon: '📝', color: '#10b981', colorDark: '#059669' },
    { type: 'transform', label: 'Transform', icon: '🔄', color: '#ec4899', colorDark: '#db2777' },
    { type: 'filter', label: 'Filter', icon: '🔍', color: '#06b6d4', colorDark: '#0891b2' },
    { type: 'aggregate', label: 'Aggregate', icon: '📊', color: '#84cc16', colorDark: '#65a30d' },
    { type: 'conditional', label: 'Conditional', icon: '⚡', color: '#f97316', colorDark: '#ea580c' },
    { type: 'delay', label: 'Delay', icon: '⏱️', color: '#6366f1', colorDark: '#4f46e5' }
  ];

  const handleSubmit = () => {
    const pipeline = {
      nodes: nodes,
      edges: edges,
      timestamp: new Date().toISOString()
    };
    
    console.log('Pipeline Data:', pipeline);
    alert('Pipeline submitted! Check console for details.');
    
    // You can add API call here to submit to backend
    // Example: fetch('/api/pipeline', { method: 'POST', body: JSON.stringify(pipeline) })
  };

  return (
    <div className="pipeline-toolbar">
      <div className="toolbar-header">
        <h2 className="toolbar-title">
          <span className="toolbar-title-icon">🎨</span>
          Pipeline Nodes
        </h2>
        <button className="submit-button" onClick={handleSubmit}>
          <span className="submit-icon">✓</span>
          Submit Pipeline
        </button>
      </div>
      <div className="toolbar-nodes">
        {nodeList.map((node) => (
          <DraggableNode key={node.type} {...node} />
        ))}
      </div>
      <div className="toolbar-info">
        <span className="info-badge">
          <span className="info-icon">📦</span>
          {nodes.length} Nodes
        </span>
        <span className="info-badge">
          <span className="info-icon">🔗</span>
          {edges.length} Connections
        </span>
        <span className="info-tip">
          <span className="info-icon">💡</span>
          Press <kbd>Delete</kbd> or <kbd>Backspace</kbd> to remove selected nodes
        </span>
      </div>
    </div>
  );
};

export default PipelineToolbar;