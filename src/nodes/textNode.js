import { useState } from 'react';
import BaseNode from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  return (
    <BaseNode
      id={id}
      title="Text Node"
      borderColor="#f59e0b"
      outputHandles={[{ id: 'output', top: '50%' }]}
    >
      <label>
        Text:
        <input type="text" value={currText} onChange={(e) => setCurrText(e.target.value)} />
      </label>
    </BaseNode>
  );
};
