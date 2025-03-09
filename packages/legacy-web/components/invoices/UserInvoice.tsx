import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { InvoiceElement } from '@elemental-pay/components';

import { graphql } from '../../graphql/types';
// import UserInvoice from './UserInvoice';
import { CurrencyCode } from '../../graphql/types/graphql';
// import UserLiveInvoice from './UserLiveInvoice';
import { copyTextToClipboard } from '../../utils';
import { WalletButtonContainer } from './WalletButtonContainer';
import { Box, Text } from 'elemental-react';

// invoice = await createInvoice({ variables: { input: { address: userData?.zcashaddress, currency: CurrencyCode.Zec, price: price }}});

const CREATE_INVOICE = graphql(`
  mutation createInvoice($input: InvoiceInput!) {
    createInvoice(input: $input) {
      id
      invoiceId
      status
      price
      currency
    }
  }
`);

const GET_INVOICE = graphql(`
  query invoice($id: ID!) {
    invoice(id: $id) {
      __typename
      ...on Invoice {
        id
        price
        currency
        status
      }
      ...on InvoiceNotFoundError {
        message
        code
      }
    }
  }
`);

const MIN_POLL_SECONDS = 1;
const MAX_POLL_SECONDS = 10;

const UserInvoice = ({ id, price, zcashaddress, memo, onPaymentSuccess }) => {
  // const { data, loading, error } = useQuery(GET_INVOICE, {
  //   variables: { id },
  //   pollInterval: 5,
  // });
  const [shouldStartPolling, setShouldStartPolling] = useState<boolean>(false);
  const [pollingInterval, setPollingInterval] = useState<number>(MIN_POLL_SECONDS * 1000); // Initial interval: 1 second

  const [invoiceId, setInvoiceId] = useState<string | null>(null);
  const { data, loading, error, startPolling, stopPolling } = useQuery(GET_INVOICE, {
    variables: { id: id || '' },
    skip: !shouldStartPolling,
  });
  const [createInvoice] = useMutation(CREATE_INVOICE);
  // const { data } = await createInvoice({ variables: { input: { address: userData?.zcashaddress, currency: CurrencyCode.Zec, price: price }}});
// pollInterval: 500,
  // const invoice = data?.invoice?.__typename === 'Invoice' ? data?.invoice : null;
  const { invoice } = data || {};

  const startPollingWithLogarithmicBackoff = () => {
    startPolling(pollingInterval);

    // Increase the interval logarithmically, with a cap at 10 seconds
    // setPollingInterval((prevInterval) => Math.min(prevInterval * 2, MAX_POLL_SECONDS * 1000));
  };

  // const onLoad = async () => {
  //   const { data, errors } = await createInvoice({ variables: { input: { address: zcashaddress, currency: CurrencyCode.Zec, price: price }}});
  //   if (errors) {}
  //   if (data?.createInvoice?.status === 'pending' && typeof data?.createInvoice?.id === 'string') {
  //     setInvoiceId(data?.createInvoice?.id);
  //   }
  // }

  useEffect(() => {
    if (shouldStartPolling) {
      startPolling(pollingInterval);
      // startPollingWithLogarithmicBackoff();
    }

    return () => {
      stopPolling();
    };
  }, [shouldStartPolling, pollingInterval]);

  useEffect(() => {
    if (invoice?.__typename === 'Invoice' && invoice?.status === 'paid') {
      onPaymentSuccess();
    }
  }, [invoice])

  useEffect(() => {
    if (/*invoice?.__typename === 'Invoice' && invoice.id && */id && !shouldStartPolling) {
      setShouldStartPolling(true);
      // startPolling(pollingInterval);
  
      // })
    }
    // return () => {
    //   stopPolling();
    // };
  }, [id, startPolling, stopPolling]);

  return (
    <>
      <Box>
        {/* {invoice?.__typename === 'Invoice' && invoice?.id && ( */}
        {id && (
          <Text center py={20}>
            Status: {invoice?.__typename === 'Invoice' && invoice?.status === 'paid' ? 'Paid' : 'Waiting'}
          </Text>
        )}
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
      </Box>
      {/* {!invoice ? (
        <></>
      ) : (
        <UserInvoice
          price={price}
          zcashaddress={zcashaddress}
          memo={memo}
        />
      )} */}
    </>
  )
};

export default UserInvoice;
