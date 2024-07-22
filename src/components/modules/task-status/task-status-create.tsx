"use client";

import { Fragment } from "react";
import { toast } from "sonner";

import { TaskStatusFields } from "@/components/modules/task-status/task-status-fields";
import { Button } from "@/components/ui/button";
import { DataForm } from "@/components/ui/data-form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { showDialog } from "@/components/ui/use-dialog";
import { createTaskStatus } from "@/lib/actions/task-status.actions";
import {
    taskStatusInputSchema,
    type TaskStatusInput,
} from "@/lib/schemas/task";

interface TaskStatusCreateProps {
    defaultValues?: Partial<TaskStatusInput>;
    onClose?: () => void;
}

const TaskStatusCreate: React.FC<TaskStatusCreateProps> = ({
    defaultValues,
    onClose,
}) => {
    return (
        <DataForm
            onValid={createTaskStatus}
            onInvalid={console.log}
            onError={({ error }) => {
                toast.error("Error creating status");
            }}
            onSuccess={() => {
                toast.success("The status was created.");
                onClose?.();
            }}
            schema={taskStatusInputSchema}
            defaultValues={defaultValues}
            className="flex h-full flex-grow flex-col overflow-hidden"
        >
            {({ formState, control }) => (
                <Fragment>
                    <div className="col-span-2 grow gap-6 space-y-6 overflow-auto p-6">
                        <TaskStatusFields control={control} />
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

const handleTaskStatusCreate = ({
    defaultValues,
}: {
    defaultValues?: Partial<TaskStatusInput>;
}) => {
    showDialog({
        title: "Create status",
        render: (onClose) => (
            <TaskStatusCreate defaultValues={defaultValues} onClose={onClose} />
        ),
    });
};

export { handleTaskStatusCreate, TaskStatusCreate };
