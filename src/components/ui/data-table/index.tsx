"use client";

import * as React from "react";

import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/ui/data-table/data-table-toolbar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
    ColumnFiltersState,
    CoreOptions,
    PaginationState,
    Row,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

interface DataTableProps<TData> {
    columns: CoreOptions<TData>["columns"];
    data: TData[];
    onRowClick?: (row: TData) => void;
}

export function DataTable<TData>({
    columns,
    data,
    onRowClick,
}: DataTableProps<TData>) {
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageSize: 1000,
        pageIndex: 0,
    });

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });
    const { rows } = table.getRowModel();

    const tableContainerRef = React.useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        estimateSize: () => 33,
        getScrollElement: () => tableContainerRef.current,
        measureElement:
            typeof window !== "undefined" &&
            navigator.userAgent.indexOf("Firefox") === -1
                ? (element) => element?.getBoundingClientRect().height
                : undefined,
        overscan: 5,
    });

    return (
        <div className="space-y-4">
            <DataTableToolbar table={table} />
            <div
                className="rounded-md border overflow-auto relative max-h-[800px]"
                ref={tableContainerRef}
            >
                <Table className="grid-cols-[subgrid] grid">
                    <TableHeader className="grid sticky top-0 z-[1] bg-background">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="grid w-full"
                                style={{
                                    gridTemplateColumns: `${headerGroup.headers
                                        .map(
                                            (header) =>
                                                `minmax(${header.column.getSize()}px, 100%)`
                                        )
                                        .join(" ")}`,
                                }}
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="flex items-center flex-1"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody
                        className="grid relative"
                        style={{
                            height: `${rowVirtualizer.getTotalSize()}px`,
                        }}
                    >
                        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                            const row = rows[virtualRow.index] as Row<TData>;
                            return (
                                <TableRow
                                    key={row.id}
                                    onClick={() => {
                                        if (onRowClick) {
                                            onRowClick(row.original);
                                        }
                                    }}
                                    className={cn(
                                        "grid absolute w-full grid-cols-[subgrid]",
                                        onRowClick && "cursor-pointer"
                                    )}
                                    data-index={virtualRow.index}
                                    ref={(node) =>
                                        rowVirtualizer.measureElement(node)
                                    }
                                    style={{
                                        transform: `translateY(${virtualRow.start}px)`,
                                        gridTemplateColumns: `${row
                                            .getVisibleCells()
                                            .map(
                                                (cell) =>
                                                    `minmax(${cell.column.getSize()}px, 100%)`
                                            )
                                            .join(" ")}`,
                                    }}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="flex items-center flex-1"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
