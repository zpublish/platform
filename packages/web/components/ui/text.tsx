import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const TextVariants = cva(
  "",
  {
    variants: {
      font: {
        sans: "font-sans",
      },
      italic: {
        true: ["italic"],
      },
      semibold: {
        true: ["font-[600]"],
        false: ["font-normal"]
      },
      bold: {
        true: ["font-bold"],
        false: ["font-normal"]
      },
      underline: {
        true: ["underline"],
      },
    },
    defaultVariants: {},
  }
);

export interface ButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof TextVariants> {
  asChild?: boolean;
}

type Font = 'body' | 'largeTitle' | 'sans';

const Text = React.forwardRef<HTMLDivElement, ButtonProps>(
  ({ className, font, italic, bold, underline, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span"; // @ts-expect-error 123
    const Heading = ({
      body: 'p',
      largeTitle: 'h3',
    } as { [key in Exclude<typeof font, null | undefined>]: string })[font as Font] || Comp;
    return (
      <Heading
        className={cn(TextVariants({ font, italic, bold, underline, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { Text, TextVariants };
