import { Metadata } from "next";

import { DashboardHeader } from "@/components/dashboard-header";
import { TaskLabelCreateButton } from "@/components/modules/task-label/task-label-create-button";
import { TaskLabelList } from "@/components/modules/task-label/task-label-list";
import { getProjectTaskLabels } from "@/lib/queries/task-label.queries";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Project Labels",
        description: "Manage your project labels.",
    };
}

interface PageProps {
    params: {
        projectId: string;
    };
}

export default async function Page({ params }: PageProps) {
    const taskLabels = await getProjectTaskLabels(params.projectId);

    return (
        <>
            <DashboardHeader
                heading="Labels"
                text="Manage your project labels."
                size="sm"
                className="px-0"
            >
                <TaskLabelCreateButton
                    defaultValues={{
                        projectId: params.projectId,
                    }}
                />
            </DashboardHeader>
            <TaskLabelList labels={taskLabels} />
        </>
    );
}
