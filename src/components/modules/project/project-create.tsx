"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DataForm } from "@/components/ui/data-form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { createProject } from "@/lib/actions/project.actions";
import {
    projectInputSchema,
    ProjectOutput,
    type ProjectInput,
} from "@/lib/schemas/project";
import { useMutation } from "@/providers/query-provider";
import { Fragment } from "react";
import { showDialog } from "../../ui/use-dialog";
import { ProjectFields } from "./project-fields";

interface ProjectPropsCreate {
    defaultValues?: Partial<ProjectInput>;
    onClose?: () => void;
}

const ProjectCreate: React.FC<ProjectPropsCreate> = ({
    defaultValues,
    onClose,
}) => {
    const { mutate } = useMutation({
        mutationKey: ["project.create"],
        mutationFn: createProject,
        onSuccess: (client, result) => {
            const data = (client.getCache(["projects"]) ||
                []) as ProjectOutput[];

            client.setCache(["projects"], [result, ...data]);
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
                toast.success("Project created successfully.");
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
                            Create
                        </Button>
                    </DialogFooter>
                </Fragment>
            )}
        </DataForm>
    );
};

const handleProjectCreate = () => {
    showDialog({
        title: "Create a new project",
        render: (onClose) => <ProjectCreate onClose={onClose} />,
    });
};

export { handleProjectCreate, ProjectCreate };
