import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const hstackVariants = cva(
  "flex flex-row",
  {
    variants: {
      alignment: {
        top: 'items-top',
        center: 'items-center',
        bottom: 'items-end',
      },
      justify: {
        between: 'justify-between'
      },
      flex: {
        1: 'flex-1',
      },
      spacing: {},
    },
    defaultVariants: {},
  }
);

export interface ButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hstackVariants> {
  asChild?: boolean;
}

const HStack = React.forwardRef<HTMLDivElement, ButtonProps>(
  ({ className, alignment, spacing, asChild = false, flex, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(hstackVariants({ alignment, spacing, flex, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
HStack.displayName = "HStack";

export { HStack, hstackVariants };
