// react-image.d.ts
declare module 'react-image' {
  import * as React from 'react';

  export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string | string[];
    alt?: string;
    loader?: () => React.ReactElement;
    unloader?: () => React.ReactElement;
    className?: string;
    style?: React.CSSProperties;
    // Add any additional props specific to react-image here
  }

  export class Image extends React.Component<ImageProps> { }
  export default Image;
}
