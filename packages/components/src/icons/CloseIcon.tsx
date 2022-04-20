import React from 'react';
import { Svg, G, Rect } from '@react-platform/svg';

const CloseIcon = () => (
  <Svg width="48px" height="48px" viewBox="0 0 48 48">
    <G stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <G transform="translate(-16.000000, -16.000000)">
        <G transform="translate(16.000000, 16.000000)">
          <Rect x="0" y="0" width="48" height="48" />
          <G transform="translate(24.000000, 24.000000) rotate(-315.000000) translate(-24.000000, -24.000000) translate(4.000000, 22.000000)" fill="#000000">
            <Rect x="0" y="0" width="40" height="4" />
          </G>
          <G transform="translate(8.443651, 8.443651)" fill="#000000">
            <Rect transform="translate(15.556349, 15.556349) rotate(-45.000000) translate(-15.556349, -15.556349) " x="-4.44365081" y="13.5563492" width="40" height="4" />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default CloseIcon;
