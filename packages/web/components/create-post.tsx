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



const tileWidth = 246;
const addr = "u1mpqagwcatyxa6q5pkpvgmpv4swf6hs9qyq67f7qy4e6vwq6ev9samuy23qncymyva3ykuhwk2kk9p7a0avsnp20r4c0lky76q0yjdt3c5857h6vkeje9gzlqzzv96tmhfzy66wa6r4zuqhryc53rkhuu2h9dal0f8hvvdqvnwql06nj08xq4m3wmpr5mvnmxqeu9a6499aerjhk4efj";


export default function CreatePost({ ...props }) {
  const [step, setStep] = useState(0);
  // const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver({
    ref: elementRef,
    box: 'border-box',
  });

  // const elementRef = useResizeObserver(onResize);

  return (
    <>
      <div className="flex flex-1 w-full" ref={elementRef} />
      {{
        [0]: (
          <>
      <Textarea className="min-h-32 dark:bg-background text-black dark:text-white dark:border-2 dark:border-white" placeholder="Write your post here…" />
            <div className="flex row bg-gradient-dark dark:bg-gradient w-full p-3 py-2">
              <div className="w-full">
                <div className="text-white dark:text-black">
                  <EllipsisBoxWrapper className="font-mono" text={addr} offset={6} />
                </div>
              </div>
              <Icons.miniQrCode className="ml-3 text-white dark:text-black" />
              <Icons.miniCopy className="ml-2 text-primary" style={{ filter: 'drop-shadow(1px 1px 0px rgba(0, 0, 0, .7))' }} />
            </div>
            <div className="flex w-full row justify-between">
              <div className="flex flex-1" />
              <Button variant="secondary" className="text-black" onClick={() => setStep(1)}>
                SUBMIT POST
              </Button>
            </div>
          </>
        ),
        [1]: (
          <>
            {[{ bg: 'white', linearGradient: ['#00F5A0', '#00D9F5'], stroke: 'transparent', borderColor: 'black', borderWidth: '4px' }].map(({ bg, linearGradient, stroke, borderColor, borderWidth }) => (
              // <VStack className="mx-2 mb-4 items-center" alignment="center" style={{ background: bg, padding: 20, borderRadius: '4px' }}>
              <VStack alignment="center" className="mb-4 bg-gray-950 border-2 border-[#00FF7F] w-full max-w-md pt-8 pb-10 relative">
                <div className="absolute top-4 right-4">
                  <Icons.close color="white" onClick={() => setStep(0)} />
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
                  value={`zcash:${addr}?amount=0.001&memo=${0}`}
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
                  <EllipsisBoxWrapper text={addr} offset={12} />
                </div>
              </div>
              <Icons.miniQrCode className="ml-3 text-white dark:text-black" />
              <Icons.miniCopy className="ml-2 text-primary" style={{ filter: 'drop-shadow(1px 1px 0px rgba(0, 0, 0, .7))' }} />
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

