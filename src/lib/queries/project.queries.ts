import { TAGS } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import { ProjectOutput } from "@/lib/schemas/project";

export async function getProjects() {
  return fetcher<ProjectOutput[]>({
    uri: "/api/projects",
    tags: [TAGS.PROJECTS],
  }).then((res) => res.body);
}

export async function getProject(id: string) {
  return fetcher<ProjectOutput>({
    uri: `/api/projects/${id}`,
    tags: [TAGS.PROJECTS],
  }).then((res) => res.body);
}
