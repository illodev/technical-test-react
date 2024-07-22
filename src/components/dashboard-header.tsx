import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const headingVariants = cva("scroll-m-20 font-semibold tracking-tight", {
  variants: {
    size: {
      default: "text-2xl lg:text-4xl",
      sm: "text-lg lg:text-xl",
      md: "text-xl lg:text-2xl",
      lg: "text-4xl lg:text-5xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const textVariants = cva("leading-7 text-muted-foreground", {
  variants: {
    size: {
      default: "text-xl",
      sm: "text-base",
      md: "text-lg",
      lg: "text-2xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface DashboardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headingVariants> {
  heading: string;
  text?: string;
}

const DashboardHeader = forwardRef<HTMLDivElement, DashboardHeaderProps>(
  ({ heading, text, children, className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "py-8 flex lg:items-center flex-col items-stretch lg:flex-row gap-8 justify-between container",
          className,
        )}
        {...props}
      >
        <div className="grid gap-1">
          <h1 className={cn(headingVariants({ size }))}>{heading}</h1>
          {text && <p className={cn(textVariants({ size }))}>{text}</p>}
        </div>
        {children}
      </div>
    );
  },
);

DashboardHeader.displayName = "DashboardHeader";

export { DashboardHeader };
