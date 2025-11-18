import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const hstackVariants = cva(
  "flex flex-row",
  {
    variants: {
      alignment: {
        topLeading: 'items-start',
        topTrailing: 'justify-end',
        top: 'items-start justify-center',
        center: 'items-center justify-center',
        leading: 'items-center',
        trailing: 'items-center justify-end',
        bottom: 'items-end justify-center',
        bottomLeading: 'items-end',
        bottomTrailing: 'justify-end items-end',
        none: '',
      },
      verticalAlignment: {
        top: 'items-top',
        center: 'justify-center',
        bottom: 'items-end',
      },
      horizontalAlignment: {
        top: 'items-top',
        center: 'items-center',
        bottom: 'items-end',
      },
      justify: {
        top: 'justify-top',
        between: 'justify-between',
        bottom: 'justify-end',
      },
      flex: {
        1: 'flex-1',
      },
      spacing: {
        1: 'gap-1',
        2: 'gap-2',
        3: 'gap-3',
      },
    },
    defaultVariants: {
      // alignment: 'center',
    },
  }
);

export interface ButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hstackVariants> {
  asChild?: boolean;
}

const HStack = React.forwardRef<HTMLDivElement, ButtonProps>(
  ({ className, alignment, spacing, asChild = false, flex, justify, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(hstackVariants({ alignment, spacing, flex, justify, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
HStack.displayName = "HStack";

export { HStack, hstackVariants };
