"use client";

import { Fragment } from "react";
import { toast } from "sonner";

import { TaskFields } from "@/components/modules/task/task-fields";
import { Button } from "@/components/ui/button";
import { DataForm } from "@/components/ui/data-form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { showDialog } from "@/components/ui/use-dialog";
import { createTask } from "@/lib/actions/task.actions";
import {
    taskInputSchema,
    TaskOutput,
    type TaskInput,
} from "@/lib/schemas/task";
import { useMutation } from "@/providers/query-provider";

interface TaskCreateProps {
    defaultValues?: Partial<TaskInput>;
    onClose?: () => void;
}

const TaskCreate: React.FC<TaskCreateProps> = ({ defaultValues, onClose }) => {
    const { mutate } = useMutation({
        mutationKey: ["task.create"],
        mutationFn: createTask,
        onSuccess: (client, result) => {
            const data = (client.getCache([
                "projects",
                result.projectId,
                "tasks",
            ]) || []) as TaskOutput[];

            client.setCache(
                ["projects", result.projectId, "tasks"],
                [result, ...data]
            );
        },
    });

    return (
        <DataForm
            onValid={mutate}
            onInvalid={console.log}
            onError={({ error }) => {
                toast.error(error.message);
            }}
            onSuccess={() => {
                toast.success("Task created successfully.");
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
                            Create
                        </Button>
                    </DialogFooter>
                </Fragment>
            )}
        </DataForm>
    );
};

const handleTaskCreate = ({
    defaultValues,
}: {
    defaultValues?: Partial<TaskInput>;
}) => {
    showDialog({
        title: "Create a new task",
        render: (onClose) => (
            <TaskCreate defaultValues={defaultValues} onClose={onClose} />
        ),
    });
};

export { handleTaskCreate, TaskCreate };
