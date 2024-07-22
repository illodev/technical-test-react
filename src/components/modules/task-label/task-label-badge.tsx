import { getHex } from "@/lib/colors";
import { TaskLabelInput, TaskLabelOutput } from "@/lib/schemas/task";
import { forwardRef } from "react";

interface TaskLabelBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  label: TaskLabelOutput | TaskLabelInput;
}

const TaskLabelBadge = forwardRef<HTMLDivElement, TaskLabelBadgeProps>(
  ({ label }, ref) => {
    return (
      <div
        ref={ref}
        className="mr-2 flex w-max items-center justify-center rounded-lg border px-2 py-1 text-xs font-medium"
        style={{
          backgroundColor: getHex(label.color, "500") + "10",
          color: getHex(label.color, "400"),
          borderColor: getHex(label.color, "500") + "20",
        }}
      >
        {label.name}
      </div>
    );
  },
);

TaskLabelBadge.displayName = "TaskLabelBadge";

export { TaskLabelBadge };
