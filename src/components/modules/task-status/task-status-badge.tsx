import { forwardRef } from "react";

import { getHex } from "@/lib/colors";
import { TaskStatusInput, TaskStatusOutput } from "@/lib/schemas/task";

interface TaskStatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: TaskStatusOutput | TaskStatusInput;
}

const TaskStatusBadge = forwardRef<HTMLDivElement, TaskStatusBadgeProps>(
  ({ status }, ref) => {
    return (
      <div
        ref={ref}
        className="mr-2 flex w-max items-center justify-center rounded-lg border px-2 py-1 text-xs font-medium"
        style={{
          backgroundColor: getHex(status.color, "500") + "10",
          color: getHex(status.color, "400"),
          borderColor: getHex(status.color, "500") + "20",
        }}
      >
        {status.name}
      </div>
    );
  },
);

TaskStatusBadge.displayName = "TaskStatusBadge";

export { TaskStatusBadge };
