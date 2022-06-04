import React from 'react';
// @ts-ignore
import { Svg, Rect, G, Path, Circle } from '@react-platform/svg';

const PollIcon = ({ fill = '#000', width, height, size = 24 }: {
  width?: number, height?: number, size?: number, fill: string,
}) => (// @ts-ignore
  <Svg xmlns="http://www.w3.org/2000/svg" height={height || size} viewBox="0 0 24 24" width={height || size}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill={fill} />
  </Svg>
);

export default PollIcon;

