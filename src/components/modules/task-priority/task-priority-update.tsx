"use client";

import { Button } from "@/components/ui/button";
import { DataForm } from "@/components/ui/data-form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { updateTaskPriority } from "@/lib/actions/task-priority.actions";
import {
    TaskPriorityOutput,
    taskPriorityInputSchema,
} from "@/lib/schemas/task";
import { Fragment } from "react";
import { toast } from "sonner";
import { showDialog } from "../../ui/use-dialog";
import { TaskPriorityFields } from "./task-priority-fields";

interface TaskPriorityUpdateProps {
    priority: TaskPriorityOutput;
    onClose?: () => void;
}

const TaskPriorityUpdate: React.FC<TaskPriorityUpdateProps> = ({
    priority,
    onClose,
}) => {
    const defaultValues = taskPriorityInputSchema.parse(priority);

    return (
        <DataForm
            onValid={(data) => updateTaskPriority(priority.id, data)}
            onInvalid={console.error}
            onError={({ error }) => {
                toast.error("Error updating priority");
            }}
            onSuccess={() => {
                toast.success("The priority was updated.");
                onClose?.();
            }}
            schema={taskPriorityInputSchema}
            defaultValues={defaultValues}
            className="flex h-full flex-grow flex-col overflow-hidden"
        >
            {({ formState, control }) => (
                <Fragment>
                    <div className="col-span-2 grow gap-6 space-y-6 overflow-auto p-6">
                        <TaskPriorityFields control={control} />
                    </div>
                    <DialogFooter className="flex flex-none sm:justify-between px-6 py-4 border-t gap-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={formState.isSubmitting}
                            isLoading={formState.isSubmitting}
                        >
                            Update
                        </Button>
                    </DialogFooter>
                </Fragment>
            )}
        </DataForm>
    );
};

const handleTaskPriorityUpdate = (priority: TaskPriorityOutput) => {
    showDialog({
        title: "Update priority",
        description: "Update the priority information.",
        render: (onClose) => (
            <TaskPriorityUpdate onClose={onClose} priority={priority} />
        ),
    });
};

export { TaskPriorityUpdate, handleTaskPriorityUpdate };
