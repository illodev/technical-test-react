"use client";

import { Fragment } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { DataForm } from "@/components/ui/data-form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { showDialog } from "@/components/ui/use-dialog";
import { deleteTask } from "@/lib/actions/task.actions";
import { TaskOutput } from "@/lib/schemas/task";

interface TaskDeleteDialogProps {
  task: TaskOutput;
  onClose?: () => void;
}

const VERIFICATION_TEXT = "delete task";

const TaskDeleteDialog: React.FC<TaskDeleteDialogProps> = ({
  task,
  onClose,
}) => {
  const deleteTaskSchema = z.object({
    resourceName: z.string().refine((value) => value === task.name, {
      message: "Resource name does not match task name.",
    }),
    verificationText: z
      .string()
      .refine((value) => value === VERIFICATION_TEXT, {
        message: "Verification text does not match.",
      }),
  });

  return (
    <DataForm
      onValid={() => deleteTask(task.id)}
      onInvalid={console.log}
      onError={() => {
        toast.error("Error deleting task");
      }}
      onSuccess={() => {
        toast.success("Task deleted successfully.");
        onClose?.();
      }}
      schema={deleteTaskSchema}
      className="flex h-full flex-col flex-grow overflow-hidden"
    >
      {({ formState, control }) => (
        <Fragment>
          <div className="space-y-6 p-6 flex-grow overflow-auto">
            <FormField
              control={control}
              name="resourceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Enter the task name{" "}
                    <span className="rounded-lg bg-muted px-2 py-0.5 font-bold text-foreground">
                      {task.name}
                    </span>{" "}
                    (case sensitive) to continue:
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="verificationText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    To verify, type{" "}
                    <span className="rounded-lg bg-muted px-2 py-0.5 font-bold text-foreground">
                      {VERIFICATION_TEXT}
                    </span>{" "}
                    below:
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter className="flex flex-none sm:justify-between px-6 py-4 border-t gap-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant={formState.isValid ? "destructive" : "outline"}
              disabled={formState.isSubmitting}
              isLoading={formState.isSubmitting}
            >
              Delete
            </Button>
          </DialogFooter>
        </Fragment>
      )}
    </DataForm>
  );
};

const handleTaskDelete = (task: TaskOutput) => {
  showDialog({
    title: "Delete Task",
    render: (onClose) => <TaskDeleteDialog task={task} onClose={onClose} />,
  });
};

export { handleTaskDelete, TaskDeleteDialog };
