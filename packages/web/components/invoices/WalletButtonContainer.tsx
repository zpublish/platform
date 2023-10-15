export const WalletButtonContainer = ({ href, children, ...props }) => (
  <a href={href} style={{ display: 'flex', flex: 1 }} {...props}>
    {children}
  </a>
);
