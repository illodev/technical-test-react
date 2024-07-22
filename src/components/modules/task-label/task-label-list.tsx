"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "lucide-react";

import { TaskLabelBadge } from "@/components/modules/task-label/task-label-badge";
import { handleTaskLabelDelete } from "@/components/modules/task-label/task-label-delete";
import { handleTaskLabelUpdate } from "@/components/modules/task-label/task-label-update";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { TaskLabelOutput } from "@/lib/schemas/task";

const columnHelper = createColumnHelper<TaskLabelOutput>();

const columns = [
    columnHelper.accessor((p) => p.name, {
        id: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => <TaskLabelBadge label={row.original} />,
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
                    onClick={() => handleTaskLabelUpdate(p.row.original)}
                >
                    <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                    title="Delete"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleTaskLabelDelete(p.row.original)}
                >
                    <TrashIcon className="h-4 w-4" />
                </Button>
            </div>
        ),
    }),
];

interface TaskLabelListProps {
    labels: TaskLabelOutput[];
}

export const TaskLabelList: React.FC<TaskLabelListProps> = ({ labels }) => {
    return <DataTable data={labels} columns={columns} />;
};
