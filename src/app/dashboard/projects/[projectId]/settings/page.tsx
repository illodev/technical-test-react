import { ProjectDelete } from "@/components/modules/project/project-delete";
import { ProjectNameForm } from "@/components/modules/project/project-name-form";
import { getProject } from "@/lib/queries/project.queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Project Settings",
        description: "Change the project name or delete the project.",
    };
}

interface PageProps {
    params: {
        projectId: string;
    };
}

export default async function Page({ params }: PageProps) {
    const project = await getProject(params.projectId);

    if (!project) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <ProjectNameForm project={project} />
            <ProjectDelete project={project} />
        </div>
    );
}
