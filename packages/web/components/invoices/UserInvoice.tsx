import { InvoiceElement } from '@elemental-pay/components';

import { graphql } from '../../graphql/types';
import { copyTextToClipboard } from '../../utils';

const WalletButtonContainer = ({ href, children, ...props }) => (
  <a href={href} style={{ display: 'flex', flex: 1 }} {...props}>
    {children}
  </a>
);

const UserInvoice = ({ price, zcashaddress, memo }) => {

  return (
    <>
      <InvoiceElement
        currency="ZEC"
        amount={price}
        address={zcashaddress}
        memo={memo}
        onCopyPress={async () => {
          if (!zcashaddress) {
            return;
          }
          await copyTextToClipboard(`zcash:${zcashaddress}?amount=${price}&memo=${memo}`);
        }}
        // currency=
        components={{
          WalletButtonContainer: (props) => <WalletButtonContainer href={`zcash:${zcashaddress}?amount=${price}&memo=${memo}`} {...props} />
        }}
      />
    </>
  )
};

export default UserInvoice;
