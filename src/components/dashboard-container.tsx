import { forwardRef } from "react";

import { cn } from "@/lib/utils";

interface DashboardContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const DashboardContainer = forwardRef<HTMLDivElement, DashboardContainerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("py-6 container", className)} {...props}>
        {children}
      </div>
    );
  },
);

DashboardContainer.displayName = "DashboardContainer";

export { DashboardContainer };
