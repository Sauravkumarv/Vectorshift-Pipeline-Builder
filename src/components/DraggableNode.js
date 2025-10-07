import React from 'react';
import '../styles/toolbar.css';

const DraggableNode = ({ type, label, icon, color, colorDark }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node"
      style={{ 
        '--node-color': color,
        '--node-color-dark': colorDark,
        background: `linear-gradient(135deg, ${colorDark}, ${color})`
      }}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <span className="draggable-node-icon">{icon}</span>
      <span>{label}</span>
    </div>
  );
};

export default DraggableNode;