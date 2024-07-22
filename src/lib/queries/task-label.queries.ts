import { TAGS } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import { TaskLabelOutput } from "@/lib/schemas/task";

export const getProjectTaskLabels = async (projectId: string) => {
  return fetcher<TaskLabelOutput[]>({
    uri: `/api/projects/${projectId}/task-labels`,
    tags: [TAGS.TASK_LABELS],
    cache: "no-cache",
  }).then((res) => res.body);
};

export const getTaskLabel = async (taskLabelId: string) => {
  return fetcher<TaskLabelOutput>({
    uri: `/api/task-labels/${taskLabelId}`,
    tags: [TAGS.TASK_LABELS],
  }).then((res) => res.body);
};
