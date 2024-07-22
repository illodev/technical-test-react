import {
  AlertCircleIcon,
  ClockArrowDownIcon,
  ClockArrowUpIcon,
  LayoutListIcon,
  ListChecksIcon,
} from "lucide-react";
import { getServerSession } from "next-auth";
import * as React from "react";

import { DashboardHeader } from "@/components/dashboard-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart } from "@/components/ui/charts/bar-chart";
import { DonutChart } from "@/components/ui/charts/donut-chart";
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from "@/components/ui/data-list";
import { Separator } from "@/components/ui/separator";
import { tasksByLabels } from "@/data/tasks-by-labels";
import { tasksByProjects } from "@/data/tasks-by-projects";
import { tasksByStatuses } from "@/data/tasks-by-statuses";
import { getHex } from "@/lib/colors";

export default async function Page() {
  const session = await getServerSession();

  if (!session) {
    return null;
  }

  return (
    <>
      <DashboardHeader
        heading="Dashboard"
        text={`Welcome back, ${session.user.name}`}
      />
      <Separator />
      <div className="container py-12 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Task Completion Rate
              </CardTitle>
              <ListChecksIcon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92.5%</div>
              <p className="text-xs text-muted-foreground">
                +1.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Task Overdue Rate
              </CardTitle>
              <LayoutListIcon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.5%</div>
              <p className="text-xs text-muted-foreground">
                -0.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Pending Hours
              </CardTitle>
              <ClockArrowDownIcon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">40h 30m 12s</div>
              <p className="text-xs text-muted-foreground">
                -7.6% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Worked Hours
              </CardTitle>
              <ClockArrowUpIcon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8h 30m 12s</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Tasks by Statuses</CardTitle>
              <CardDescription>
                A summary of tasks by their statuses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={tasksByStatuses}
                dataKey="date"
                showLegend
                config={{
                  done: {
                    label: "Done",
                    color: getHex("green", "500"),
                  },
                  pending: {
                    label: "Pending",
                    color: getHex("blue", "500"),
                  },
                  overdue: {
                    label: "Overdue",
                    color: getHex("rose", "500"),
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Tasks by Projects</CardTitle>
              <CardDescription>
                A summary of tasks by their projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DonutChart
                data={tasksByProjects}
                dataKey="total"
                nameKey="project"
                config={tasksByProjects.reduce(
                  (acc, { project, fill }) => {
                    acc[project] = {
                      label: project,
                      color: fill,
                    };
                    return acc;
                  },
                  {} as Record<string, { label: string; color: string }>,
                )}
              />

              <DataList className="mt-6 w-full gap-2 overflow-hidden">
                <DataListItem className="mb-2">
                  <DataListLabel>Project</DataListLabel>
                  <DataListValue className="text-right">
                    Amount / Percentage
                  </DataListValue>
                </DataListItem>

                {tasksByProjects.map((item, index) => (
                  <React.Fragment key={item.project}>
                    {index > 0 && <Separator className="col-span-2" />}
                    <DataListItem>
                      <DataListLabel>
                        <div className="flex items-center space-x-2">
                          <span
                            className="h-2.5 w-2.5 shrink-0 rounded-[0.15rem]"
                            style={{
                              backgroundColor: item.fill,
                            }}
                            aria-hidden={true}
                          />
                          <p className="text-sm font-medium">{item.project}</p>
                        </div>
                      </DataListLabel>
                      <DataListValue className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <span className="font-medium tabular-nums">
                            {item.total}
                          </span>
                          <span className="rounded-lg bg-muted px-1.5 py-0.5 font-medium tabular-nums">
                            {(
                              (item.total /
                                tasksByProjects.reduce(
                                  (acc, item) => acc + item.total,
                                  0,
                                )) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                      </DataListValue>
                    </DataListItem>
                  </React.Fragment>
                ))}
              </DataList>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tasks by Labels</CardTitle>
              <CardDescription>
                A summary of tasks by their labels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DonutChart
                data={tasksByLabels}
                dataKey="total"
                nameKey="label"
                config={tasksByLabels.reduce(
                  (acc, { label, fill }) => {
                    acc[label] = {
                      label: label,
                      color: fill,
                    };
                    return acc;
                  },
                  {} as Record<string, { label: string; color: string }>,
                )}
              />
              <DataList className="mt-6 w-full gap-2 overflow-hidden">
                <DataListItem className="mb-2">
                  <DataListLabel>Label</DataListLabel>
                  <DataListValue className="text-right">
                    Amount / Percentage
                  </DataListValue>
                </DataListItem>
                {tasksByLabels.map((item, index) => (
                  <React.Fragment key={item.label}>
                    {index > 0 && <Separator className="col-span-2" />}
                    <DataListItem>
                      <DataListLabel>
                        <div className="flex items-center space-x-2">
                          <span
                            className="h-2.5 w-2.5 shrink-0 rounded-[0.15rem]"
                            style={{
                              backgroundColor: item.fill,
                            }}
                            aria-hidden={true}
                          />
                          <p className="text-sm font-medium">{item.label}</p>
                        </div>
                      </DataListLabel>
                      <DataListValue className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <span className="font-medium tabular-nums">
                            {item.total}
                          </span>
                          <span className="rounded-lg bg-muted px-1.5 py-0.5 font-medium tabular-nums">
                            {(
                              (item.total /
                                tasksByLabels.reduce(
                                  (acc, item) => acc + item.total,
                                  0,
                                )) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                      </DataListValue>
                    </DataListItem>
                  </React.Fragment>
                ))}
              </DataList>
            </CardContent>
          </Card>
        </div>
        <div>
          <Alert>
            <AlertCircleIcon className="h-5 w-5" />
            <AlertTitle>Disclaimer: Randomly Generated Data</AlertTitle>
            <AlertDescription>
              The data shown in the charts is generated randomly and does not
              represent real data.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </>
  );
}
