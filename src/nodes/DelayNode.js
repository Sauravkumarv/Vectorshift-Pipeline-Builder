import { createNode } from '../utils/nodeFactory';
import { nodeConfigs } from './nodeConfigs';

const DelayNode = createNode('delay', nodeConfigs.delay);

export default DelayNode;