"use client";

import { PlusCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TaskLabelInput } from "@/lib/schemas/task";
import { handleTaskLabelCreate } from "./task-label-create";

interface TaskLabelCreateButtonProps {
  defaultValues: Partial<TaskLabelInput>;
}

const TaskLabelCreateButton: React.FC<TaskLabelCreateButtonProps> = ({
  defaultValues,
}) => {
  return (
    <Button size="sm" onClick={() => handleTaskLabelCreate({ defaultValues })}>
      <PlusCircleIcon className="mr-2 h-5 w-5" />
      Create label
    </Button>
  );
};

export { TaskLabelCreateButton };
