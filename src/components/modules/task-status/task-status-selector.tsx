"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { PlusCircleIcon, RotateCwIcon } from "lucide-react";
import * as React from "react";

import { handleTaskStatusCreate } from "@/components/modules/task-status/task-status-create";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { getProjectTaskStatuses } from "@/lib/queries/task-status.queries";
import { cn } from "@/lib/utils";
import { useQuery } from "@/providers/query-provider";

interface TaskStatusSelectorProps
    extends React.HTMLAttributes<HTMLButtonElement> {
    projectId: string;
    disabled?: boolean;
    placeholder?: string;
    value?: string;
    onValueChange?: (value: string) => void;
}

const TaskStatusSelector = React.forwardRef<
    HTMLButtonElement,
    TaskStatusSelectorProps
>(
    (
        {
            projectId,
            disabled,
            placeholder,
            value,
            onValueChange,
            className,
            ...props
        },
        ref
    ) => {
        const [open, setOpen] = React.useState(false);

        const {
            data: labels,
            isLoading,
            isFetching,
            refetch,
        } = useQuery({
            queryKey: ["projects", projectId, "task-statuses"],
            queryFn: () => getProjectTaskStatuses(projectId),
        });

        const selected = labels?.find((label) => label.id === value);

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <div className="flex items-center gap-2">
                    <PopoverTrigger asChild>
                        <Button
                            ref={ref}
                            variant="outline"
                            role="combobox"
                            disabled={disabled || isLoading}
                            className={cn(
                                "w-full justify-start font-normal",
                                className
                            )}
                            {...props}
                        >
                            <span className="flex items-center truncate">
                                {selected?.name ?? (
                                    <span className="text-muted-foreground">
                                        {placeholder ?? "Select Status"}
                                    </span>
                                )}
                            </span>
                            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => refetch()}
                                disabled={disabled || isFetching}
                            >
                                <RotateCwIcon
                                    className={cn(
                                        "h-4 w-4",
                                        isFetching && "animate-spin"
                                    )}
                                />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Refresh</TooltipContent>
                    </Tooltip>
                </div>
                <PopoverContent className="p-0" align="center">
                    <Command loop>
                        <CommandList className="max-h-none overflow-visible">
                            <CommandInput
                                placeholder="Search..."
                                className="h-9 flex-grow"
                            />
                            <CommandEmpty>No hay resultados</CommandEmpty>
                            <CommandGroup
                                heading="Statuses"
                                className="h-[calc(100vh-4rem)] flex-grow overflow-auto lg:h-auto lg:max-h-56"
                            >
                                {labels?.map((label) => (
                                    <CommandItem
                                        key={label.id}
                                        value={label.name}
                                        onSelect={() => {
                                            onValueChange?.(label.id);
                                            setOpen(false);
                                        }}
                                        onClick={() => {
                                            onValueChange?.(label.id);
                                            setOpen(false);
                                        }}
                                    >
                                        <div>
                                            <p className="text-sm font-medium leading-relaxed">
                                                {label.name}
                                            </p>
                                        </div>
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-5 w-5",
                                                label.id === value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup>
                                <CommandItem
                                    onSelect={() =>
                                        handleTaskStatusCreate({
                                            defaultValues: {
                                                projectId,
                                            },
                                        })
                                    }
                                >
                                    <PlusCircleIcon className="mr-2 h-4 w-4" />
                                    Create Status
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        );
    }
);

TaskStatusSelector.displayName = "TaskStatusSelector";

export { TaskStatusSelector };
