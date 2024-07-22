"use client";

import { Fragment } from "react";
import { toast } from "sonner";

import { ProjectFields } from "@/components/modules/project/project-fields";
import { Button } from "@/components/ui/button";
import { DataForm } from "@/components/ui/data-form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { showDialog } from "@/components/ui/use-dialog";
import { updateProject } from "@/lib/actions/project.actions";
import { ProjectOutput, projectInputSchema } from "@/lib/schemas/project";
import { useMutation } from "@/providers/query-provider";

interface ProjectPropsUpdate {
    project: ProjectOutput;
    onClose?: () => void;
}

const ProjectUpdate: React.FC<ProjectPropsUpdate> = ({ project, onClose }) => {
    const { mutate } = useMutation({
        mutationKey: ["project.update"],
        mutationFn: updateProject,
        onSuccess: (client, result) => {
            const data = (client.getCache(["projects"]) ||
                []) as ProjectOutput[];

            const updatedData = data.map((project) =>
                project.id === result.id ? result : project
            );

            client.setCache(["projects"], updatedData);
        },
    });

    const defaultValues = projectInputSchema.parse(project);

    return (
        <DataForm
            onValid={(data) => mutate(project.id, data)}
            onInvalid={console.log}
            onError={({ error }) => {
                toast.error(error.message);
            }}
            onSuccess={() => {
                toast.success("Project updated successfully.");
                onClose?.();
            }}
            schema={projectInputSchema}
            defaultValues={defaultValues}
            className="flex h-full flex-col flex-grow overflow-hidden"
        >
            {({ formState, control }) => (
                <Fragment>
                    <div className="space-y-6 p-6 flex-grow overflow-auto">
                        <ProjectFields control={control} />
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

const handleProjectUpdate = (project: ProjectOutput) => {
    showDialog({
        title: "Update project",
        render: (onClose) => (
            <ProjectUpdate project={project} onClose={onClose} />
        ),
    });
};

export { ProjectUpdate, handleProjectUpdate };
