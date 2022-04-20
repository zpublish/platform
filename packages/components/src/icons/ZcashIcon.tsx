import React from 'react';
import { Svg, G, Rect, Path, Circle } from '@react-platform/svg';

export const ZcashIcon = ({ fill = '#231F20' }) => (// @ts-ignore
  <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" overflow="visible">
    <G id="Page-1_1_">
      <G id="_x2F_microposts:mobile_1_" transform="translate(-320 -900)">
        <G id="_x3C_MicroPost_x3E_-Copy_1_" transform="translate(0 497)">
          <G id="Group-19_1_" transform="translate(74 403)">
            <G id="Group_1_" transform="translate(246)">
              <Path id="Shape_1_" fill={fill} d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm0 22.02C6.47 22.02 1.98 17.53 1.98 12S6.47 1.98 12 1.98 22.02 6.47 22.02 12 17.53 22.02 12 22.02z"/>
              <Circle id="Oval_1_" cx="12.13" cy="12.13" r="9.49" fill="#f4b728"/>
              <Path id="Path_1_" d="M7.91 15.71v1.82h3.23v1.99h1.98v-1.99h3.23v-2.41h-5.01l5.01-6.83V6.47h-3.23V4.48h-1.98v1.99H7.91v2.41h5.01z"/>
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default ZcashIcon;
