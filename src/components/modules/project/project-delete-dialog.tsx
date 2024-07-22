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
import { deleteProject } from "@/lib/actions/project.actions";
import { ProjectOutput } from "@/lib/schemas/project";

interface ProjectDeleteDialogProps {
  project: ProjectOutput;
  onClose?: () => void;
}

const VERIFICATION_TEXT = "delete my project";

const ProjectDeleteDialog: React.FC<ProjectDeleteDialogProps> = ({
  project,
  onClose,
}) => {
  const deleteProjectSchema = z.object({
    resourceName: z.string().refine((value) => value === project.name, {
      message: "Resource name does not match project name.",
    }),
    verificationText: z
      .string()
      .refine((value) => value === VERIFICATION_TEXT, {
        message: "Verification text does not match.",
      }),
  });

  return (
    <DataForm
      onValid={() => deleteProject(project.id)}
      onInvalid={console.log}
      onError={() => {
        toast.error("Error deleting project");
      }}
      onSuccess={() => {
        toast.success("Project deleted successfully.");
        onClose?.();
      }}
      schema={deleteProjectSchema}
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
                    Enter the project name{" "}
                    <span className="rounded-lg bg-muted px-2 py-0.5 font-bold text-foreground">
                      {project.name}
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

const handleProjectDelete = (project: ProjectOutput) => {
  showDialog({
    title: "Delete Project",
    description:
      "This project will be deleted permanently, along with all its resources.",
    render: (onClose) => (
      <ProjectDeleteDialog project={project} onClose={onClose} />
    ),
  });
};

export { handleProjectDelete, ProjectDeleteDialog };
