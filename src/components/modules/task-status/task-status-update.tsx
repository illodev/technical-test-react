"use client";

import { Fragment } from "react";
import { toast } from "sonner";

import { TaskStatusFields } from "@/components/modules/task-status/task-status-fields";
import { Button } from "@/components/ui/button";
import { DataForm } from "@/components/ui/data-form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { showDialog } from "@/components/ui/use-dialog";
import { updateTaskStatus } from "@/lib/actions/task-status.actions";
import { TaskStatusOutput, taskStatusInputSchema } from "@/lib/schemas/task";

interface TaskStatusUpdateProps {
    status: TaskStatusOutput;
    onClose?: () => void;
}

const TaskStatusUpdate: React.FC<TaskStatusUpdateProps> = ({
    status,
    onClose,
}) => {
    const defaultValues = taskStatusInputSchema.parse(status);

    return (
        <DataForm
            onValid={(data) => updateTaskStatus(status.id, data)}
            onInvalid={console.error}
            onError={({ error }) => {
                toast.error("Error updating status");
            }}
            onSuccess={() => {
                toast.success("The status was updated.");
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
                            Update
                        </Button>
                    </DialogFooter>
                </Fragment>
            )}
        </DataForm>
    );
};

const handleTaskStatusUpdate = (status: TaskStatusOutput) => {
    showDialog({
        title: "Update status",
        render: (onClose) => (
            <TaskStatusUpdate onClose={onClose} status={status} />
        ),
    });
};

export { TaskStatusUpdate, handleTaskStatusUpdate };
