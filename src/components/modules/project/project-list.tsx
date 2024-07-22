"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { handleProjectDelete } from "@/components/modules/project/project-delete-dialog";
import { handleProjectUpdate } from "@/components/modules/project/project-update";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { ProjectOutput } from "@/lib/schemas/project";
import { useData } from "@/providers/query-provider";

const columnHelper = createColumnHelper<ProjectOutput>();

export const columns = [
    columnHelper.accessor((p) => p.key, {
        id: "key",
        header: ({ column }) => (
            <DataTableColumnHeader title="Project" column={column} />
        ),
    }),
    columnHelper.accessor((t) => t.name, {
        id: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            return (
                <div className="max-w-xl flex flex-col">
                    <span className="truncate font-medium">
                        {row.getValue("name")}
                    </span>
                    {row.original.description && (
                        <span className="text-xs text-muted-foreground truncate">
                            {row.original.description}
                        </span>
                    )}
                </div>
            );
        },
    }),
    columnHelper.accessor((p) => p.createdAt, {
        id: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader title="Created At" column={column} />
        ),
        cell: ({ getValue }) => {
            const value = getValue();
            return value ? new Date(value).toLocaleString() : "-";
        },
    }),
    columnHelper.accessor((p) => p.updatedAt, {
        id: "updatedAt",
        header: ({ column }) => (
            <DataTableColumnHeader title="Updated At" column={column} />
        ),
        cell: ({ getValue }) => {
            const value = getValue();
            return value ? new Date(value).toLocaleString() : "-";
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
                        handleProjectUpdate(p.row.original);
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
                        handleProjectDelete(p.row.original);
                    }}
                >
                    <TrashIcon className="h-4 w-4" />
                </Button>
            </div>
        ),
    }),
];

interface ProjectListProps {
    projects: ProjectOutput[];
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
    const { push } = useRouter();
    const { data } = useData({ key: ["projects"], data: projects });

    return (
        <DataTable
            data={data}
            columns={columns}
            onRowClick={(project) =>
                push(`/dashboard/projects/${project.id}/backlog`)
            }
        />
    );
};
