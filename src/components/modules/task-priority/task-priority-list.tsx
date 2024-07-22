"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "lucide-react";

import { TaskPriorityBadge } from "@/components/modules/task-priority/task-priority-badge";
import { handleTaskPriorityDelete } from "@/components/modules/task-priority/task-priority-delete";
import { handleTaskPriorityUpdate } from "@/components/modules/task-priority/task-priority-update";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { TaskPriorityOutput } from "@/lib/schemas/task";

const columnHelper = createColumnHelper<TaskPriorityOutput>();

const columns = [
    columnHelper.accessor((p) => p.name, {
        id: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => <TaskPriorityBadge priority={row.original} />,
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
                        handleTaskPriorityUpdate(p.row.original);
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
                        handleTaskPriorityDelete(p.row.original);
                    }}
                >
                    <TrashIcon className="h-4 w-4" />
                </Button>
            </div>
        ),
    }),
];

interface TaskPriorityListProps {
    priorities: TaskPriorityOutput[];
}

export const TaskPriorityList: React.FC<TaskPriorityListProps> = ({
    priorities,
}) => {
    return <DataTable data={priorities} columns={columns} />;
};
