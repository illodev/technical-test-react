import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProjectInput } from "@/lib/schemas/project";
import { Fragment } from "react";
import { Control } from "react-hook-form";

interface ProjectFieldsProps {
  control: Control<ProjectInput>;
}

const ProjectFields: React.FC<ProjectFieldsProps> = ({ control }) => {
  return (
    <Fragment>
      <FormField
        control={control}
        name="key"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Key</FormLabel>
            <FormControl>
              <Input
                className="w-1/2 uppercase"
                placeholder="e.g. PROJECT"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Project X" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Description{" "}
              <span className="text-muted-foreground">(optional)</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g. A project to manage tasks."
                {...field}
              />
            </FormControl>
            <FormDescription>A description of the project.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </Fragment>
  );
};

export { ProjectFields };
