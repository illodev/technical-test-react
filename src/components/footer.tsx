import { InfoCircledIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { cn } from "@/lib/utils";

interface FooterProps extends React.ComponentPropsWithoutRef<"footer"> {}

const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <footer ref={ref} className={cn("border-t py-8", className)} {...props}>
        <p className="text-sm text-muted-foreground text-center text-balance">
          <InfoCircledIcon className="inline-block h-5 w-5 mr-1 -mt-1" />
          All resources related to A-SAFE Digital have been used for the purpose
          of this technical test.
        </p>
      </footer>
    );
  },
);

Footer.displayName = "Footer";

export { Footer };
