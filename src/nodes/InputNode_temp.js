import { createNode } from '../utils/nodeFactory';
import { nodeConfigs } from './nodeConfigs';

const InputNode = createNode('input', nodeConfigs.input);

export default InputNode;