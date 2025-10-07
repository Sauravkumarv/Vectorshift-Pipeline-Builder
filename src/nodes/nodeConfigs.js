// Central configuration file for all nodes
export const nodeConfigs = {
  input: {
    title: 'Input',
    icon: '📥',
    color: '#3b82f6',
    colorClass: 'node-color-blue',
    fields: [
      { 
        name: 'inputName', 
        label: 'Name', 
        type: 'text', 
        placeholder: 'Input name...' 
      },
      { 
        name: 'inputType', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' },
          { value: 'Number', label: 'Number' }
        ]
      }
    ],
    outputs: [{ id: 'value', label: 'output' }]
  },

  output: {
    title: 'Output',
    icon: '📤',
    color: '#f59e0b',
    colorClass: 'node-color-orange',
    fields: [
      { 
        name: 'outputName', 
        label: 'Name', 
        type: 'text', 
        placeholder: 'Output name...' 
      },
      { 
        name: 'outputType', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' },
          { value: 'JSON', label: 'JSON' }
        ]
      }
    ],
    inputs: [{ id: 'value', label: 'input' }]
  },

  llm: {
    title: 'LLM',
    icon: '🤖',
    color: '#8b5cf6',
    colorClass: 'node-color-purple',
    fields: [
      { 
        name: 'model', 
        label: 'Model', 
        type: 'select',
        options: [
          { value: 'gpt-4', label: 'GPT-4' },
          { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
          { value: 'claude-3', label: 'Claude 3' }
        ]
      },
      { 
        name: 'temperature', 
        label: 'Temperature', 
        type: 'number',
        min: 0,
        max: 2,
        step: 0.1,
        default: 0.7
      }
    ],
    inputs: [
      { id: 'system', label: 'system' }, 
      { id: 'prompt', label: 'prompt' }
    ],
    outputs: [{ id: 'response', label: 'response' }]
  },

  transform: {
    title: 'Transform',
    icon: '🔄',
    color: '#ec4899',
    colorClass: 'node-color-pink',
    fields: [
      { 
        name: 'operation', 
        label: 'Operation', 
        type: 'select',
        options: [
          { value: 'uppercase', label: 'Uppercase' },
          { value: 'lowercase', label: 'Lowercase' },
          { value: 'reverse', label: 'Reverse' },
          { value: 'trim', label: 'Trim' }
        ]
      }
    ],
    inputs: [{ id: 'input', label: 'input' }],
    outputs: [{ id: 'output', label: 'output' }]
  },

  filter: {
    title: 'Filter',
    icon: '🔍',
    color: '#06b6d4',
    colorClass: 'node-color-cyan',
    fields: [
      { 
        name: 'condition', 
        label: 'Condition', 
        type: 'text', 
        placeholder: 'e.g., length > 10' 
      },
      { 
        name: 'filterType', 
        label: 'Type', 
        type: 'select',
        options: [
          { value: 'include', label: 'Include' },
          { value: 'exclude', label: 'Exclude' }
        ]
      }
    ],
    inputs: [{ id: 'data', label: 'data' }],
    outputs: [{ id: 'filtered', label: 'filtered' }]
  },

  aggregate: {
    title: 'Aggregate',
    icon: '📊',
    color: '#84cc16',
    colorClass: 'node-color-lime',
    fields: [
      { 
        name: 'function', 
        label: 'Function', 
        type: 'select',
        options: [
          { value: 'sum', label: 'Sum' },
          { value: 'average', label: 'Average' },
          { value: 'count', label: 'Count' },
          { value: 'concat', label: 'Concatenate' }
        ]
      }
    ],
    inputs: [
      { id: 'input1', label: 'input1' }, 
      { id: 'input2', label: 'input2' }, 
      { id: 'input3', label: 'input3' }
    ],
    outputs: [{ id: 'result', label: 'result' }]
  },

  conditional: {
    title: 'Conditional',
    icon: '⚡',
    color: '#f97316',
    colorClass: 'node-color-orange-alt',
    fields: [
      { 
        name: 'condition', 
        label: 'Condition', 
        type: 'textarea', 
        placeholder: 'if (value > 10) ...', 
        rows: 2 
      }
    ],
    inputs: [{ id: 'input', label: 'input' }],
    outputs: [
      { id: 'true', label: 'true' }, 
      { id: 'false', label: 'false' }
    ]
  },

  delay: {
    title: 'Delay',
    icon: '⏱️',
    color: '#6366f1',
    colorClass: 'node-color-indigo',
    fields: [
      { 
        name: 'duration', 
        label: 'Duration (ms)', 
        type: 'number', 
        min: 0, 
        step: 100, 
        default: 1000 
      }
    ],
    inputs: [{ id: 'input', label: 'input' }],
    outputs: [{ id: 'output', label: 'output' }]
  }
};