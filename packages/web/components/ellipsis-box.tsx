'use client'

/* Code from: https://github.com/zhiyuc123/react-truncate-inside/blob/main/src/index.tsx
 * MIT License – https://github.com/zhiyuc123/react-truncate-inside?tab=readme-ov-file#license
 */

import { memo, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";

const getDocument = () => {
  return typeof document !== 'undefined' ? document : null;
}

function useCanvas(): CanvasRenderingContext2D | null {
  const ref = useRef<CanvasRenderingContext2D | null>(null);

  if (ref.current) return ref.current;
  const doc = getDocument();
  if (!doc) {
    return null;
  }

  const canvas = doc.createElement('canvas');
  ref.current = canvas.getContext('2d');
  return ref.current as CanvasRenderingContext2D;
}

export interface TruncateProps {
  /** text to be truncated */
  text: string;
  /**
    width of the element
    @default parentNode.width
  */
  width?: number;
  /**
    the position(from the end) of the ellipsis that shows in text 
    @default 8
  */
  offset?: number;
  /**
    Ellipsis that is added into the text in case it is truncated
    @default ...
  */
  ellipsis?: string;
}

/**
 * <b>Truncate</b> truncates text based on a given width. The component
    takes in a few props, including the text to be truncated, the width of
    the container, the number of characters to offset the truncated text,
    and the ellipsis to be used.
 */
const EllipsisBox = memo((props: TruncateProps) => {
  const { text, width = 0, offset = 8, ellipsis = '...' } = props;

  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [shouldTruncate, setShouldTruncate] = useState<boolean>(false);
  const [truncated, setTruncated] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvas = useCanvas();

  const setupCanvas = useCallback(() => {
    if (!containerRef.current || !canvas) return;

    const style = window.getComputedStyle(containerRef.current);
    const font = [ // @ts-expect-error 123
      style['font-weight'], // @ts-expect-error 123
      style['font-style'], // @ts-expect-error 123
      style['font-size'], // @ts-expect-error 123
      style['font-family'],
    ].join(' ');
    canvas.font = font;
  }, [canvas]);

  const calcTargetWidth = useCallback(() => {
    let targetW;
    if (width) {
      targetW = width;
    } else {
      targetW = containerRef.current?.getBoundingClientRect().width;
    }// @ts-expect-error 123
    setTargetWidth(targetW);
    const measureWidth = canvas ? canvas.measureText(text).width : 0;// @ts-expect-error 123
    setShouldTruncate(targetW < measureWidth);
    setTruncated(true);
  }, [canvas, text, width]);

  useEffect(() => {
    setupCanvas();
    calcTargetWidth();
  }, [calcTargetWidth, setupCanvas]);

  useEffect(() => {
    const oB = new ResizeObserver((entries) => {
      if (entries.length > 0) {
        calcTargetWidth();
      }
    });
    if (containerRef.current) {
      oB.observe(containerRef.current);
    }

    return () => {
      oB.disconnect();
    };
  }, [calcTargetWidth]);

  const calculatedText = useMemo(() => {
    if (!shouldTruncate) return text;

    const len = text.length;
    const tail = text.slice(len - offset, len);
    let head: string;

    let end = len - offset;
    let start = 0;

    while (start < end - 1) {
      const curr = Math.floor((end - start) / 2 + start);
      head = text.slice(0, curr);
      if ((canvas ? canvas.measureText(head + ellipsis + tail).width : 0) < targetWidth) {
        start = curr;
      } else {
        end = curr;
      }
    }
    head = text.slice(0, start || 1);
    return head + ellipsis + tail;
  }, [canvas, ellipsis, offset, shouldTruncate, targetWidth, text]);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: width || '100%',
          whiteSpace: 'nowrap',
          // display: !truncated ? 'none' : undefined
        }}
      >
        {truncated ? calculatedText : (
          <div className="bg-[#DEDEDE] h-4 my-1 w-[100%]" />
        )}
      </div>
    </>
  );
});

export default function EllipsisBoxWrapper(props: TruncateProps) {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <EllipsisBox {...props} />
    </Suspense>
  );
};
