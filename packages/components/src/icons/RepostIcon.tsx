import React from 'react';
// @ts-ignore
import { Svg, Rect, G, Path, Circle } from '@react-platform/svg';

export const RepostIcon = ({ fill = '#000000' }) => (// @ts-ignore
  <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" overflow="visible">
    <Path d="M5.56098 5L10.122 9.56098H6.63415V16H13.6098L15.7561 18.1463H6.63415C5.44875 18.1463 4.4878 17.1854 4.4878 16V9.56098H1L5.56098 5ZM18.439 18.4146L13.878 13.8537H17.3659V7.41463H10.3902L8.2439 5.26829H17.3659C18.5512 5.26829 19.5122 6.22924 19.5122 7.41463V13.8537H23L18.439 18.4146Z" fill={fill} />
  </Svg>
);

export default RepostIcon;
