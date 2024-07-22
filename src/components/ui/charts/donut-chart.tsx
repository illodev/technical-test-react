"use client";

import * as React from "react";
import { Label, Pie, PieChart as RePieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

type ChartData = Record<string, unknown> & {
  fill: string;
};

interface DonutChartProps extends React.ComponentPropsWithoutRef<"div"> {
  dataKey: string;
  nameKey: string;
  data: ChartData[];
  config: ChartConfig;
  valueFormatter?: (value: number | string) => React.ReactNode;
  noDataText?: string;
}

const DonutChart = React.forwardRef<HTMLDivElement, DonutChartProps>(
  (
    {
      dataKey,
      nameKey,
      data,
      config,
      valueFormatter,
      noDataText = "No data",
      className,
      ...props
    },
    ref,
  ) => {
    const total = React.useMemo(() => {
      return data.reduce(
        (acc, curr) => acc + Number((curr as any)[dataKey]),
        0,
      );
    }, []);

    if (!data.length) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex aspect-auto h-[250px] w-full items-center justify-center rounded-lg border border-dashed",
            className,
          )}
          {...props}
        >
          <p className="text-sm text-muted-foreground">{noDataText}</p>
        </div>
      );
    }

    return (
      <ChartContainer
        ref={ref}
        config={config}
        className={cn("mx-auto aspect-square max-h-[250px]", className)}
        {...props}
      >
        <RePieChart accessibilityLayer>
          <ChartTooltip
            content={
              <ChartTooltipContent hideLabel valueFormatter={valueFormatter} />
            }
          />
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            innerRadius={60}
            strokeWidth={5}
            paddingAngle={2}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-base font-bold"
                      >
                        {valueFormatter ? valueFormatter(total) : total}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </RePieChart>
      </ChartContainer>
    );
  },
);

DonutChart.displayName = "DonutChart";

export { DonutChart };
