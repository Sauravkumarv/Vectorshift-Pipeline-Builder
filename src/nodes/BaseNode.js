// src/nodes/BaseNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/NodeStyles.css';

const BaseNode = ({
  id,
  title,
  borderColor,
  children,
  inputHandles = [],
  outputHandles = []
}) => {
  return (
    <div className="node-container" style={{ borderColor }}>
      <div className="node-header">{title}</div>

      <div className="node-body">
        {children}
      </div>

      {/* Input Handles */}
      {inputHandles.map((handle, index) => (
        <Handle
          key={index}
          type="target"
          position={Position.Left}
          id={`${id}-${handle.id}`}
          style={{ top: handle.top }}
        />
      ))}

      {/* Output Handles */}
      {outputHandles.map((handle, index) => (
        <Handle
          key={index}
          type="source"
          position={Position.Right}
          id={`${id}-${handle.id}`}
          style={{ top: handle.top }}
        />
      ))}
    </div>
  );
};

export default BaseNode;
