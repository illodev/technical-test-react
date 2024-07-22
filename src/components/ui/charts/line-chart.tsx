"use client";

import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart as ReLineChart,
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

interface LineChartProps extends React.ComponentPropsWithoutRef<"div"> {
  dataKey: string;
  data: ChartData[];
  config: ChartConfig;
  keyFormatter?: (key: string) => string;
  valueFormatter?: (value: number | string) => string;
  noDataText?: string;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
}

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      dataKey,
      data,
      config,
      keyFormatter,
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
        <ReLineChart
          accessibilityLayer
          data={data}
          margin={{
            left: showYAxis ? 20 : 0,
          }}
        >
          <defs>
            {Object.entries(config).map(([key, conf]) => (
              <linearGradient
                key={key}
                id={`fill${key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={conf.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={conf.color} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>
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
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={keyFormatter}
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
          {Object.entries(config).map(([key, conf]) => (
            <Line
              key={key}
              dataKey={key}
              type="monotone"
              fill={`url(#fill${key})`}
              stroke={conf.color}
              strokeWidth={2}
              connectNulls
            />
          ))}
          {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        </ReLineChart>
      </ChartContainer>
    );
  },
);

LineChart.displayName = "LineChart";

export { LineChart };
