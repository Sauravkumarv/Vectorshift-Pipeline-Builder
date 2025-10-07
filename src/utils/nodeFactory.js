// Factory pattern for creating nodes from configuration
import React from 'react';
import BaseNode from '../components/BaseNode';

export const createNode = (type, config) => {
  return ({ id, data }) => <BaseNode id={id} data={data} config={config} />;
};