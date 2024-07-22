"use client";

import { BeanIcon } from "lucide-react";

import { handleTaskSeed } from "@/components/modules/task/task-seed";
import { Button } from "@/components/ui/button";

interface TaskSeedProps {
    projectId: string;
}

const TaskSeedButton: React.FC<TaskSeedProps> = ({ projectId }) => {
    return (
        <Button variant="outline" onClick={() => handleTaskSeed({ projectId })}>
            <BeanIcon className="mr-2 h-5 w-5" />
            Execute Task Seed
        </Button>
    );
};

export { TaskSeedButton };
