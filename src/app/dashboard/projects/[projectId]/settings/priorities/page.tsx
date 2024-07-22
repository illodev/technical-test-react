import { Metadata } from "next";

import { DashboardHeader } from "@/components/dashboard-header";
import { TaskPriorityCreateButton } from "@/components/modules/task-priority/task-priority-create-button";
import { TaskPriorityList } from "@/components/modules/task-priority/task-priority-list";
import { getProjectTaskPriorities } from "@/lib/queries/task-priority.queries";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Project Priorities",
        description: "Manage your project priorities.",
    };
}

interface PageProps {
    params: {
        projectId: string;
    };
}

export default async function Page({ params }: PageProps) {
    const taskPriorities = await getProjectTaskPriorities(params.projectId);

    return (
        <div>
            <DashboardHeader
                heading="Priorities"
                text="Manage your project priorities."
                size="sm"
                className="px-0"
            >
                <TaskPriorityCreateButton
                    defaultValues={{
                        projectId: params.projectId,
                    }}
                />
            </DashboardHeader>
            <TaskPriorityList priorities={taskPriorities} />
        </div>
    );
}
