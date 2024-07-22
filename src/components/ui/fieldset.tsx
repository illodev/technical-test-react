import { cn } from "@/lib/utils";
import * as React from "react";

const Fieldset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col rounded-lg border bg-secondary/20", className)}
    {...props}
  />
));

Fieldset.displayName = "Fieldset";

const FieldsetLegend = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-6 p-6 pb-0", className)}
    {...props}
  />
));

FieldsetLegend.displayName = "FieldsetLegend";

const FieldsetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
FieldsetTitle.displayName = "FieldsetTitle";

const FieldsetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("my-3 text-sm text-muted-foreground", className)}
    {...props}
  />
));
FieldsetDescription.displayName = "FieldsetDescription";

const FieldsetBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));

FieldsetBody.displayName = "FieldsetBody";

const FieldsetField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-6", className)} {...props} />
));

FieldsetField.displayName = "FieldsetField";

const FieldsetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between gap-6 border-t px-6 py-4",
      className,
    )}
    {...props}
  />
));

FieldsetFooter.displayName = "FieldsetFooter";

export {
  Fieldset,
  FieldsetBody,
  FieldsetDescription,
  FieldsetField,
  FieldsetFooter,
  FieldsetLegend,
  FieldsetTitle,
};
