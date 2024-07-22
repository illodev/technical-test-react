"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "lucide-react";

import { TaskStatusBadge } from "@/components/modules/task-status/task-status-badge";
import { handleTaskStatusDelete } from "@/components/modules/task-status/task-status-delete";
import { handleTaskStatusUpdate } from "@/components/modules/task-status/task-status-update";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { TaskStatusOutput } from "@/lib/schemas/task";

const columnHelper = createColumnHelper<TaskStatusOutput>();

const columns = [
    columnHelper.accessor((p) => p.name, {
        id: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => <TaskStatusBadge status={row.original} />,
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
                    onClick={() => handleTaskStatusUpdate(p.row.original)}
                >
                    <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                    title="Delete"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleTaskStatusDelete(p.row.original)}
                >
                    <TrashIcon className="h-4 w-4" />
                </Button>
            </div>
        ),
    }),
];

interface TaskStatusListProps {
    statuses: TaskStatusOutput[];
}

export const TaskStatusList: React.FC<TaskStatusListProps> = ({ statuses }) => {
    return <DataTable data={statuses} columns={columns} />;
};
