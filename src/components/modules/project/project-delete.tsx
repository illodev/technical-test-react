"use client";

import { Button } from "@/components/ui/button";
import {
  Fieldset,
  FieldsetBody,
  FieldsetDescription,
  FieldsetFooter,
  FieldsetTitle,
} from "@/components/ui/fieldset";
import { Separator } from "@/components/ui/separator";
import { ProjectOutput } from "@/lib/schemas/project";
import { formatDate } from "@/lib/utils";
import { handleProjectDelete } from "./project-delete-dialog";

interface ProjectDeleteProps {
  project: ProjectOutput;
}

const ProjectDelete: React.FC<ProjectDeleteProps> = ({ project }) => {
  return (
    <Fieldset className="border-destructive/50">
      <FieldsetBody>
        <FieldsetTitle>Delete Project</FieldsetTitle>
        <FieldsetDescription>
          The project will be permanently deleted, including its deployments and
          domains. This action is irreversible and can not be undone.
        </FieldsetDescription>
        <Separator className="my-4" />
        <div>
          <h4 className="text-sm">{project.name}</h4>
          <p className="text-sm">
            Last updated {formatDate(project.updatedAt)}
          </p>
        </div>
      </FieldsetBody>
      <FieldsetFooter className="justify-end border-destructive/50 bg-destructive/20">
        <Button
          variant="destructive"
          onClick={() => handleProjectDelete(project)}
        >
          Delete project
        </Button>
      </FieldsetFooter>
    </Fieldset>
  );
};

export { ProjectDelete };
