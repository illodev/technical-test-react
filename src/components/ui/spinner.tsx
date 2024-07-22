"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const spinnerVariants = cva("", {
  variants: {
    size: {
      default: "h-5 w-5",
      sm: "h-4 w-4",
      lg: "h-8 w-8",
      icon: "h-4 w-4",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface SpinnerProps
  extends React.SVGAttributes<React.ElementRef<"div">>,
    VariantProps<typeof spinnerVariants> {
  className?: string;
}

const Spinner = React.forwardRef<React.ElementRef<"div">, SpinnerProps>(
  ({ className, size, ...props }, ref) => (
    <>
      <style jsx>{`
        .spinner {
          display: block;
          box-sizing: border-box;
        }

        .spinner-container {
          width: 100%;
          height: 100%;
          position: relative;
          left: 50%;
          top: 50%;
        }

        .spinner-container span {
          background-color: currentColor;
          position: absolute;
          top: -3.9%;
          width: 24%;
          height: 8%;
          left: -10%;
          border-radius: 6px;
          -webkit-animation: spinner-low 1.2s linear 0s infinite normal none
            running;
          animation: spinner-low 1.2s linear 0s infinite normal none running;
        }

        .spinner-container span:nth-child(1) {
          animation-delay: -1.2s;
          -webkit-transform: rotate(0deg) translate(146%);
          -moz-transform: rotate(0deg) translate(146%);
          -ms-transform: rotate(0deg) translate(146%);
          transform: rotate(0deg) translate(146%);
        }

        .spinner-container span:nth-child(2) {
          animation-delay: -1.1s;
          -webkit-transform: rotate(30deg) translate(146%);
          -moz-transform: rotate(30deg) translate(146%);
          -ms-transform: rotate(30deg) translate(146%);
          transform: rotate(30deg) translate(146%);
        }

        .spinner-container span:nth-child(3) {
          animation-delay: -1s;
          -webkit-transform: rotate(60deg) translate(146%);
          -moz-transform: rotate(60deg) translate(146%);
          -ms-transform: rotate(60deg) translate(146%);
          transform: rotate(60deg) translate(146%);
        }

        .spinner-container span:nth-child(4) {
          animation-delay: -0.9s;
          -webkit-transform: rotate(90deg) translate(146%);
          -moz-transform: rotate(90deg) translate(146%);
          -ms-transform: rotate(90deg) translate(146%);
          transform: rotate(90deg) translate(146%);
        }

        .spinner-container span:nth-child(5) {
          animation-delay: -0.8s;
          -webkit-transform: rotate(120deg) translate(146%);
          -moz-transform: rotate(120deg) translate(146%);
          -ms-transform: rotate(120deg) translate(146%);
          transform: rotate(120deg) translate(146%);
        }

        .spinner-container span:nth-child(6) {
          animation-delay: -0.7s;
          -webkit-transform: rotate(150deg) translate(146%);
          -moz-transform: rotate(150deg) translate(146%);
          -ms-transform: rotate(150deg) translate(146%);
          transform: rotate(150deg) translate(146%);
        }

        .spinner-container span:nth-child(7) {
          animation-delay: -0.6s;
          -webkit-transform: rotate(180deg) translate(146%);
          -moz-transform: rotate(180deg) translate(146%);
          -ms-transform: rotate(180deg) translate(146%);
          transform: rotate(180deg) translate(146%);
        }

        .spinner-container span:nth-child(8) {
          animation-delay: -0.5s;
          -webkit-transform: rotate(210deg) translate(146%);
          -moz-transform: rotate(210deg) translate(146%);
          -ms-transform: rotate(210deg) translate(146%);
          transform: rotate(210deg) translate(146%);
        }

        .spinner-container span:nth-child(9) {
          animation-delay: -0.4s;
          -webkit-transform: rotate(240deg) translate(146%);
          -moz-transform: rotate(240deg) translate(146%);
          -ms-transform: rotate(240deg) translate(146%);
          transform: rotate(240deg) translate(146%);
        }

        .spinner-container span:nth-child(10) {
          animation-delay: -0.3s;
          -webkit-transform: rotate(270deg) translate(146%);
          -moz-transform: rotate(270deg) translate(146%);
          -ms-transform: rotate(270deg) translate(146%);
          transform: rotate(270deg) translate(146%);
        }

        .spinner-container span:nth-child(11) {
          animation-delay: -0.2s;
          -webkit-transform: rotate(300deg) translate(146%);
          -moz-transform: rotate(300deg) translate(146%);
          -ms-transform: rotate(300deg) translate(146%);
          transform: rotate(300deg) translate(146%);
        }

        .spinner-container span:nth-child(12) {
          animation-delay: -0.1s;
          -webkit-transform: rotate(330deg) translate(146%);
          -moz-transform: rotate(330deg) translate(146%);
          -ms-transform: rotate(330deg) translate(146%);
          transform: rotate(330deg) translate(146%);
        }

        @keyframes spinner-low {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0.15;
          }
        }
      `}</style>
      <div
        ref={ref}
        className={cn(
          spinnerVariants({
            className: "spinner",
            size,
          }),
          className,
        )}
        {...props}
      >
        <div className="spinner-container">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
    </>
  ),
);

Spinner.displayName = "Spinner";

export { Spinner };
