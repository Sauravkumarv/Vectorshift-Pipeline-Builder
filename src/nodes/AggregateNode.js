import { createNode } from '../utils/nodeFactory';
import { nodeConfigs } from './nodeConfigs';

const AggregateNode = createNode('aggregate', nodeConfigs.aggregate);

export default AggregateNode;