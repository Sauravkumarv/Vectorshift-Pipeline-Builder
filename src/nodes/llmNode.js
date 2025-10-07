import { createNode } from '../utils/nodeFactory';
import { nodeConfigs } from './nodeConfigs';

const LLMNode = createNode('llm', nodeConfigs.llm);

export default LLMNode;