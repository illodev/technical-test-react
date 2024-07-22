"use client";

import * as React from "react";
import {
  Bar,
  CartesianGrid,
  BarChart as ReBarChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

type ChartData = Record<string, unknown>;

interface BarChartProps extends React.ComponentPropsWithoutRef<"div"> {
  dataKey: string;
  data: ChartData[];
  config: ChartConfig;
  valueFormatter?: (value: number | string) => string;
  noDataText?: string;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
}

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      dataKey,
      data,
      config,
      valueFormatter,
      noDataText = "No data",
      showLegend = false,
      showXAxis = true,
      showYAxis = true,
      className,
      ...props
    },
    ref,
  ) => {
    if (!config) return null;

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
        className={cn("aspect-auto h-[250px] w-full", className)}
        {...props}
      >
        <ReBarChart
          accessibilityLayer
          data={data}
          margin={{
            left: -10,
          }}
        >
          <CartesianGrid vertical={false} />
          {showYAxis && (
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={valueFormatter}
            />
          )}
          {showXAxis && (
            <XAxis
              dataKey={dataKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
          )}
          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator="line"
                valueFormatter={valueFormatter}
              />
            }
          />
          {showLegend && <ChartLegend content={<ChartLegendContent />} />}
          {Object.entries(config).map(([key, conf]) => (
            <Bar key={key} dataKey={key} fill={conf.color} radius={4} />
          ))}
        </ReBarChart>
      </ChartContainer>
    );
  },
);

BarChart.displayName = "BarChart";

export { BarChart };
