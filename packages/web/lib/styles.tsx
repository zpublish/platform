import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "./utils";

export function extend<T extends React.ElementType>(
  element: string | T = "div",
  baseClass: string,
  config?: Parameters<typeof cva>[1] | (() => { [k: string]: string | boolean | number })
) {
  if (!config || typeof config === 'function') {
    const configProps = config?.() || {};

    return forwardRef<
      HTMLDivElement,
      React.HTMLAttributes<HTMLDivElement> & {
        asChild?: boolean;
      }
    >(({ className, asChild = false, ...props }, ref) => {
      const Comp = asChild ? Slot : element;
      return (
        <Comp
          className={cn(className, baseClass)}
          ref={ref}
          {...configProps}
          {...props}
          />
      );
    });
  }

  const variants = cva(baseClass, config);

  return forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof variants> & {
      asChild?: boolean;
    }
  >(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : element;
    return (
      <Comp
        className={cn(variants({ className }))}
        ref={ref}
        {...props}
      />
    );
  });
}