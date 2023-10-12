import { useQuery } from '@apollo/client';

import { graphql } from '../../graphql/types'
import UserInvoice from './UserInvoice';


const UserStaticInvoice = ({ id, price, zcashaddress, memo }) => {
  return (
    <>
      <UserInvoice
        price={price}
        zcashaddress={zcashaddress}
        memo={memo}
      />
    </>
  )
};

export default UserStaticInvoice;
