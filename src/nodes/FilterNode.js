import { createNode } from '../utils/nodeFactory';
import { nodeConfigs } from './nodeConfigs';

const FilterNode = createNode('filter', nodeConfigs.filter);

export default FilterNode;