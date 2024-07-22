import { Fragment } from "react";
import { UseFormReturn } from "react-hook-form";

import { TaskLabelSelector } from "@/components/modules/task-label/task-label-selector";
import { TaskPrioritySelector } from "@/components/modules/task-priority/task-priority-selector";
import { TaskStatusSelector } from "@/components/modules/task-status/task-status-selector";
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
import { TaskInput } from "@/lib/schemas/task";

interface TaskFieldsProps {
    form: UseFormReturn<TaskInput>;
}

const TaskFields: React.FC<TaskFieldsProps> = ({ form }) => {
    const projectId = form.watch("projectId");

    return (
        <Fragment>
            <FormField
                control={form.control}
                name="name"
                defaultValue=""
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="The title of the task."
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            The title of the task.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Description{" "}
                            <span className="text-muted-foreground">
                                (optional)
                            </span>
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="A description of the task. Markdown is supported."
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            A description of the task. Markdown is supported.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="statusId"
                render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                            <TaskStatusSelector
                                projectId={projectId}
                                onValueChange={onChange}
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            The status of the task. This can be changed later.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="labelId"
                render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                            <TaskLabelSelector
                                projectId={projectId}
                                onValueChange={onChange}
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            The label of the task. This can be changed later.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="priorityId"
                render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <FormControl>
                            <TaskPrioritySelector
                                projectId={projectId}
                                onValueChange={onChange}
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            The priority of the task. This can be changed later.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </Fragment>
    );
};

export { TaskFields };
