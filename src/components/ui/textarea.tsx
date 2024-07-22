"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const localRef = React.useRef<HTMLTextAreaElement | null>();

    const adjustHeight = (e: React.FormEvent<HTMLTextAreaElement>) => {
      const element = e.currentTarget;
      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
    };

    React.useEffect(() => {
      if (localRef.current) {
        adjustHeight({ currentTarget: localRef.current } as any);
      } else if (ref && "current" in ref && ref.current) {
        adjustHeight({ currentTarget: ref.current } as any);
      }
    }, []);

    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full overflow-hidden bg-background rounded-md border border-input px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        onInput={adjustHeight}
        ref={(instance) => {
          localRef.current = instance;

          if (typeof ref === "function") {
            ref(instance);
          } else if (typeof ref === "object" && ref !== null) {
            ref.current = instance;
          }
        }}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
