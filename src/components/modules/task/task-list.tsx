"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "lucide-react";

import { TaskLabelBadge } from "@/components/modules/task-label/task-label-badge";
import { handleTaskDelete } from "@/components/modules/task/task-delete";
import { handleTaskUpdate } from "@/components/modules/task/task-update";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { type TaskOutput } from "@/lib/schemas/task";
import { useData } from "@/providers/query-provider";

const columnHelper = createColumnHelper<TaskOutput>();

export const columns = [
    columnHelper.accessor((t) => t.key, {
        id: "key",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Task" />
        ),
        cell: ({ row }) => (
            <div className="truncate uppercase">{row.original.key}</div>
        ),
        size: 120,
        enableSorting: false,
        enableHiding: false,
    }),
    columnHelper.accessor((t) => t.name, {
        id: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        size: 600,
        cell: ({ row }) => {
            const label = row.original.label;

            return (
                <div className="flex gap-2 items-center w-full">
                    {label && <TaskLabelBadge label={label} />}
                    <div className="flex flex-col overflow-hidden">
                        <span className="truncate font-medium">
                            {row.getValue("name")}
                        </span>
                        {row.original.description && (
                            <span className="text-xs text-muted-foreground truncate">
                                {row.original.description}
                            </span>
                        )}
                    </div>
                </div>
            );
        },
    }),
    columnHelper.accessor((t) => t.status, {
        id: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = row.original.status;

            if (!status) {
                return (
                    <div className="flex w-[100px] items-center">
                        <span className="text-secondary">None</span>
                    </div>
                );
            }

            return (
                <div className="flex w-[100px] items-center">
                    <span>{status.name}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),
    columnHelper.accessor((t) => t.priority, {
        id: "priority",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Priority" />
        ),
        cell: ({ row }) => {
            const priority = row.original.priority;

            if (!priority) {
                return (
                    <div className="flex items-center">
                        <span className="text-secondary">None</span>
                    </div>
                );
            }

            return (
                <div className="flex items-center">
                    <span>{priority.name}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        size: 100,
        cell: (p) => (
            <div className="flex space-x-2">
                <Button
                    title="Edit"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleTaskUpdate(p.row.original);
                    }}
                >
                    <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                    title="Delete"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleTaskDelete(p.row.original);
                    }}
                >
                    <TrashIcon className="h-4 w-4" />
                </Button>
            </div>
        ),
    }),
];

interface TaskListProps {
    tasks: TaskOutput[];
    projectId: string;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, projectId }) => {
    const { data } = useData({
        key: ["projects", projectId, "tasks"],
        data: tasks,
    });

    return (
        <DataTable
            data={data}
            columns={columns}
            onRowClick={(row) => handleTaskUpdate(row)}
        />
    );
};
