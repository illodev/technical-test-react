import { Metadata } from "next";

import { DashboardHeader } from "@/components/dashboard-header";
import { TaskStatusCreateButton } from "@/components/modules/task-status/task-status-create-button";
import { TaskStatusList } from "@/components/modules/task-status/task-status-list";
import { getProjectTaskStatuses } from "@/lib/queries/task-status.queries";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Project Statuses",
        description: "Manage your project statuses.",
    };
}

interface PageProps {
    params: {
        projectId: string;
    };
}

export default async function Page({ params }: PageProps) {
    const taskStatuses = await getProjectTaskStatuses(params.projectId);

    return (
        <>
            <DashboardHeader
                heading="Statuses"
                text="Manage your project statuses."
                size="sm"
                className="px-0"
            >
                <TaskStatusCreateButton
                    defaultValues={{
                        projectId: params.projectId,
                    }}
                />
            </DashboardHeader>
            <TaskStatusList statuses={taskStatuses} />
        </>
    );
}
