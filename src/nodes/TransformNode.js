import { createNode } from '../utils/nodeFactory';
import { nodeConfigs } from './nodeConfigs';

const TransformNode = createNode('transform', nodeConfigs.transform);

export default TransformNode;