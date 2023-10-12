import { useQuery } from '@apollo/client';

import { graphql } from '../../graphql/types';
import UserInvoice from './UserInvoice';
import { useEffect } from 'react';

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

const UserLiveInvoice = ({ id, price, zcashaddress, memo, onPaymentSuccess }) => {
  const { data, loading, error } = useQuery(GET_INVOICE, {
    variables: { id },
    pollInterval: 5,
  });
// pollInterval: 500,
  const invoice = data?.invoice?.__typename === 'Invoice' ? data?.invoice : null;

  useEffect(() => {
    if (invoice?.status === 'confirmed') {
      onPaymentSuccess();
    }
  }, [invoice?.status])

  return (
    <>
      {!invoice ? (
        <></>
      ) : (
        <UserInvoice
          price={price}
          zcashaddress={zcashaddress}
          memo={memo}
        />
      )}
    </>
  )
};

export default UserLiveInvoice;
