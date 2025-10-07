import { createNode } from '../utils/nodeFactory';
import { nodeConfigs } from './nodeConfigs';

const ConditionalNode = createNode('conditional', nodeConfigs.conditional);

export default ConditionalNode;