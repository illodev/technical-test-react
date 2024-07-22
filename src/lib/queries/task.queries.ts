import { TAGS } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import { TaskOutput } from "@/lib/schemas/task";

export async function getTasks() {
  return fetcher<TaskOutput[]>({
    uri: "/api/tasks",
    tags: [TAGS.TASKS],
  }).then((res) => res.body);
}

export async function getProjectTasks(projectId: string) {
  return fetcher<TaskOutput[]>({
    uri: `/api/projects/${projectId}/tasks`,
    tags: [TAGS.TASKS],
  }).then((res) => res.body);
}
