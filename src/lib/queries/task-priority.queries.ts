import { TAGS } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import { TaskPriorityOutput } from "@/lib/schemas/task";

export const getProjectTaskPriorities = async (projectId: string) => {
  return fetcher<TaskPriorityOutput[]>({
    uri: `/api/projects/${projectId}/task-priorities`,
    tags: [TAGS.TASK_PRIORITIES],
    cache: "no-cache",
  }).then((res) => res.body);
};

export const getTaskPriority = async (taskPriorityId: string) => {
  return fetcher<TaskPriorityOutput>({
    uri: `/api/task-priorities/${taskPriorityId}`,
    tags: [TAGS.TASK_PRIORITIES],
  }).then((res) => res.body);
};
