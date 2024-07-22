"use client";

import { PlusCircleIcon } from "lucide-react";

import { handleTaskPriorityCreate } from "@/components/modules/task-priority/task-priority-create";
import { Button } from "@/components/ui/button";
import { type TaskPriorityInput } from "@/lib/schemas/task";

interface TaskPriorityCreateButtonProps {
    defaultValues?: Partial<TaskPriorityInput>;
}

const TaskPriorityCreateButton: React.FC<TaskPriorityCreateButtonProps> = ({
    defaultValues,
}) => {
    return (
        <Button
            size="sm"
            onClick={() => handleTaskPriorityCreate({ defaultValues })}
        >
            <PlusCircleIcon className="mr-2 h-5 w-5" />
            Create priority
        </Button>
    );
};

export { TaskPriorityCreateButton };
