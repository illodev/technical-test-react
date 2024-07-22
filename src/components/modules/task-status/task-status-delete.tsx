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
import { deleteTaskStatus } from "@/lib/actions/task-status.actions";
import { TaskStatusOutput } from "@/lib/schemas/task";

interface TaskStatusDeleteDialogProps {
  taskStatus: TaskStatusOutput;
  onClose?: () => void;
}

const VERIFICATION_TEXT = "delete status";

const TaskStatusDeleteDialog: React.FC<TaskStatusDeleteDialogProps> = ({
  taskStatus,
  onClose,
}) => {
  const deleteTaskStatusSchema = z.object({
    resourceName: z.string().refine((value) => value === taskStatus.name, {
      message: "Resource name does not match status name.",
    }),
    verificationText: z
      .string()
      .refine((value) => value === VERIFICATION_TEXT, {
        message: "Verification text does not match.",
      }),
  });

  return (
    <DataForm
      onValid={() => deleteTaskStatus(taskStatus.id)}
      onInvalid={console.log}
      onError={() => {
        toast.error("Error deleting status");
      }}
      onSuccess={() => {
        toast.success("Status deleted successfully.");
        onClose?.();
      }}
      schema={deleteTaskStatusSchema}
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
                    Enter the taskStatus name{" "}
                    <span className="rounded-lg bg-muted px-2 py-0.5 font-bold text-foreground">
                      {taskStatus.name}
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

const handleTaskStatusDelete = (taskStatus: TaskStatusOutput) => {
  showDialog({
    title: "Delete Status",
    render: (onClose) => (
      <TaskStatusDeleteDialog taskStatus={taskStatus} onClose={onClose} />
    ),
  });
};

export { handleTaskStatusDelete, TaskStatusDeleteDialog };
