import React from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store/pipelineStore';
import '../styles/nodes.css';

const BaseNode = ({ id, data, config }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const deleteNode = useStore((state) => state.deleteNode);
  
  const {
    title,
    icon,
    color = '#8b5cf6',
    colorClass = 'node-color-purple',
    fields = [],
    inputs = [],
    outputs = [],
  } = config;

  const handleFieldChange = (fieldName, value) => {
    updateNodeField(id, fieldName, value);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNode(id);
  };

  return (
    <div className={`base-node ${colorClass}`}>
      {/* Delete Button */}
      <button 
        className="node-delete-button" 
        onClick={handleDelete}
        title="Delete node (or press Delete/Backspace)"
      >
        ×
      </button>

      <div className="node-header">
        {icon && <span className="node-header-icon">{icon}</span>}
        <span>{title}</span>
      </div>

      <div className="node-body">
        {fields.map((field, idx) => (
          <div key={idx} className="node-field">
            <label className="node-field-label">{field.label}</label>
            
            {field.type === 'text' && (
              <input
                type="text"
                value={data[field.name] || ''}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="node-input"
              />
            )}
            
            {field.type === 'textarea' && (
              <textarea
                value={data[field.name] || ''}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                rows={field.rows || 3}
                className="node-textarea"
              />
            )}
            
            {field.type === 'select' && (
              <select
                value={data[field.name] || field.options[0].value}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                className="node-select"
              >
                {field.options.map((opt, i) => (
                  <option key={i} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            )}
            
            {field.type === 'number' && (
              <input
                type="number"
                value={data[field.name] || field.default || 0}
                onChange={(e) => handleFieldChange(field.name, parseFloat(e.target.value))}
                placeholder={field.placeholder}
                min={field.min}
                max={field.max}
                step={field.step}
                className="node-input"
              />
            )}
          </div>
        ))}
      </div>

      {/* Input Handles with Labels */}
      {inputs.map((input, idx) => {
        const topPosition = `${((idx + 1) * 100) / (inputs.length + 1)}%`;
        return (
          <React.Fragment key={`input-${idx}`}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${input.id}`}
              style={{
                top: topPosition,
                background: color,
                width: '14px',
                height: '14px'
              }}
            />
            <div 
              className="handle-label handle-label-left"
              style={{
                top: topPosition,
                transform: 'translateY(-50%)'
              }}
            >
              {input.label || input.id}
            </div>
          </React.Fragment>
        );
      })}

      {/* Output Handles with Labels */}
      {outputs.map((output, idx) => {
        const topPosition = `${((idx + 1) * 100) / (outputs.length + 1)}%`;
        return (
          <React.Fragment key={`output-${idx}`}>
            <Handle
              type="source"
              position={Position.Right}
              id={`${id}-${output.id}`}
              style={{
                top: topPosition,
                background: color,
                width: '14px',
                height: '14px'
              }}
            />
            <div 
              className="handle-label handle-label-right"
              style={{
                top: topPosition,
                transform: 'translateY(-50%)'
              }}
            >
              {output.label || output.id}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default BaseNode;