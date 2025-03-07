import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const vstackVariants = cva(
  "flex flex-col",
  {
    variants: {
      alignment: {
        top: 'justify-top',
        center: 'justify-center',
        bottom: 'justify-end',
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
    VariantProps<typeof vstackVariants> {
  asChild?: boolean;
}

const VStack = React.forwardRef<HTMLDivElement, ButtonProps>(
  ({ className, alignment, spacing, asChild = false, flex, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(vstackVariants({ alignment, spacing, className, flex }))}
        ref={ref}
        {...props}
      />
    );
  }
);
VStack.displayName = "VStack";

export { VStack, vstackVariants };
