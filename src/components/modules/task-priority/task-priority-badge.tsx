import { getHex } from "@/lib/colors";
import { TaskPriorityInput, TaskPriorityOutput } from "@/lib/schemas/task";
import { forwardRef } from "react";

interface TaskPriorityBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  priority: TaskPriorityOutput | TaskPriorityInput;
}

const TaskPriorityBadge = forwardRef<HTMLDivElement, TaskPriorityBadgeProps>(
  ({ priority }, ref) => {
    return (
      <div
        ref={ref}
        className="mr-2 flex w-max items-center justify-center rounded-lg border px-2 py-1 text-xs font-medium"
        style={{
          backgroundColor: getHex(priority.color, "500") + "10",
          color: getHex(priority.color, "400"),
          borderColor: getHex(priority.color, "500") + "20",
        }}
      >
        {priority.name}
      </div>
    );
  },
);

TaskPriorityBadge.displayName = "TaskPriorityBadge";

export { TaskPriorityBadge };
