import { type Metadata } from "next";

import { DashboardContainer } from "@/components/dashboard-container";
import { DashboardHeader } from "@/components/dashboard-header";
import { ProjectCreateButton } from "@/components/modules/project/project-create-button";
import { ProjectList } from "@/components/modules/project/project-list";
import { Separator } from "@/components/ui/separator";
import { getProjects } from "@/lib/queries/project.queries";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Projects",
        description: "Create and manage projects.",
    };
}

export default async function Page() {
    const projects = await getProjects();

    return (
        <>
            <DashboardHeader
                heading="Projects"
                text="Create and manage projects."
            >
                <ProjectCreateButton />
            </DashboardHeader>
            <Separator />
            <DashboardContainer>
                <ProjectList projects={projects} />
            </DashboardContainer>
        </>
    );
}
