"use client";

import { Fragment } from "react";
import { toast } from "sonner";

import { TaskFields } from "@/components/modules/task/task-fields";
import { Button } from "@/components/ui/button";
import { DataForm } from "@/components/ui/data-form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { showDialog } from "@/components/ui/use-dialog";
import { updateTask } from "@/lib/actions/task.actions";
import { TaskOutput, taskInputSchema } from "@/lib/schemas/task";
import { useMutation } from "@/providers/query-provider";

interface TaskPropsUpdate {
    task: TaskOutput;
    onClose?: () => void;
}

const TaskUpdate: React.FC<TaskPropsUpdate> = ({ task, onClose }) => {
    const { mutate } = useMutation({
        mutationKey: ["task.create"],
        mutationFn: updateTask,
        onSuccess: (client, result) => {
            const data = (client.getCache([
                "projects",
                result.projectId,
                "tasks",
            ]) || []) as TaskOutput[];

            const updatedData = data.map((task) =>
                task.id === result.id ? result : task
            );

            client.setCache(
                ["projects", result.projectId, "tasks"],
                updatedData
            );
        },
    });

    const defaultValues = taskInputSchema.parse(task);

    return (
        <DataForm
            onValid={(data) => mutate(task.id, data)}
            onInvalid={console.log}
            onError={({ error }) => {
                toast.error(error.message);
            }}
            onSuccess={() => {
                toast.success("Task updated successfully.");
                onClose?.();
            }}
            schema={taskInputSchema}
            defaultValues={defaultValues}
            className="flex h-full flex-col flex-grow overflow-hidden"
        >
            {(form) => (
                <Fragment>
                    <div className="space-y-6 p-6 flex-grow overflow-auto">
                        <TaskFields form={form} />
                    </div>
                    <DialogFooter className="flex flex-none sm:justify-between px-6 py-4 border-t gap-4">
                        <DialogClose asChild>
                            <Button type="button" size="lg" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            size="lg"
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            isLoading={form.formState.isSubmitting}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </Fragment>
            )}
        </DataForm>
    );
};

const handleTaskUpdate = (task: TaskOutput) => {
    showDialog({
        title: "Update Task",
        render: (onClose) => <TaskUpdate onClose={onClose} task={task} />,
    });
};

export { TaskUpdate, handleTaskUpdate };
