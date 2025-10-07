import BaseNode from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM Node"
      borderColor="#8b5cf6"
      inputHandles={[
        { id: 'system', top: '33%' },
        { id: 'prompt', top: '66%' },
      ]}
      outputHandles={[{ id: 'response', top: '50%' }]}
    >
      <span style={{ fontSize: "12px", color: "#374151" }}>Handles system & prompt inputs</span>
    </BaseNode>
  );
};
