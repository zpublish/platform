import NextLink from 'next/link';
import { ComponentProps } from 'react';

export default function Link(props: ComponentProps<typeof NextLink>) {
  return (
    <NextLink {...props} style={{ cursor: 'pointer', display: 'flex', ...props.style }} />
  )
}
