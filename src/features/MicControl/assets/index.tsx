import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';

function MicOff(props: any) {
  return (
    <Svg viewBox="0 0 12.691 12.691" {...props}>
      <Path d="M0 0h12.691v12.691H0zm0 0h12.691v12.691H0z" fill="none" />
      <Path
        d="M10.062 5.819h-.9a2.607 2.607 0 01-.231 1.087l.654.652a3.431 3.431 0 00.477-1.739zm-2.131.087c0-.029.008-.058.008-.087V2.637a1.593 1.593 0 00-3.185 0v.1zm-5.686-4.33l-.677.673 3.19 3.191v.382a1.589 1.589 0 001.587 1.591 1.638 1.638 0 00.345-.04l.881.88a2.928 2.928 0 01-1.226.273 2.753 2.753 0 01-2.813-2.704h-.9a3.7 3.7 0 003.185 3.564v1.737h1.062V9.384a3.765 3.765 0 001.348-.48l2.222 2.22.677-.674z"
        fill={props.fill}
      />
    </Svg>
  );
}

function MicOn(props: any) {
  return (
    <Svg fill="#FFF" viewBox="0 0 15.238 16" {...props}>
      <Defs>
        <ClipPath id="a">
          <Path transform="translate(.235 .255)" d="M0 0H15.238V16H0z" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#a)">
        <Path
          d="M6.765 8.909a2.225 2.225 0 002.229-2.224l.007-4.45a2.236 2.236 0 00-4.472 0v4.448a2.232 2.232 0 002.236 2.226zm3.95-2.224a3.856 3.856 0 01-3.95 3.781 3.856 3.856 0 01-3.95-3.781H1.548a5.182 5.182 0 004.472 4.982v2.431h1.491v-2.431a5.182 5.182 0 004.472-4.982z"
          transform="translate(-.235 -.255) translate(1.174 .899)"
        />
        <Path
          d="M0 .567h13.531v13.531H0z"
          transform="translate(-.235 -.255) translate(1.174 .899)"
          fill="none"
        />
      </G>
    </Svg>
  );
}

export { MicOff, MicOn };
