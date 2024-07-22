"use client";

import { PlusCircleIcon } from "lucide-react";

import { handleTaskCreate } from "@/components/modules/task/task-create";
import { Button } from "@/components/ui/button";
import { TaskInput } from "@/lib/schemas/task";

interface TaskCreateProps {
    defaultValues: Partial<TaskInput>;
}

const TaskCreateButton: React.FC<TaskCreateProps> = ({ defaultValues }) => {
    return (
        <Button onClick={() => handleTaskCreate({ defaultValues })}>
            <PlusCircleIcon className="mr-2 h-5 w-5" />
            Create Task
        </Button>
    );
};

export { TaskCreateButton };
