"use client";

import { PlusCircleIcon } from "lucide-react";

import { handleTaskStatusCreate } from "@/components/modules/task-status/task-status-create";
import { Button } from "@/components/ui/button";
import { TaskStatusInput } from "@/lib/schemas/task";

interface TaskStatusCreateButtonProps {
    defaultValues?: Partial<TaskStatusInput>;
}

const TaskStatusCreateButton: React.FC<TaskStatusCreateButtonProps> = ({
    defaultValues,
}) => {
    return (
        <Button
            size="sm"
            onClick={() =>
                handleTaskStatusCreate({
                    defaultValues,
                })
            }
        >
            <PlusCircleIcon className="mr-2 h-5 w-5" />
            Create status
        </Button>
    );
};

export { TaskStatusCreateButton };
