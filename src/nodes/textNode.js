import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store/pipelineStore';
import { extractVariables } from '../utils/variableExtractor';
import '../styles/nodes.css';

const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const deleteNode = useStore((state) => state.deleteNode);
  const [textValue, setTextValue] = useState(data.text || '');
  const textareaRef = useRef(null);

  // Extract variables from text (e.g., {{ variable }})
  const extractedVars = useMemo(() => {
    return extractVariables(textValue);
  }, [textValue]);

  const handleTextChange = (value) => {
    setTextValue(value);
    updateNodeField(id, 'text', value);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNode(id);
  };

  // Calculate dynamic width based on content
  const calculateDimensions = () => {
    const minWidth = 250;
    const maxWidth = 500;
    const minHeight = 120;
    const maxHeight = 400;

    // Calculate width based on longest line
    const lines = textValue.split('\n');
    const longestLine = lines.reduce((max, line) => 
      line.length > max.length ? line : max, '');
    const dynamicWidth = Math.min(
      Math.max(minWidth, longestLine.length * 8 + 80),
      maxWidth
    );

    // Calculate height based on number of lines
    const lineCount = lines.length;
    const dynamicHeight = Math.min(
      Math.max(minHeight, lineCount * 22 + 100),
      maxHeight
    );

    return { width: dynamicWidth, height: dynamicHeight };
  };

  const { width, height } = calculateDimensions();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textValue]);

  return (
    <div 
      className="text-node dynamic-text-node" 
      style={{ width: `${width}px`, minHeight: `${height}px` }}
    >
      {/* Delete Button */}
      <button 
        className="node-delete-button" 
        onClick={handleDelete}
        title="Delete node (or press Delete/Backspace)"
      >
        ×
      </button>

      <div className="node-header text-node-header">
        <span className="node-header-icon">📝</span>
        <span>Text</span>
      </div>

      <div className="node-body text-node-body">
        <label className="node-field-label text-node-label">
          Content (use {'{{ variable }}'} for inputs)
        </label>
        <textarea
          ref={textareaRef}
          value={textValue}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Enter text with {{ variables }}..."
          className="node-textarea text-node-textarea"
        />
        {extractedVars.length > 0 && (
          <div className="text-node-variables">
            <span className="variables-label">Variables:</span>
            <div className="variables-list">
              {extractedVars.map((varName, idx) => (
                <span key={idx} className="variable-tag">
                  {varName}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Input Handles for Variables */}
      {extractedVars.map((varName, idx) => (
        <React.Fragment key={`var-${varName}`}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${varName}`}
            style={{
              top: `${((idx + 1) * 100) / (extractedVars.length + 1)}%`,
              background: '#10b981',
              width: '14px',
              height: '14px'
            }}
          />
          <div 
            className="handle-label handle-label-left"
            style={{
              top: `${((idx + 1) * 100) / (extractedVars.length + 1)}%`,
              transform: 'translateY(-50%)'
            }}
          >
            {varName}
          </div>
        </React.Fragment>
      ))}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          top: '50%',
          background: '#10b981',
          width: '14px',
          height: '14px'
        }}
      />
      <div 
        className="handle-label handle-label-right"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        output
      </div>
    </div>
  );
};

export default TextNode;