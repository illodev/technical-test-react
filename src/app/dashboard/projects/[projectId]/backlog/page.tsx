import { Metadata } from "next";

import { DashboardHeader } from "@/components/dashboard-header";
import { TaskCreateButton } from "@/components/modules/task/task-create-button";
import { TaskList } from "@/components/modules/task/task-list";
import { TaskSeedButton } from "@/components/modules/task/task-seed-button";
import { Separator } from "@/components/ui/separator";
import { getProjectTasks } from "@/lib/queries/task.queries";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Tasks",
        description: "Manage your project tasks",
    };
}

interface PageProps {
    params: {
        projectId: string;
    };
}

export default async function Page({ params: { projectId } }: PageProps) {
    const tasks = await getProjectTasks(projectId);

    return (
        <>
            <DashboardHeader heading="Backlog" text="Manage your project tasks">
                <div className="flex gap-4">
                    <TaskSeedButton projectId={projectId} />
                    <TaskCreateButton defaultValues={{ projectId }} />
                </div>
            </DashboardHeader>
            <Separator />
            <div className="container py-6">
                <TaskList tasks={tasks} projectId={projectId} />
            </div>
        </>
    );
}
