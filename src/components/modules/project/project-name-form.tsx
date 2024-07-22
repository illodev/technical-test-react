"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DataForm } from "@/components/ui/data-form";
import {
  Fieldset,
  FieldsetBody,
  FieldsetDescription,
  FieldsetField,
  FieldsetFooter,
  FieldsetTitle,
} from "@/components/ui/fieldset";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { updateProject } from "@/lib/actions/project.actions";
import { projectInputSchema, ProjectOutput } from "@/lib/schemas/project";

interface ProjectNameFormProps {
  project: ProjectOutput;
}

const ProjectNameForm: React.FC<ProjectNameFormProps> = ({ project }) => {
  const defaultValues = projectInputSchema.parse(project);

  return (
    <DataForm
      onValid={(data) => updateProject(project.id, data)}
      onInvalid={console.log}
      onError={({ error }) => {
        toast.error("Error updating project");
      }}
      onSuccess={() => {
        toast.success("Project updated successfully.");
      }}
      schema={projectInputSchema}
      defaultValues={defaultValues}
      className="flex h-full flex-col flex-grow overflow-hidden"
    >
      {({ formState, control }) => (
        <Fieldset>
          <FieldsetBody>
            <FieldsetTitle>Project Information</FieldsetTitle>
            <FieldsetDescription>
              The project name is used to identify the project in the dashboard.
            </FieldsetDescription>
            <FieldsetField>
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="The project name." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FieldsetField>
            <Separator className="my-6" />
            <FieldsetDescription>
              The project description is used to provide more information about
              the project.
            </FieldsetDescription>
            <FieldsetField>
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="The project description."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FieldsetField>
          </FieldsetBody>
          <FieldsetFooter>
            <div />
            <Button
              type="submit"
              variant={formState.isDirty ? "default" : "secondary"}
              disabled={formState.isSubmitting || !formState.isDirty}
              isLoading={formState.isSubmitting}
            >
              Save
            </Button>
          </FieldsetFooter>
        </Fieldset>
      )}
    </DataForm>
  );
};

export { ProjectNameForm };
