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
import { deleteTaskPriority } from "@/lib/actions/task-priority.actions";
import { TaskPriorityOutput } from "@/lib/schemas/task";

interface TaskPriorityDeleteDialogProps {
  taskPriority: TaskPriorityOutput;
  onClose?: () => void;
}

const VERIFICATION_TEXT = "delete priority";

const TaskPriorityDeleteDialog: React.FC<TaskPriorityDeleteDialogProps> = ({
  taskPriority,
  onClose,
}) => {
  const deleteTaskPrioritySchema = z.object({
    resourceName: z.string().refine((value) => value === taskPriority.name, {
      message: "Resource name does not match priority name.",
    }),
    verificationText: z
      .string()
      .refine((value) => value === VERIFICATION_TEXT, {
        message: "Verification text does not match.",
      }),
  });

  return (
    <DataForm
      onValid={() => deleteTaskPriority(taskPriority.id)}
      onInvalid={console.log}
      onError={() => {
        toast.error("Error deleting priority");
      }}
      onSuccess={() => {
        toast.success("Priority deleted successfully.");
        onClose?.();
      }}
      schema={deleteTaskPrioritySchema}
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
                    Enter the taskPriority name{" "}
                    <span className="rounded-lg bg-muted px-2 py-0.5 font-bold text-foreground">
                      {taskPriority.name}
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

const handleTaskPriorityDelete = (taskPriority: TaskPriorityOutput) => {
  showDialog({
    title: "Delete Priority",
    render: (onClose) => (
      <TaskPriorityDeleteDialog taskPriority={taskPriority} onClose={onClose} />
    ),
  });
};

export { handleTaskPriorityDelete, TaskPriorityDeleteDialog };
