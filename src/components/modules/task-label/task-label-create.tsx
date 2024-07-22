"use client";

import { Button } from "@/components/ui/button";
import { DataForm } from "@/components/ui/data-form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { createTaskLabel } from "@/lib/actions/task-label.actions";
import { taskLabelInputSchema, type TaskLabelInput } from "@/lib/schemas/task";
import { Fragment } from "react";
import { toast } from "sonner";
import { showDialog } from "../../ui/use-dialog";
import { TaskLabelFields } from "./task-label-fields";

interface TaskLabelCreateProps {
    defaultValues?: Partial<TaskLabelInput>;
    onClose?: () => void;
}

const TaskLabelCreate: React.FC<TaskLabelCreateProps> = ({
    defaultValues,
    onClose,
}) => {
    return (
        <DataForm
            onValid={createTaskLabel}
            onInvalid={console.log}
            onError={({ error }) => {
                toast.error("Error creating label");
            }}
            onSuccess={() => {
                toast.success("The label was created.");
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
                            Create
                        </Button>
                    </DialogFooter>
                </Fragment>
            )}
        </DataForm>
    );
};

const handleTaskLabelCreate = ({
    defaultValues,
}: {
    defaultValues?: Partial<TaskLabelInput>;
}) => {
    showDialog({
        title: "Create label",
        render: (onClose) => (
            <TaskLabelCreate defaultValues={defaultValues} onClose={onClose} />
        ),
    });
};

export { handleTaskLabelCreate, TaskLabelCreate };
