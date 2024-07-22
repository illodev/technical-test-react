"use client";

import { Fragment } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DataForm } from "@/components/ui/data-form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { showDialog } from "@/components/ui/use-dialog";
import { executeTaskSeed } from "@/lib/actions/task.actions";
import { z } from "zod";

interface TaskSeedProps {
  projectId: string;
  onClose?: () => void;
}

const TaskSeed: React.FC<TaskSeedProps> = ({ projectId, onClose }) => {
  return (
    <DataForm
      onValid={() => executeTaskSeed(projectId)}
      onInvalid={console.log}
      onError={({ error }) => {
        toast.error(error.message);
      }}
      onSuccess={() => {
        toast.success("Tasks created successfully.");
        onClose?.();
      }}
      schema={z.object({})}
      className="flex h-full flex-col flex-grow overflow-hidden"
    >
      {(form) => (
        <Fragment>
          <div className="space-y-6 p-6 flex-grow overflow-auto">
            <p className="text-sm text-muted-foreground">
              This action will create a set of tasks for the selected project.
              All old tasks will be deleted.
            </p>
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
              Execute
            </Button>
          </DialogFooter>
        </Fragment>
      )}
    </DataForm>
  );
};

const handleTaskSeed = ({ projectId }: { projectId: string }) => {
  showDialog({
    title: "Create tasks",
    render: (onClose) => <TaskSeed projectId={projectId} onClose={onClose} />,
  });
};

export { handleTaskSeed, TaskSeed };
