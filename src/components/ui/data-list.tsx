import * as React from "react";

import { cn } from "@/lib/utils";

interface DataListProps extends React.ComponentPropsWithoutRef<"dl"> {}

const DataList = React.forwardRef<HTMLDListElement, DataListProps>(
  ({ className, ...props }, ref) => {
    return (
      <dl
        ref={ref}
        className={cn("grid grid-cols-[auto_1fr] gap-4 text-sm", className)}
        {...props}
      />
    );
  },
);
DataList.displayName = "DataList.Root";

interface DataListItemProps extends React.ComponentPropsWithoutRef<"div"> {}

const DataListItem = React.forwardRef<
  React.ElementRef<"div">,
  DataListItemProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "col-[span_2] grid grid-cols-[subgrid] items-center",
        className,
      )}
      {...props}
    />
  );
});
DataListItem.displayName = "DataList.Item";

interface DataListLabelProps extends React.ComponentPropsWithoutRef<"dt"> {}

const DataListLabel = React.forwardRef<
  React.ElementRef<"dt">,
  DataListLabelProps
>(({ className, ...props }, ref) => {
  return (
    <dt
      ref={ref}
      className={cn("min-w-20 text-muted-foreground", className)}
      {...props}
    />
  );
});
DataListLabel.displayName = "DataList.Label";

interface DataListValueProps extends React.ComponentPropsWithoutRef<"dd"> {}

const DataListValue = React.forwardRef<
  React.ElementRef<"dd">,
  DataListValueProps
>(({ children, className, ...props }, ref) => (
  <dd {...props} ref={ref} className={cn("text-foreground", className)}>
    {children}
  </dd>
));
DataListValue.displayName = "DataList.Value";

export { DataList, DataListItem, DataListLabel, DataListValue };
