"use client";

import { Button } from "@/components/ui/button";
import { DataForm } from "@/components/ui/data-form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { updateTaskLabel } from "@/lib/actions/task-label.actions";
import { TaskLabelOutput, taskLabelInputSchema } from "@/lib/schemas/task";
import { Fragment } from "react";
import { toast } from "sonner";
import { showDialog } from "../../ui/use-dialog";
import { TaskLabelFields } from "./task-label-fields";

interface TaskLabelUpdateProps {
    label: TaskLabelOutput;
    onClose?: () => void;
}

const TaskLabelUpdate: React.FC<TaskLabelUpdateProps> = ({
    label,
    onClose,
}) => {
    const defaultValues = taskLabelInputSchema.parse(label);

    return (
        <DataForm
            onValid={(data) => updateTaskLabel(label.id, data)}
            onInvalid={console.error}
            onError={({ error }) => {
                toast.error("Error updating label");
            }}
            onSuccess={() => {
                toast.success("The label was updated.");
                onClose?.();
            }}
            schema={taskLabelInputSchema}
            defaultValues={defaultValues}
            className="flex h-full flex-grow flex-col overflow-hidden"
        >
            {({ formState, control }) => (
                <Fragment>
                    <div className="col-span-2 grow gap-6 space-y-6 overflow-auto p-6">
                        <TaskLabelFields control={control} />
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

const handleTaskLabelUpdate = (label: TaskLabelOutput) => {
    showDialog({
        title: "Update label",
        render: (onClose) => (
            <TaskLabelUpdate onClose={onClose} label={label} />
        ),
    });
};

export { TaskLabelUpdate, handleTaskLabelUpdate };
