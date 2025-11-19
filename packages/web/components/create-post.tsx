'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { Icons } from "./icons";
import QRCode from "./ui/qrcode";
import { VStack } from "./ui/vstack";
import { Button } from "./ui/button";
import EllipsisBoxWrapper from "./ellipsis-box";
import { Textarea } from "./ui/textarea";
import { Text } from "./ui/text";
import { useResizeObserver } from "@/hooks/use-resize-observer";
import { HStack } from "./ui/hstack";

const copyTextToClipboard = async (text: string) => {
  if (!navigator.clipboard) {
    return;
  }
  return await navigator.clipboard.writeText(text);
}

const tileWidth = 246;
const zaddr = "u1mpqagwcatyxa6q5pkpvgmpv4swf6hs9qyq67f7qy4e6vwq6ev9samuy23qncymyva3ykuhwk2kk9p7a0avsnp20r4c0lky76q0yjdt3c5857h6vkeje9gzlqzzv96tmhfzy66wa6r4zuqhryc53rkhuu2h9dal0f8hvvdqvnwql06nj08xq4m3wmpr5mvnmxqeu9a6499aerjhk4efj";

const byteSize = (str: string) => new Blob([str]).size;

function memoToBytes(str: string): Uint8Array {
  return new TextEncoder().encode(str); // no padding
}

// 2️⃣ Convert bytes to Base64
function bytesToBase64(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }
  let binary = "";
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function encodeMemoForUri(str: string): string {
  const bytes = memoToBytes(str);
  const base64 = bytesToBase64(bytes);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export default function CreatePost({ isReply, isLiking, post, onClose, ...props }: {
  isReply?: boolean,
  isLiking?: boolean,
  post?: { txid: string },
  onClose?: () => void,
}) {
  const [memo, setMemo] = useState('');
  const [step, setStep] = useState(isLiking ? 1 : 0);
  const [error, setError] = useState('');
  // const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver({
    ref: elementRef,
    box: 'border-box',
  });
  const amount = '0.001';
  const placeholder = isLiking ? "" : (isReply ? "Write your reply here…" : "Write your post here…")
  const isPoll = false;
  const pollBuilder = {};
  const boardName = '';

  const encodedMemo = encodeMemoForUri(
    (isLiking && post) ? `LIKE::${post.txid}` : (
      isPoll ? `POLL::${JSON.stringify(pollBuilder)}`
      : `${boardName ? `BOARD::${boardName} ` : ''}${(isReply && post) ? `REPLY::${post.txid} ` : ""}${memo}`
    ) 
  );

  // const encodedMemo = toBase64(memo).replace('=', '');
  const zcashAddr = `zcash:${zaddr}?amount=${amount}&memo=${encodedMemo}`;

  // const encodedMemo = 
  //   isPoll ? toBase64("POLL::" + JSON.stringify(pollBuilder))
  //   : `${toBase64(`${boardName ? `BOARD::${boardName} ` : boardInput ? `BOARD::${boardInput} ` : ""}${isReply ? `REPLY::${post.id} ` : ""}${replyBody}`)}`

  useEffect(() => {
    if (byteSize(encodedMemo) >= 512) {
      setError('Zcash memos are capped to 512 bytes, please shorten your post.');
    // } else if (memo?.length > 280) {
    //   setError('Tweets are limited to 280 characters, please shorten your post.');
    } else {
      setError('');
    }
  }, [byteSize, encodedMemo]);

  // const elementRef = useResizeObserver(onResize);

  return (
    <>
      <div className="flex flex-1 w-full" ref={elementRef} />
      {{
        [0]: (
          <>
            <Textarea
              className="min-h-32 dark:bg-background text-black dark:text-white dark:border-2 dark:border-white"
              placeholder={placeholder}
              value={memo}
              onChange={e => setMemo(e.target.value)}
            />
            {error && (
              <span className="text-red-500">{error}</span>
            )}
            <div className="flex row bg-gradient-dark dark:bg-gradient w-full p-3 py-2">
              <div className="w-full">
                <div className="text-white dark:text-black">
                  <EllipsisBoxWrapper className="font-mono" text={zaddr} offset={6} />
                </div>
              </div>
              <Icons.miniQrCode className="ml-3 text-white dark:text-black" />
              <Icons.miniCopy
                className="ml-2 text-primary"
                style={{ filter: 'drop-shadow(1px 1px 0px rgba(0, 0, 0, .7))' }}
                onClick={() => copyTextToClipboard(zcashAddr)}
              />
            </div>
            <div className="flex w-full row justify-between">
              <div className="flex flex-1" />
              <Button variant="secondary" className="text-black" onClick={() => !error && setStep(1)} disabled={!!error}>
                SUBMIT POST
              </Button>
            </div>
          </>
        ),
        [1]: (
          <>
            {[{ bg: 'white', linearGradient: ['#00F5A0', '#00D9F5'], stroke: 'transparent', borderColor: 'black', borderWidth: '4px' }].map(({ bg, linearGradient, stroke, borderColor, borderWidth }) => (
              // <VStack className="mx-2 mb-4 items-center" alignment="center" style={{ background: bg, padding: 20, borderRadius: '4px' }}>
              <VStack alignment="center" className="mb-4 bg-gray-950 border-2 border-black dark:border-white w-full pt-8 pb-10 relative">
                <div className="absolute top-4 right-4">
                  <Icons.close color="white" onClick={() => onClose ? onClose() : setStep(0)} />
                </div>
                <Text className="mb-4 text-xl text-white leading-[24px] md:text-2xl lg:md:text-3xl" font="mono">
                  Send
                  <Text className="text-primary mx-4">0.001 ZEC</Text>
                  to
                </Text>
                <QRCode
                  backgroundColor={false}
                  enableLinearGradient={Boolean(linearGradient)}
                  linearGradient={linearGradient}
                  color={stroke}
                  includeMargin={true}
                  size={Math.min(Math.round(((dimensions.width || 48) - 48)), 348) || tileWidth}
                  value={zcashAddr}
                  logoBackgroundColor="bg-gray-900"
                  logoBorderRadius={0}
                  logoMargin={8}
                  svgLogo={<Icons.zcashQrCodeGradient />}
                  svgLogoSize={44}
                  logoSize={44}
                />
                <VStack alignment="center" className="pt-6">
                  <Text font="mono" onClick={() => setStep(0)}>
                    Waiting for funds...
                  </Text>
                </VStack>
              </VStack>
            ))}
            <div className="flex row bg-gradient-dark dark:bg-gradient w-full p-3 py-2">
              <div className="w-full">
                <div className="text-white dark:text-black">
                  <EllipsisBoxWrapper className="font-mono" text={zaddr} offset={6} />
                </div>
              </div>
              <Icons.miniQrCode className="ml-3 text-white dark:text-black" />
              <Icons.miniCopy
                className="ml-2 text-primary"
                style={{ filter: 'drop-shadow(1px 1px 0px rgba(0, 0, 0, .7))' }}
                onClick={() => copyTextToClipboard(zcashAddr)}
              />
            </div>
            <div className="flex w-full row justify-between">
              {/* <div className="flex flex-1" /> */}
              {/* <Button variant="secondary" className="text-black" onClick={() => setStep(0)}>
                SUBMIT POST
              </Button> */}
            </div>
          </>
        )
      }[step]}
    </>
  );
}

