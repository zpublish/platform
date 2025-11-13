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



const tileWidth = 246;
const addr = "u1rl2zw85...";


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
            <div className="flex row bg-secondary dark:bg-gradient w-full p-3 py-2">
              <div className="w-full">
                <div className="text-black">
                  <EllipsisBoxWrapper className="font-mono" text={addr} offset={6} />
                </div>
              </div>
              <Icons.miniQrCode className="ml-3 text-black" />
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
            {[{ bg: 'white', linearGradient: ['#00F9F9', '#0054FF'], stroke: 'transparent', borderColor: 'black', borderWidth: '4px' }].map(({ bg, linearGradient, stroke, borderColor, borderWidth }) => (
              // <VStack className="mx-2 mb-4 items-center" alignment="center" style={{ background: bg, padding: 20, borderRadius: '4px' }}>
              <VStack className="mb-4 bg-white w-full pt-8 pb-10">
                <Text className="mb-4 text-xl text-black leading-[24px] md:text-2xl lg:md:text-3xl" font="mono">
                  Send
                  <Text className="text-primary mx-4">0.01 ZEC</Text>
                  to
                </Text>
                <QRCode
                  backgroundColor={false}
                  enableLinearGradient={Boolean(linearGradient)}
                  linearGradient={linearGradient}
                  color={stroke}
                  includeMargin={true}
                  size={Math.min(Math.round(((dimensions.width || 48) - 48)), 348) || tileWidth}
                  value={`zcash:${0}?amount=0.001&memo=${0}`}
                  logoBackgroundColor="white"
                  logoBorderRadius={0}
                  logoMargin={8}
                  svgLogo={<Icons.zcashQrCodeGradient />}
                  svgLogoSize={44}
                  logoSize={44}
                />
              </VStack>
            ))}
            <div className="flex row bg-secondary dark:bg-gradient w-full p-3 py-2">
              <div className="w-full">
                <div className="text-black">
                  <EllipsisBoxWrapper text={addr} offset={12} />
                </div>
              </div>
              <Icons.miniQrCode className="ml-3 text-black" />
              <Icons.miniCopy className="ml-2 text-primary" style={{ filter: 'drop-shadow(1px 1px 0px rgba(0, 0, 0, .7))' }} />
            </div>
            <VStack alignment="center" className="py-6">
              <Text font="mono" onClick={() => setStep(0)}>
                Waiting for funds...
              </Text>
            </VStack>
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

