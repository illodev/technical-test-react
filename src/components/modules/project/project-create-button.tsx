"use client";

import { PlusCircleIcon } from "lucide-react";

import { handleProjectCreate } from "@/components/modules/project/project-create";
import { Button } from "@/components/ui/button";

interface ProjectCreateProps {}

const ProjectCreateButton: React.FC<ProjectCreateProps> = () => {
    return (
        <Button onClick={handleProjectCreate}>
            <PlusCircleIcon className="mr-2 h-5 w-5" />
            Create Project
        </Button>
    );
};

export { ProjectCreateButton };
