"use client";

import { Fragment } from "react";
import { toast } from "sonner";

import { TaskPriorityFields } from "@/components/modules/task-priority/task-priority-fields";
import { Button } from "@/components/ui/button";
import { DataForm } from "@/components/ui/data-form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { showDialog } from "@/components/ui/use-dialog";
import { createTaskPriority } from "@/lib/actions/task-priority.actions";
import {
    taskPriorityInputSchema,
    type TaskPriorityInput,
} from "@/lib/schemas/task";

interface TaskPriorityCreateProps {
    defaultValues?: Partial<TaskPriorityInput>;
    onClose?: () => void;
}

const TaskPriorityCreate: React.FC<TaskPriorityCreateProps> = ({
    defaultValues,
    onClose,
}) => {
    return (
        <DataForm
            onValid={createTaskPriority}
            onInvalid={console.log}
            onError={({ error }) => {
                toast.error("Error creating priority");
            }}
            onSuccess={() => {
                toast.success("The priority was created.");
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
                            Create
                        </Button>
                    </DialogFooter>
                </Fragment>
            )}
        </DataForm>
    );
};

const handleTaskPriorityCreate = ({
    defaultValues,
}: {
    defaultValues?: Partial<TaskPriorityInput>;
}) => {
    showDialog({
        title: "Create priority",
        render: (onClose) => (
            <TaskPriorityCreate
                defaultValues={defaultValues}
                onClose={onClose}
            />
        ),
    });
};

export { handleTaskPriorityCreate, TaskPriorityCreate };
