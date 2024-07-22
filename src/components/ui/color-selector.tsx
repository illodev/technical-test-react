import { colorKeys, getHex } from "@/lib/colors";
import { cn } from "@/lib/utils";
import * as React from "react";
import { FormControl, FormItem } from "./form";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

export interface InputProps {
  className?: string;
  onChange?: (value: string) => void;
  value?: string | null;
}

const ColorSelector = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onChange, value }, ref) => {
    return (
      <TooltipProvider>
        <FormControl className={cn(className)} ref={ref}>
          <RadioGroup
            onValueChange={onChange}
            defaultValue={value ?? undefined}
            className="flex flex-wrap gap-1.5"
          >
            {colorKeys.map((key) => (
              <Tooltip key={key} delayDuration={0}>
                <TooltipTrigger asChild>
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem
                        value={key}
                        className="flex h-7 w-7 flex-none cursor-pointer items-center justify-center overflow-hidden rounded-md shadow-none [&>span>svg]:!h-5 [&>span>svg]:!w-5"
                        style={{
                          backgroundColor: getHex(key, "500") + "20",
                          color: getHex(key, "400"),
                          borderColor: getHex(key, "500") + "40",
                        }}
                      />
                    </FormControl>
                  </FormItem>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  style={{
                    backgroundColor: getHex(key, "500") + "20",
                    color: getHex(key, "400"),
                    borderColor: getHex(key, "500") + "40",
                  }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </TooltipContent>
              </Tooltip>
            ))}
          </RadioGroup>
        </FormControl>
      </TooltipProvider>
    );
  },
);

ColorSelector.displayName = "ColorSelector";

export { ColorSelector };
