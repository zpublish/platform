import { Text as _Text } from 'elemental-react';
import { ComponentProps, CSSProperties } from 'react';

type TextProps = ComponentProps<typeof _Text> & { pointer?: boolean, style?: CSSProperties }

// FIXME: any type
const Text = ({ pointer, style, ...props }: any) => {
  return (
    <_Text 
      display="inline"
      style={pointer ? { ...style, cursor: 'pointer' } : style}
      {...props}
    />
  );
};

// interface TextLinkProps extends TextProps {}
// type TextLinkProps = 

export const TextLink = (props: any) => {
  return (
    <Text
      pointer
      {...props}
    />
  );
};

export default Text;
