import { type NextRequest } from 'next/server';

import * as Posts from '@/data/board_posts/posts.model';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface Transfer {
  address: string;
  amount: number;
  confirmations: number;
  height: number;
  fee: number;
  note: string;
  suggested_confirmations_threshold: number;
  timestamp: number;
  txid: string;
}

async function onTransactionUpdated(cryptoCode: string, txid: string) {
  if (cryptoCode !== 'zec') {
    throw new Error('wrong crypto code')
  }

  try {
    // console.log(`${process.env.ZEC_WALLET_DAEMON_URI}/get_transfer_by_txid`)
    // console.log(txid);

    const res = await fetch(`${process.env.ZEC_WALLET_DAEMON_URI}/get_transfer_by_txid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account_index: 0,
        txid,
      }),
    });
    const data = await res.json();
    const { transfer }: { transfer: Transfer } = data;
    const timestamp = Math.floor(Date.now() / 1000);

    await Posts.add({
      memo: transfer.note,
      txid: transfer.txid,
      amount: transfer.amount,
      datetime: String(timestamp),
    })
  } catch (err) {
    console.log({ err });
    return false;
  }


  return true;
}

// ?cryptoCode=zec&hash=
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const cryptoCode = searchParams.get('cryptoCode')
  const txHash = searchParams.get('hash');

  console.log({ cryptoCode, txHash })

  if (!cryptoCode || !txHash) {
    return Response.error();
  }

  // await delay(1000);
  onTransactionUpdated(cryptoCode, txHash)
  console.log('Response.json')

  return Response.json({});
}
