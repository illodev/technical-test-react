import { TAGS } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import { TaskStatusOutput } from "@/lib/schemas/task";

export const getProjectTaskStatuses = async (projectId: string) => {
  return fetcher<TaskStatusOutput[]>({
    uri: `/api/projects/${projectId}/task-statuses`,
    tags: [TAGS.TASK_STATUSES],
    cache: "no-cache",
  }).then((res) => res.body);
};

export const getTaskStatus = async (taskStatusId: string) => {
  return fetcher<TaskStatusOutput>({
    uri: `/api/task-statuses/${taskStatusId}`,
    tags: [TAGS.TASK_STATUSES],
  }).then((res) => res.body);
};
