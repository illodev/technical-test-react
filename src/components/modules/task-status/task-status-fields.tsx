import { Fragment } from "react";
import { Control } from "react-hook-form";

import { ColorSelector } from "@/components/ui/color-selector";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TaskStatusInput } from "@/lib/schemas/task";

interface TaskStatusFieldsProps {
  control: Control<TaskStatusInput>;
}

const TaskStatusFields: React.FC<TaskStatusFieldsProps> = ({ control }) => {
  return (
    <Fragment>
      <FormField
        control={control}
        name="name"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="color"
        defaultValue="neutral"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Color <span className="text-muted-foreground">(optional)</span>
            </FormLabel>
            <FormControl>
              <ColorSelector {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Fragment>
  );
};

export { TaskStatusFields };
